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
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'ui0md2u2041gp1p3byxwo13kr0qc5cchp5didx2zqfky96wj5hy2l3l0246a5qz6y7l84nso1c5',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 493874,
                alt: '3mxv96jji0j6bxgiuyt3umdx2fvsduxlg93q89ij0b9eg6kkzq3oeyh0yplq52rx4t10u3sqr9vx46o3vu91p17gj6d1q4k4q41lebzbbtte0yhwsqdq06nqcermkasdaedyzu86t3r248d3672d22u72o2viexoc0pfiz0d1ts516rp044xbt5rdgqwzplhny8nwxtf4r4cuywukwjkz378jyfue2rwtmpj97tl65mpsr1p862ccnobs461zgb',
                title: 'v62g2ov1007txz9vcd7a949njgagae6wbviripyg0mz694dyszc93k5eao4nxkfub3oidkch0randtpnl65mz4rjar3cen1ehorbyjunqcn21zww2mf3br5wb8vrzafojodt6gfzt2ql3cmirvmb4rsk778buq1db9886ahdiemyqyzwkmoc7tko70bg4gx40essfdrtmc63b50m6tqm2fcejv96u2lsk1ioyfxcuqd4vg97gbmped51dswez7e',
                description: 'Rem quis nisi suscipit eligendi nihil mollitia odio animi dignissimos. Velit tempore aut molestias sunt tempore aspernatur eius facere. Et et temporibus architecto quo aperiam natus. Quaerat voluptas dolorum ullam hic.',
                excerpt: 'Adipisci recusandae eius doloribus earum tempora rerum sit. Nostrum delectus debitis autem veritatis totam nulla repudiandae est. Modi non amet.',
                name: 'd2tzw9tuydb93y0xgdx9lb90jyqq7fe9f9nzwl5d2l7dp8q6u1nzvnxqxi3dhy3ygjvt60jf4g4rhi5ygkgtnzrxlqpmzeyfmehcetkmqfz3gvipyiesgipixgv3iikx4k30stpci30moi3crqwm2bp3n6a2qg5zcgbs9c9s7idmwq1uaqm5gzg3fhitvcglzu8m1cpai0rax8wgwqc3e4gmhtdvklvw4u07xwcntirfhuomtbrnjh3umwcsx5p',
                pathname: 'wp5vjxp21r7a381fsuyxf5z11gb5f1vmxalj4zd632v1kea2tasx38uo64svsjqnfp4xgxzyiqra2wdfps8khww73ucp0r222forza145du9q5txa1kfpxsdpfbjfb3d820gfm52zfdtislys1xdhm9e9lw5gu4tuumbt59l8i02pdyygzue4gf9co0oyqm6h01qg2a76pawg9gwzimuh8l7yh4ur2ir32u8kwn8n21jxho1znuvbbznr47rxadgesztgxsti7rvehcel4oyb1hee5zd9iws5jyvpsadizp5nmx03rd1653aoojtcxajoipidji24cgejsivyw4oham9rox06ixg7ei7q7pwihf1xarsuiy7zm9j79cc5wjpvmrmvprsji8i36q94fyh5ifnm6qziycbi0o7k0y5wmv18e8v693hlxhlzvy7omkvbsv3ifjdxhhbmx9hes6wvg1kkhpsquqgkry4xlvlcusxlkbbtv0jez617tjb9xe8blp8ms0f9jpcgae7r9yoamzsmfcrs3y20p5cyrhjvgsrxql6jhcbw85twmbh6qa6miexe2d9t9ajyinl9oi9h03kwd1lqv3pj5hpya6wljyb2l3d0ljiqw31wn6cs7caa5u34xfg2o6sifxmuzqn6nt0xo5hkl0x3i2vnduv1vyfnh8af53xcs8mc87cbxywnsrlef9sfi4whnrwsx6ftspwt1vuckrzz3f3fyl7fs69kq57im34wzgjuc1e51ghcsx16h7kdo7dfbzfk0eta1pn2bsz00j9sqv9e5qz7nhszyes97yczhifa3nn7ibxn1n2nkd4jwl7k8fxhqf6423gzjpskh8pdcpifjbu9h3jdrrq437u3lobpr6sc8hjsqf9xq59dnp9mfz32262k0acg7edlu1k4ro9cwzg09fzuk1h3ammodd43mpkh1nhtxe6gobda3t5fj2whtgp507bwvg0s7p8eo8acdxvoidrrytb3jq048rtufi4jcvz',
                filename: 'i5qoibkici7m25y72cbs0yacynkree3ac6neltcslewhejd3s9m33gwf27l3hyf2jv741xm5w2bf7hpy53x6mdxtx9v52dwdd23pblcyrw45wpdrk7oom11tq14qnsepsk9zvy8c12mlnti5qv9hqt8ubrncfbc5tfu30is6bh85fa4ufq7mdvux9x0pfj4a7g6wmyq9l6bwnubfk6hpp73n3um7avfyzpx0y11oex2k5f8jagscpd0se8ifqo3',
                url: '1g241kvwu4wq8sv96eagug2kvjkfy93e6ttvf5g5jdw565m4pi7zr8rk2h4a229g5vzgwqgvhv65t67i4zrg59qnikyuh0tbvcizkhzeoh9q32duyjtkg8w7ectlv5ra2rw3ndpuzm40uyoej43x8n5m4o0pc1pvjzwtzlj2i2l262vjtcwfxoitancf6dnfa2wn2en9kw4e5gc2wzuxiluvu4m2xtrdgrc1tejahcidiba4zdml13ui96kgf1kh5keghq3svhu3qeqb2fr6cd9daryf4ydsk0k1c89vbwro5st3vzyqmy67r5kobi58f9toa0ta5nro73w2qfdhgqb69f4c6pi3qz97fmng08nytxw97f8av9g0s71zyd9t01yuwievldql1spuacdsbfy7prlscjtp6yhb5hi10clhovni2f6f34a3j0wjnvmfl01ej73sa6ff6skvucf0ycx4rizp4qlw7qmmtgrwof7pjb468lash0k48if9yck88drzcbguegg4foiqyn6ihu7s72vfl81m4yz9qo74n3yo1j1ouxxcx7bwaszwnd2rim7bra72ltfd2fm527wn7znbpaz678jwmb0j2o182ay6iihykdnraerdoidfrzng8g00ifx8cubpcm8s1iut6p94qd5tf9wpaemt4c6awps6x7rp0b053nahvmtnveters4nqbpmaycfxptgzk0b06nv4u7u8zyiyzia4vp239vg9vxvizgzyna928n0pivjwld155ch4jg3qrviy3wjf3jho1ysa5girqzkdu4h8rh47n3u3f6ohzchpozysqneyqg4m3nsp75tvs3v8bpjvw2in4hbzeuyargx1xp23gu63k12n9pub6cs0w6eqzwzcjv7tgq8zmmlad1e1okhuqtvmu33ndbrau431thmlasx8wrj3hohf87150h5v6k2xog07idqmu6mh0sohmuw4nz8ryi4fnxwqg7s30kfuo2ivqaxk6o4eivmvwpmp8vz',
                mime: '8fzqsx5efkf8xob7iskfktrfkh7bwwv2kchppkg9w7uy437821',
                extension: 'a6ur2enuy3pqgxh114elrsa2zphwc899h5iw6ige8l5bqvhyxh',
                size: 7966396006,
                width: 125504,
                height: 260294,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'i10f5qmj5bm8fgpom597vpiifhd5jzitm6wi8kpj493x4ivpg4pcwtvji3cm7bamt55i042xpre8pyq1hj83vhdefzfyjxivlvn3ygffd9eruw8v0lfmvdgddgc64swb399aoea60bawu34jlgmbtappmf1v4sn715hd1hc3hsbq2fwo94ydf7plpv4ezld6oean5agy2jmy7hm1e8n0uxmasnly8xbzybtzhcgl71fll1uw9y8ps6aynxtoj03',
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
                
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'nic99no9oslgfk19bloo9nljares6nwnx2r625hzbmuclhhfc0lnlt4o1785ghtf6k53gx9takq',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 665990,
                alt: '3j24iyvdz2038j091197i6t8pm6nct07i2t2yo6x2qmejpidlh4egvfvnw0gtrdhz0vwdv7lyhambs0tjvzq2bzoz0wwktufbi4uqfjlo6uv18u8a9eqzzf1f9r3dreaybd6v3y7fsfcyh3wgrri8duvdh3ne9alujmew3yzmk23jkzrc3ceq9c0wd3un45lidc6mu5wj20gwkxk4x7fcp8qgwtcbjyp5eqkfc5vtzd0ly7rtv9x3tu84plp3ti',
                title: 'v0xlp5kbsjdio307dcsvl5342pu6c8947mvz6fiod18hu1palakuq2t3xqw6gz0juwr6l5xksnfqhahp86k379cmv6isuxghpcsancfr99jjaj0x2ugiot8sqc4ph8f7lnnzt4jjzkp9ag2rtpcnwp7mevlh7e9pm2bn8wza6ryxfr8t6ivqrqsuauueq5bpocq5z803lrnd5dnt5zuyfpxohgrzcuapkc6ocvgaex2ircsno7dhxtr7jhu1jq4',
                description: 'Similique suscipit ad consequatur velit et qui iure accusantium. Praesentium et sit et accusantium veniam provident temporibus. Aut earum eligendi placeat sed sint aut et voluptatem. Quaerat porro laudantium facere qui dignissimos.',
                excerpt: 'Quibusdam velit magni sed. Ducimus assumenda quam officia voluptates possimus recusandae. Qui sint qui laborum qui.',
                name: '6ah18hsm2ayvv1yfq7pljhif04qyiy0gsnrij7pimoe7rvizdeyg7zq8ymex9sg0zwluuu2zz8htqub606zxk2pvk3pzybprjq5n02fe502z3qlaxsvvxbokpo9gnc9txvx4imxot3gj4rojqs6vf8divn1391ef5notuxl0pabem8xmch6fc8gzfe5adf8rhxzcau5cah51vzrrxte9ozmsj7s2u2pnzg6vdoj0h7yrg0mifae6m3m002qkug0',
                pathname: '4j0rzaizwe0x59mryusda40cjcta70ki05aows31skbt3kdyhh1nxc2d92qcqllg0eta91cx913zfeiprobki7y1du9q3sn1eqifjtz5ncp5c8noqecw63soc3ao5s8dk9eey8o9y2xbauj5c2h1d310seabwcqww6d263q21bjy13u332mex6f6k81tnrbugqct7geaf2jyng9z2a830uvu1vqj4z7g1c1cpj4fnau8rwdhzb3ptsr4xmqs32ppb4zufnf65zn77c8s3f3dne6kqo9sqo4z4nk6ylg5cyaexcsjhpkys68lc0v9ei29lyo9yz6m6xvykw3vpfzlr97j5l2v73d831er2eqrrc8w04do3qryxaybfj8qic3rnm4jhzobxdrszynbb6in5ml9uctyf2b5392uttbqh81c5pg5j7meid8gm5259ycjwik3q9tq5tav3qbqdara90xh5hluppomyjwu5lnqzxl283s72dw76pnbwu0isow8gtxzgffru9vkydx8xmkywppvbsfgrk6dyin3iwfvx8bcpjnpjjihdzmsygvdjw3ji6f8wxidqkmvdssnwoovaw8aiz877kqes6maejeffo0pazopkrbmyehqt9lz8nkjd4pby0yt2h281pgdjf3lvsori30tnenbzzz3fo5p6eglrylrv8cj1rlsy40a3l9pa2cf2f9zv5mea2yqo4vne6ji4z4bpths4d89xn8bxoycofs44s6yoisfyyjf35b6xflx9owe5o4te3eq44m2vxb13r1r629x9n37ubrbzgpu71vzz4iaa8rzc999wkxxpe017eevso7i764xdxngnf4tpbt5v595mn53ea4wnefotwgax1k7lei1fhxpc0zgyuov7qtb2y6ntust7nt4b7cvmib076833b95ra8hsquftk0nsrp3aeuc16pp6it1h0etdylzk5zg6fhbtwdwsm4y772e5rw1ch4zorilw3z52z1dky6vynnhfxvhgymd',
                filename: 'j6n39yo3ccnufe17bhx7uyuqbcgt7bron46h35jvno8y4gcqbcwc88ws01ztfnhumtqjr106vjd1jgftuoj0jzgx0exp8hcq9mstxxt5557fygglkbtr8lzqf0tz26laghqucicptzrxkd1noqec09imzqxxg16pt3o4nu97ulxs6s2ffkg849573o9d1b7kfynnvxbhza633yexmkqr9glstej8oiwtjxdz0ygmo2zp47lbzerzgjvv85oai7l',
                url: 'vu2b1besorvfykjx23pggxyp1lqpnqqkmb5l1592tls3nl05j72i2evqnsz398xqgqrfvutdabyn3i67s501hnyjnu5e8tjz6l2espqfit4367qlaj18vbwq32qhipby2ncu6anjtbagcnvilfrd2q2zhjgkjy7s43d9e2leistxnhtrxdj1hg7yq1m2yoenvgu8m6inuiwwozwklptgyx2vw4yz33dqeirm24qtls4g6ioa4ywkerf9e1mcbp35bx5cp2gggelpjjv4wnk23ay3bzhuqi1iasbn0wfm3pmcv0ry8feot8mycaqpsxu4m67yvtmga2z7ugk630laymm3svwmfrcw8cdju830wlayltddp6vtebntjv3s83bn4gnow5uz8uxtrs15ikcxdth6zga0vr5sorqqynsh56s5mehz389a7gqwlbnl49kxgrwrewuqqq4z1qwddk4j15wnkgem278bow7wrj7qb4gs1wafoo5icj6dsbzvwf107u8gwwm0e9e6abjomksyck7l84y90sqtlzgjl57undh1wg5n99ks6actgddm4tbh794by0o8a0mknfcys0ddh7kj0d80ozyf7aypp79few1t7nxxvscoxma96bro5kduhthdo1ik5mxz5hb45hyn9na5kz94bblk984ji96l1ldil9cw303ms1507b29twg7dde0aj25lu8daqd8kboxzmt0litqkh5z2ve3k11xu3k09pary6vq2wluiegfmqvz34kiab9o7yz91qifne0s4trfc58fytlgzpfjlo0bjpm822mscwx6ulpa983dlhzimzi63500rvx295js4cnmat219r1zz0bf0ocdomr6tkfk7wqhuesydb72so3eg8rlf3nakl8jeqfvgh2hu8vmspblcd07ned7a558edjy0an3e1qmc5btq09lsxsilidebd89hqt0of8qjkcppomqckf06omfxpo1yk20izpkzs0xrx1ba7t6kklqmgqpl66n',
                mime: '5spkktogsq1of4jcuriwu7adoya4zjbzmow9r3atfv0g66qk0q',
                extension: '2t3plg8cq4vyz11fcvgrhjm03cdlxnvosvyk1ihh1hq1x57zxy',
                size: 4024513448,
                width: 682027,
                height: 821298,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '43hv7eypox2j8d2non3pwi8s7tsesp1539gej4dl74khkovesam70j3z5sks08h06sal4iej2ryduwcjjomdafk1ff75c8mi4ebza2fpzarcxuei7aken4sha5nzbcr8s22r2ykvkquvuox25k75hzym1fikkqml059lcx94bmtfvvvh6rubuugka2dl12ndpg6oz1rersrnm2k79ugvw6a69jjl9rhipzmvk1a2iqhkuhlhdzkdlxuwd2pdx4q',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: null,
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'lqow9s8gf9zkdevt420q2bkg3wckvb7583inidizb8531uvu9hrp03zr26r1wry36pxhwqxn6oy',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 275477,
                alt: 'xan2ygyfkjummgmosc213xrethtpeo6sw9che2n2c8hsrp0cdrknu1w9hj674wlewsik8wag8leol70f6x6f3x209o6vedzqtkwunh9zl2m3etix85iqnh4lnj5qpmy884l23fgoo3taaobipb5760zvdga3ce13fwtem7exohukvgzcih6jpyyn23fpxxjm25w6gjra9ajov0nng5fbasgx9onqwctmc6690d45ff62nwahxtdhdfi0h6ssbmc',
                title: 'tdxfzgzf4alpw8dg0fhcyxvsut6mxqr5fnyhfza13qqwi4o64f02qbui53ghri2d4gcqk0iges3btoi0ozo4kmkaicb8n76tlur5bvc6xe6vmiya2mx5vju7n7s51xk7l2w54g4na9c9rjvq0i00bf12m7vpfrwwakv8seem0llxx7b9lrnekzn3wtc92hb5nrrc6n9hwkfxxk1j4ftgmkqn9ukotckk8r00o3d7jvj7gu2yla1f5u46as91mox',
                description: 'Necessitatibus sunt dignissimos quam odio omnis reprehenderit sint adipisci quae. Ut et sequi. Exercitationem ex ut maxime quis optio est sed.',
                excerpt: 'Explicabo nihil corporis enim. Sed sed qui sint. Omnis eligendi maiores voluptatem. Ad vero ut expedita sed velit dolores voluptatum. Ut est quisquam qui.',
                name: 'y86qoxof5vnqa20n7v8thgxgh5xwch2564wjikgjrmakk52vb48c5pg5snh4i2zn87wqx64zebie4gng81wf4t7zg3ouvb9c6t7mf9ta11ib538i7fd0dl2giu6khqw2daszney8kirf9axyi5n8uasgjlw6h6te8j2uhey4mnct9l3ml9k4tjq32bdixzg2vs3w7k0qlcg0dcmcgp3969mvdl2a8isxaxrguqy67ad87zj2h0a8whq9njmt4rm',
                pathname: 'jg6weget14onrm41xq47baohb2p6jn5lq028awth97lf9t932an4r4ajnfvb3lzvfhd2yc7xqphruah90jooaylcfc96jb0xprgamg1bopwsndee4v930a306vbhwbkiojcve7lzksjzrfsgvoghpqnq9x682bn32w8syiezwy2k8oibh7kej9hd3v8kjbh30hnw83x2g0gsnwvpp8rqb9e6f4n1rwvn0u1n90ae0i8hggtk991q4zizjha5twenx4oe8yp4mq087h3ku96tm9z02c932343qti3p05u5jle9erxv8xzieysts5qyzip9tzaobl8rm0tqk7ntlu82mneo4sxaj39b6mprdb7rofqwmwaba6ecoaykdc5hjlo634s5qlyf8wxt1mfos8pg9fo5dezfm6d5vj6avoj1774bsp675mkejhgrfvnec7nq64qb92e75rs4aj43w0yr2tb0109pxc9uarmq0ywi3uq1th88atvsmbyf9o0gbhgdq5y1adbwuwh4a0cptahro5y271cj3f5nloxa1jyvu4obu4grtkwleo9hnxzkphwzo17pwifmxmmvehej4klrhqp7n6nfhd125p2f2qqeoo1tukvu9uhlz4cp3yqc03lipsrrlodqdh1f7b1fy7xor7bnrs0xej4jw6gr110rmzd3zq3s166rq14ab86cctastvci3r380xooxsy1qwxbo8my79zm14hqwad1e28ioqb0zzghrwer7hqq7twkprgl2k9iu7tawa6g2a2k8gmydtgbmtn0draw4gkrao602adke0ucwebqso5g0rkbmxcsr1478pimimdvi0drc1yy3p5iwcp71uar389uhglgrpmlbnyzjd72f76n7phl1pc6n5lt56qp2oom8tlh7ki5fiixzlhzcaw9m99phu1ovwo261zx2m8s1aqsx14lmzbmu953dpiv02leajzpwr9o4pwjjlrigxjmrfoqlagmca5421m0j84yr9x0w9s8wta',
                filename: 'fwmix30br44ijgyk046ro1dvkvj7xis5cbx6sy9ye75y6gq6knfy27r6xtvkpgrebdi4ktvdawh2frijpx2782gmgdpz9twu2txa9lnwrux625y06j55zg9ud7zd2wbk4vyup0fkkclzsrd33qtsaknpmwdl7vd3dkbqt21vnhaughuqj86oav400qhtee3ienqpuuzpqm7poglcqrwtgb9nl7ceajps5dvz3jhp7qxv80x6irfnywbdni7sb4j',
                url: '2f6t5zjwsflhmozgu9ar68e1rqju3hd8d6jbd419e8z1pnlhfykp3xp4166g2h4rohg2s0bsebtgnhsmrnnpvn7218b4scylp7mqd6ju3diebrm2037mbakzh5wfhqd6dwoek6t4bqgqi30baev5xu2s51y9c1uvrqia633zt1ntbt2gj6te6tv3r7r2tddh0ecmw43cq1graouf43ot5r9pxnfzgrt8wytw1zkjvxcnq4f9o63zx4117g0ilmumxvmme47l0cxa2u26kvnhc8nq880q3d0na0tyl5p2579r690ff2rdk0sa6ss4lv3br1f1woyg5w876uwvm8kwp1rhpycfyygpw2834ej0xohbpyp5zc6qq2zwmcqpbfdsmh1hzqpoum0p5jdob2az0zsnw2h3dlzdcpwk1wr0ut4ag5nw7n4qrjhg3cg98zx6xcto5eqw8ln81vixafqrpkdx8b0kdbaxcshj66anddtdgxyt7kwrtkikjd3n42cifpww3vo7r449wscpxscc6u1euuk8f5x7liy9f2tdym098tmyvzl7cn4jpbgb3qhbrij18nywtu2zf2x09xuk9qbswd3fv7r3pn2kly2ca9px1qd54g9751hxpzsy5xu7gb7xbqgcxfl283qvachw6sahhj73dn0ogtluisx52swhfuo3bf84hsu2ztuh6r8xyrtknzdlovihcd4v3ymdu799ydulrwzxnwhf1tvh84m3upy0wbzmkdi18nkf2swjipyveqx8nag1f4a9nav7zfjomo2s6vjfasl8agxhe9g69snlfij2j4iby1qjfctd7ncnsfdclxjuqoibubuh36p2sjb60225m7mit7f7gi3dse2mz1natchfdekby0onxybrv9t3fneypcxod8j0gppn134zu10d2y0dobot23twg4ldf17kbh0hxr9hhbgtuh43arfgazf6qmrr97qv4ei3c4nhe03gus56ma7hr78vex4opy7uefa166ck2qgy',
                mime: 'xw41hecs57sld96vlb2f2uj3ypehytkbeyh6gphy89ilosdoj6',
                extension: '3vfw99jyr35wia03rfqr2a36j4d51tmr4g5b15lae0ajteciyj',
                size: 9805633215,
                width: 665173,
                height: 576442,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '79iyolcvun00pqt8jmdsyrwncjr6cnibhcg8fmwd1hqnpgph1m47vvkmt9gx9klstl89rjb85h61skl1b5gpbohvbc48z5usfjbauk0x7hbwxveb956lvblsvdlj4yqn9lkzwh0baql18bgwy8sywl6x8fl0wzbvn1r2q4snu1vexrxc4nsvn7cuqu9w03qipuzzk7ihlyecdjn1u0vacmho4zaw1adtn5asxpiuy0mjn5r3exdfjt3qg56xtz0',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '54zfx9o71sfur1j6f5ij3pkmq4mu6jn96zwzve4hi5gxd1gan0cj4e16gjk66dv0bfl30vu90jh',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 847439,
                alt: '977kjd2lwfgzl0oemdz3yh5k6hbcb1iz0vt90c6da0onwtatu6eipp7dvgh1na93b6jfglcbzf4auka1gljg99se34j9vf281z7f38yuv86z6wv7ypcr10g6d8sye1uz3r8oi3344ssxxwfxmtudmf9bafoxe9ttb3j4xakpzf5n7ufwy2bzn7r6xsslj2c2syp6fpfmvzf7lurs0x3rtz3ztvs8lgohdpo357yv2jccxq5csbgb6d9pfxiogq1',
                title: '4e29grwmk0e8ychpa7cauonqje13788p09fojhp3vgdjk1kcqocrjjolrz7nxm82mvh7jsqppqj0857lrd7sz9c0vmkjwavbiclkzgp543dz4sb00iccfoibt37gk4xgcp9frz127spqfnqj107tyod1y6lb39l60ah9kfw235tpye7bymbqognw98rizszdufioaz5lio93umyuon6559ezr24eeen7mmahs84dlaf8syyxn3splkyzbgtpb7l',
                description: 'Et ad quo sed aut exercitationem dignissimos. Earum maxime possimus asperiores ut. Dignissimos molestiae laboriosam iste.',
                excerpt: 'Doloribus quasi libero et accusamus dicta aliquid enim et. Dolorem ex voluptatibus dolorem possimus excepturi velit sunt. Laborum possimus quo ut.',
                name: 'cikop33qevygmszxurvlg9yjx2vt5hmjhw1oej53kt1brb6rngvs2l0sbozcsmw0u3biok6ir749if9td9bma4cxz2xuzwkv29s3ir4syv6l17b5wolhstbf44m88e9a28j14grplzkvm295c74pe0uxi6jxmsygbevleipx1aagtiqptrmpe07saipcjwa0j7doze67x56wt2fkssswl73ikaz5rh54e9uv3r1mahiq5jrsc118lw8kgscywjq',
                pathname: 'qufus1tgxv4ojlravuqd0xcixbhqiozlxipqvlfwmqhqvuwrrxgxfhtd2fjwtup2w43ozisflz97exurkij2em3cesd88trehfidnntvzarjpusph6njtclrqgta5d0d6napsqpwusrt79cx2rt8vbgqgejgbprooaj12mj5aelpeahoqi65mx910iq9w6z5ciyktj8gcza8smg280uv66q21ijm3jznx00ylf7gdph7aevcegm9uclhzdt9yu1feky588dtwbh3kerqwmpr8ekerb6upb23ybxni5y36uswiphs87vexz3680o6acc0vlns1160b3y8babdw8bqznp3xa7fw2ynn6kj0xf0kgo28kq8v11986w35dvqhb0279pymmwb67h7zde6zkuevkz7hatpv2922tz690ixlzg9a7vugdfoj923fe4yajr106ymfdwixny61l24gb69uasg2syvujsvudo847s1j79htux6qn2mdflh3g86ud585mfwdirlxz8xncvgkaiksyebqiocrmg5mklpwbb6ot0qtajn6ys44cn94epa1zkzt6ixf60l1kmg5kkhkgnfoqm2qwysi1frmw9sj9gvth2lh1dynw2gbt2vhxns7u3s8bpxui04zek16lbxj6wvlw4hmuvl9jku4hcjxigoheueo85cl7loraii64pkwg8nm45digpquv7qngnl7jzdv3h2xzzjdn5vwh9le45vpxefpqikfyb57dsmrm2iz0n2m9m658gflfjyjupi5f9esss2wchgmvoz8cnq0zhn3r20ve45dkpw9ae9ka9ywp3vhr3mh8u9wuso7f2zn95t0vee4x65iz7wnvkf25ht3ly8dqugn2w4bepvmwo6c075u2o9u7l74ovva1a93tu3txay3o9tfl7zzdvfh5t2kk8cvs9703q6fif9hn1zqolo0hm8rr0y8hl2oh62kej9fecvkhb82aixg7zww32eqvzd9vk7spj713xvjr6nug97',
                filename: 'gtlan0wzbnyu2p0y6ft9qvryusd8p88vx94fixzeau0tzfw8z0zgtw3w9q16z0l24mwy3vm7ob13dhfbczpjxith6lqz53fxkb9dfdtf6iiuni4yw500he3noigvyp0e2oftypbim1314vgt69f45036c517xkf9j94a77fvlcoio592fmzzpv8rjohthv2lpsqa9qo3p4hz19d49ys7qmyh2842x649g5p15w5yfi95w0uq3t9ae9osvcv4g6i',
                url: 'c1il5ppe4ok1jj1azpb7lh0530iduhwt9y2yo7d4jdn00nrku5ock4bqwa4v2k9ttfqzi2l4jngmkhxlekoe1rxbk8f24al52ruoe1ik37jw6hemyaxm2nvv0lpo2fcbhzntxa9xnwnax028kecdo9cu28efuvjogr1zvfy8nyw18mv5zbuxgx9213lv40ie4fiuco45nv88bnf9vgojzg79tso8sjzemktrpztl903xrdkqwyx21qcnq9fz5kwj1an7db13qjg04z5t7ax4c5xy4xydqt11qeqo0sp9jmibjtra4sxna1lfayjr3rsebbgrudh74alxbaujbel67jv7b26niags52aeb7kyplhjzgav35f2in7ia1af0n6f3e172f45lkzdmmyd4qgv812n09pea3o03o2nvvf55atdwkm1h4o3w6j8fk004jn41zmsdivmzb1tmabkwnwqkd8r71cy9fw0ozbi4kyci54viudrrw5falkiyqg8d51zzu8rt8zagrszeosjfsnfz5g718ivku1uadwyw8iqbg0l0r7kc1vwll092r9cfpit15srlksw1i9owito1x9ipajowikbdtobnhsvfd6a0rnun8hjxzxg3yxq4vi9m8jgvlnzc0f5x8crzmtp3neshx28qv5nvwmkos4l044roezf34nzch3sq0n4khwil61rwk1fqmgek6su0cqbnkcbozgallfvrblnpwx4urschjk9fldbj489fgyrzsua51k4qg9b2s4on0wjkd3zymy6tmuzldif6an2m8r5ck8xek0wf6ag6ac3621mh5cbje9ektmfez5hizzw0ya35ikf3pnrmbtfxyauyl6yyoow2w3nymwgs116i4s6lukhljew4pzqwl5lihjyejiyj5vr91gpa2vm28zfijkb0vqlosgzrxfyl4jlhgjpu2qknsoi7ad6gxe2nv3ke57qt0pkyda1358gogy7sr11vjei1qic7tf83nnqhs8dai0gdevw',
                mime: 'w2q5s1zr7i6rnh87z71bnm8m02vgp848d4fa2pywmoijy04fk4',
                extension: 'urwgigc3oxyo7osmdh6s3ax3llwxaeknpyvxk0o2apc9ilh0fv',
                size: 2853448706,
                width: 612843,
                height: 161955,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'iizwqxmxg8s5drc6h8focb6qkz9zouiht9ervngrmtleysvct3201irykvr7aizqg6pkn0srlg0e74ewu2ktkqhqshkjteqbjw8zhie07ccjeq9c2wnd9db9ykcglk3tqotxkyiicgrj6imyvzsbfreerhtf90jfx3yk6rcimd1bx2v6poatsta9cccrn7m3q55legd50rrlyhy4u4v11szk5jg2gous2koq2hq16kc3at71udqv0ujwzmdrjc4',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: null,
                attachableModel: '9eqjnwt93x6mznijdazlimqp7p0l077bfjo6pduzfjgaxi0oyyof85y2rw3ul4ec8otpyxl1hpj',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 996705,
                alt: '8feqazpdv3nreyxjn7s2b0sy0aw9azjr96000vgqo17rcyaydzlik3bprrd4h70e2i1ic94qi35cdg3r02dee5i62xjdta5gqeazu52zat76npy7s9oomte3tbpbihb8rplh81zyg4lfyv3rwha7wq3bnv2oo3df1v37q7kk3kbfhgcnp3tduq9gbquzx94cp3mdwvy2cvrhytet7zm532e3eo6prjxu7nil3llzf7yzmjkr13npsna245k8anh',
                title: '1rjmee9mzn2wahba5p2fzt489vnsbtc6lbs4v3aan0hnqgrdla5b0jcowh3ignmnow91zfywevtusouifcxhfe2nyn1z1u0geqyngpfnuxys5ad2uaacpphp12ef6ji3q27avnv65cpkvk913i72nhp3ac7oxmrr11fdkq6nwa40d6ug23ofsm8wau7q9coa91i3ai2pkwewnrztyfgm3pp6bwhkzl0f59dyvf7o8zulb2k5iy8mfi2n7ovpdt0',
                description: 'Voluptatum nobis quam sit totam rerum est sint adipisci. Neque iure ut itaque odit ea iusto. Modi dolore in. Earum alias consequatur accusamus voluptatem ut.',
                excerpt: 'Porro beatae impedit enim temporibus. Asperiores sed delectus praesentium repudiandae itaque. Consequatur ab voluptatem sequi quis iure illo autem. Nesciunt in quo autem eveniet ipsa eos. Deleniti et pariatur quos rerum.',
                name: 'ewbkodiq7onwjh3pge5cpdae4wh6i4l6ai46syk0mz07jyiaw0odid6gwdnjw78u1jx9y1vfmekg30e3ddzgoprbwsxyytmiu3p3e0dr2h6zouczcj7dl6njzfdi4clxh15raocoas6st6lgamjba0q6eeu57ctr7tasxm3fo0n22r1hhcmqk5drw7y3ohwecd72mgb26wx2cwrymvew7w3k5cgy1rl0ffwg5qlbixwql7sfsc700rbneyglj6j',
                pathname: 'qhny7juufr2fdluy587yb66ne9zgani805phultu2i8yaroq3mbo9r9eb4l3rnmfn7s66nbzhf8n9y9lo8llxlvzp1ahegg54bphzvrkgyhwpc2ipl4wxwo6fbtfw4yc2p9lpmo8vd80ow4wdvjlr2rc1rudfabhdbmrffft3jtymx2nfmn62w8nwu626iki3n72vqbhijaveuxqwjvsy4zzqrz6v97l1h39v4hew7y7uipq7i0ogwixlss3ofkcy1hvrdwxr4a1fhdx5gzyosy6v4231cyz996vilms5dfouwow8x4d2tpmycoqqaseced0hrs9igpf0feg7o3hi266szikvblzh12xsm6o82q525mgiauguy8271fe1yovlhxlwl9x2m2jfnp2xlo1qa47utro91h59mtba2n4fe52ynormwe0v5hwf6eo3naxefp6zl88ui360n2edcbrllgptxn4i6dzqgi3p6d280xcvryto9844ekvi404a49eq1pnid3pm7x8251y6t4ux04c5pq1zh3dpiysqtfs366f5j8y5p1idr4fqhod5cf53fn8trvrhcwi7cjz882ij5xv500skrx54gnikmxh1nlwhxlz11l4sp2e85uu36sx3e4saq5sjsizq2boq3vfifk5fuat2oxyuyx5gz8w7rzk6cmh1hwbxlexvax5hsgq2lbdtw3f8t6wapbapfemhe70jq25f334x1esonp14tvz2pnmbwno61raydvgqvcqidlhwawukxc1q4jnj1o529rch5oyo6k9ypoweisildbqjh5r48yoa5a5v8pvwxjtzarpqiw1v6darrypw4z8xvlhbzov8br6b7bs7z6ttstrae0e6xsm1r583vydoh7e2hfklfeg2xl35u41ctadi3wxg64b97mz1e22wlwahxwmgkm505cgyh7ydqw6twfn6dmgxkclkcyd9sntva096dh95kw68xm0qphj3vsqz1pzulexe46pl52r3vi3psuj',
                filename: '1jvgoyoo6zc0czowtx49zetn9cx1e18segbcaoe03ij8m28bph0ydhsrfwggzol639tru1eeiox0i7a26s34fve2mkswuf0p5ik5do50e208fz0rizgk3ho3pq6zxxp2yxos4rw4x67u7us2yubka2r2d4t9spedehh3lt45qqce773gc97265afm04vnfohsy2vsjzq3efd9od20sl7ovx3a6weby6cecd5bvleqmgqv8b72naa7l5pyg94y5h',
                url: 'ul71yggn9m8zio0y56xbnlj76l9tk2bebsknuo8izqcrlbza4mcupddio4uh5oqq1am62dqp2yd9bfw6om6yk7ynoi5ip5ymcjhfhdkmvxcnflnrad5zqfrghge73z0p8icaaihic7ucvmq3d2r7y7othg30xysih1s4j23kdrv6z579w3weztdjdzznndkznif35r5fa8eusjm6rpehz1tl9eplvvi8xuwe9m2rnzi77slikbbbw909ijilqi831t2wwqrxx5ajs6df7mw6g0r8nk25jielz63kewreq36hvuveixvrzeaph9q1pdlod9gps9ulqnte1msbrnbelubsmv9b5miy4tal2rh0i80e10nmgn1tjtabcnw8wyos2d8g2eculxwkdz6penrsxrk3ovigbuf1rhb035a1x2mgvplu8bo3cv3w53kzc1459ns3uhjowxse3j1lw10b9uhb7ip9empv2r495p8kk44jzvopboceq8y6ibblmisrh33nvvylal5mwm5l554kt2tbqhpbjah12zz0nxy35ibeejucloufkl172g8cfv4r4p67s7s1221d3slt4z6m3oqtvw0ty8hgaw1ag69ywzsmhdhvd56jty1x42rfyd6dy26z1ve13j7jtdk487973gmv8hxfmi1m93bz9714caneua7leafbpah4febo3vtyctn45my4lfj2bs1x96sgmfrgn10orvrk72ear8wvp2nvebjio7gga09kjhekjqwq63u6tim92wvly7mw6hbazovmcbzf2g7qs1myfn6uygwxt6do9kvxqswtidusg4yvp1twkuuyj2gdvgic6os6au9hnms63zw7dorvscej71o0jz1ah42mi7jfd1m8pzbfbv09nx5ajbl14pcv4fimqnbkgqlcqex3hfedh2flw1r0khp2cpiubjxqdagkuqlu08afxz4i86lwett06lu21h86ecm3mmoh9ih2zd4wbqu5j6zilb2309cw43zdpeov',
                mime: '5gdxrzxx1v0191wccfwvw5m1xgqm10jko52b6jqmokh2nh15lz',
                extension: 'vssy6dz6by2v02wf7hn5l4451vpuye9hpuluqmi4k887uk5dhx',
                size: 8470189460,
                width: 447035,
                height: 921388,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'ogu5yd6qdrgsz2c6bvtd35ud28b22frcahnric3r18n4hoir53274zuorqctu74kv5iqq281386sr4i4dhmynnzherrs66cnn6z5j5a6ln2pvy4rpsd7xrc0s9ntmzk3q29f477ien8i4wly4hhxgpq9jl03z69628s2ck2vyk7eviz2vfbqusflws6jwqon7n0qjyntzbtazandps1ctj5o8haccglwyf0bg9xdpwxmo1tibakjvx21ewo6vrh',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                
                attachableModel: '4ayjk8as2ee39v0bl03ck282f22b3c9bp5ghziv8wuw1mas9a5xfeba91jg1z420mwfg4ti2wqw',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 365282,
                alt: 'wws2aynahx852tfergslbil5iujss2qfdv45xwywbge6g3sblmwa2vjjxnuxz12rr0vrstom58yxld31m7b7w8z58s3umjvurri6thdapzl9rilor84w1yjny8fdvqltyn49w0lefd6swyvg61rtzsrynzwhqrxi26lxjeov1tk5evvaokvw3jvkbjic69bx4kkg2mqg7fupw87phfdffjj5z6ylreaea7a8mt15ouwo7zxztspatjasq3pbskp',
                title: '7zxhi7rtmshpo3ehtv6edukcda8rr4u0yr4ow9h0dsgpu0ws1ehy3957c76ezmi6kre1hrnbzc4ifgsziprgv31l9gk7n5xr72rr9jjqb45fruxunb8tjpcwxkqj9ectiwujlcgu4pa88uf2mgsey7jzj3j2opt394t693etvgyjsvxwz874ociul4iteo95cwqi2f2bv6jueblifum1j1llflyc0hw9dk01jx1ch8jhb9604k9ttxka7kew1u5',
                description: 'Facere et dolorum odio ut non ut sapiente aliquid. Odit possimus est unde consequuntur iure. Aliquid nesciunt et corporis cumque quae id rem vel vero. Commodi voluptatem earum. Recusandae voluptas provident.',
                excerpt: 'Adipisci quas nulla omnis quisquam qui aut ut. Corporis veniam neque. Sit nisi eius.',
                name: '923fl5mc7bji49ob7accjnalu1km9o7g29osipu9m29su6tvtp1vlot33qsrbnn9ik5p0iqf15fr7vgq54lpvjx6n1ntlfi6d43agburjuym6jciz8dz3x2vffkhia3q3v2f3bgt8qryq5f0ytkgkhzkkutbzhym3zdsgl5zxsovixpx342j7w2vivk387joulkm0zaydv8nj2tyxbm2rb35yga6vpbuz2twla8tmo5cs6ifj13yhxfh9ec998j',
                pathname: 'pkl3pkwravqjsfqvr329iamp62020atfmgrbyt5wlh0jp1nhfk1cti0w164tafwwg72im5uvs2uctx105xxg5fst3brxl4qjbq57o7gguvrxgctynydmy2bkz3i5acs5keetgx27lqjzj62eyarq1802w3ozc2ba4x8vc6dxu9kr6fb1849zldrfo898p8uqcwp2w8w3x17lzb9v7pk9bjtlr59w67dk790i8vej3tqewfsauyjtbblmpmrrwxf4x1p8bkdfz4lmq3t9cdqyfld4irmpxdskpte5531syi1e0hxy79i4ezr2ul6m18kbw350udi2kr142emuyiut82h5h7vcw5t64c754usgdj6cq0v2uwkes1ui7yfclit5sdgcbelatn2ykga81uk84gn6pzpg21c3tms1xbrqh3yvc6wxis2avkmed0ezm9bipwnos07v2bokm9ecvxrg4yiorucopt0y1d3pdh47xnqq3jagn1kjkudljavb7xbk5lkldgi5y1zqug5vih77bh14jch8zesd40z7e71s2ae8ul0g59iig9h46deqsobvviz2sevjg5mer8h9bqw3m8sp02abyk33a67eiav4hncwphcu15poderw6uu5rmhvpn2n2xpgmk5e9px2y1e5uhfo67djmk2cwhk7s1f5eg6g80jwnjisvbseag1e4kk3fl1ctkaux5m24gkinfk3wkabs4dhxlo9blmadsqx53zt9df8pz0dcmhoqq9k7z210q885kzor4t5vb87v1dli4v931rscerctv3owug8kzfhq6m5pd9d7ycjgqe0bwdicf3ent0sfky0hr0mjh6sy7n3aanqvl3l0ug43bp98riqn0mmi4kmal7dh0cb831kw4kx3gdzulbxrm539r6t1fdqxnmq9du6p7xfrz5frf8imuomzppn3y7rcpv9fgurd3oy5wcclyyqvx0rukri4utl5empovtfd2adpdslsto2pn0k1zl1722kow89gznn',
                filename: 'k4hx4jsv03qhaaemlyhmainsft62uokmi7nblxk0r6r26kdpow6xujx15aaaekcfm7tphqgik8uetg63ff0vbyz55h0p4jmx8ft1vh6ap3almbitungvyaqmdlni81a5tuwohjo50svmb0fy40fiou7cazr4zo8fn7sp832w5sl79z0yrh8qsok6ldeyfejwdsn5ofvdiy39pkt0f23txatyd1zsn4ku7jk6keemy9ov5vqgjv01uksfb6hcrn9',
                url: 'uzruux77cmakgs9hve21n1xa6z2muyrh1r36a7e3vh6l6o01plwiep6dxt3mjhnovhvh8g7m8o63qyl9a231jkulwnagudaw5j2cpouwhz3tyiq3cylspya4hh3n80wroj48hhigazlp5i9dpckaxuw5k3sd2unk56ppggx54gvriu2cwqy6qfrwf3ox29xj2iha2zim4vs46mgvyk7t2rid6q2kni1bxls5uvctczif3afttwmk9074mil0h87k65182voo9frfpz3vymk2ytykxcutazp95ppdjhnjt3potusdqpdnpbscoocw7u5exh8x60yy0e6nhicdkoeav1ecfj593jb181fdwm9i9l82s10lykzncerh6547sv7yqqjxla5rrh6ms2iweizbxo93bs4gvw2ccffv6zbx24bgnmafn3ery45gfh0mrgpsb3sz4lk3nya555t2ydfbi7upf2i87zzbzsd40sq58rzwylh2j1vv9izoy18z3vbwkwzowbk3dmltvtb3ya6qmujyk2550uuze1irv80eq73jos98w2veo33mwk3xc7nqiersry7zrjzcqcajp2f6yyaqxcz8sbhar9vuw7g4p5p5ev67zyt0gfxvf44w3iaa6o69zyap8yn9vkrnha43ph4vv34k4fj5h9xmo9tiejxbk34lrq07t9dedd5zc8bum6jv844r6l8te0xnee4q42q7xx2pjskjkt1jyjjs7rilaw68ctoe0z70zju7i9ijrmcl7ygmuq2qkmkw4yomq9dqi1kecw4jabrppgbf1bvr367mtgbo87vyje7cv0zj8r4z1jyrhybtnnraqddrgj7dczrqmmumju6b92nd2fr3c3k3xi0gshpimdomf4un5lx0cdlsn5wreiyxphcgqzzbsy5bzmawjfkqrej1e2jvvz47vre2mo5c9pw52sojcc6unlh3toxu7iyhjt3goi4ijw50cxtvmgovwdrfcs8m9pliza640e0d35ik9z0d',
                mime: '1bglowsdrbd1abrgrho75sfpn1qpzi589vs2rshh47awp1n4ob',
                extension: 'mm04x1xj20bpimjx2t1r6q56wrfqmw0levhmlh56q9pyl4ja3x',
                size: 9651540634,
                width: 314459,
                height: 791616,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '3d4rp5o04sagntoydwiw8hkuxo3o4m05tzkg2hqn1ztk7edmvyj3bzujqecgvpwsodvwb8ky9dxp4xqyxrvup0ezsmhifjq9ac6bau7b2du93wwbgmxyozswr3atdg77ghee9u5z4q7mjpezwfz04bkf7p2go6e6rual4jamczu221k84bm763ldxgaoo5ebyrorofu4ybvnljmfxvz9qlanozq46bgboqar9pg8shb5021jhzhsf1lc29ycio2',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: null,
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 851336,
                alt: '6r4rxwvtnl3wnhdanppl5b25dj4og6fdid2jny9vy60ol2ea3jny92okga8a9vls9pob1rmwrdgfcj8t7fgwcvgta17ql0m6b2dwksz2yoa2rv2f5xj10cviks0miem0bye2rf1b90ix19c0i0mnc8u6z045ndkqxsbcwx345tj6niwxm9ane1hgyp7frncsngqw0z4214p431gz94z78vc3wzyxysdmn8cr0noc5n1ugtwopi2723733l9k6jn',
                title: 'd5zwn7afh4nw2k22dhmorumxeoxnu5bcuwlzd64axbuzlaz1emu68pds3uei2l0okyncisk07i235mc2lxvaxh3egr2vpsui3wka9s683rlh6r3uiusphf3ckzdacjwaigeu2efwad12z4tjvekt54v27t26d9xyh342ej4cstfhelu0ji4tcznbn267lt1hpz9h46pr8ctc7qsff0nh2c76p6cuht2j1zl9gnppsi3at0uii02hjaevbpmxtni',
                description: 'Sed tenetur maxime qui totam omnis. Nemo asperiores magnam eveniet quidem. Et quo eos exercitationem cum aut. Eligendi laudantium accusamus praesentium excepturi soluta. Nobis et reiciendis quia.',
                excerpt: 'Occaecati nam libero sint minima sequi. Non eveniet sint et qui harum dolor. Sit placeat maxime corporis nam temporibus odio ut. Reprehenderit ut sint explicabo voluptatem. Et earum voluptas est culpa unde odio mollitia ullam. Modi fuga consequuntur maiores debitis.',
                name: '8dhkwez9s2u877m5nd96rgeislo67ocsejnp08s28j0wj4eazmapqhisydx6pz8kygncwqpzknyqxdnzqm984wqyy4ss7bw32ekhltz92ufd93vdla7avjnt0wsaas1hgj7rxqqh98gpis085fx4a8d9vj6jz9jkn4elpishc319dvqexncbtgzkqyw7znh09n19vjpklheh0yr9po6pqe1klv1wgmmq28skbjwz85tapaygsa73k7ncroarym1',
                pathname: '4ctks08eanxvji7udg9f59w6obwy2hgdo38t1ojg2bx71s2yy6s29orf65qzdrrl396jisv4sjehxv0f69y0ndfcdkmfzqvdvpwsx5h92vjlt26afwsnxi934zsle7x189ckve9xn2k2uah35i0gm7uj3nepro6ock69mar6y2ttlr9dut4x8wni83ttkli7agtmhn6ydiobjn3d89pu5rkb24yjyx6vv1ir869cjpl8z0tx73hso61xecp2cv8dbfajfdghugv2wo58k0pqjz8m8mzoqdf6ui5jqwnze65ibwgrtactrfmuoi5ys6tkas4sgc4w3cgwib0zfzdrw21ntu0z11iuwqikc6h72use6pbgmub8ienxs9zk9zzn47vwrlm3bmug3yx7jrvfwg3lio6sp80ulew75cxxyxyf2yfn96t1bcxktlzjz7w421o94wp9a736b0exc05hhhj3c1a9ftyujm0dcd1r5typxgz0rnf90sfrl1v5rqaac8gx0ugvp4xac3aol8dr9pf41mlymvog8fpn6frj7xhgw3bx1lzoejb1tb19ium7cxe5fdtt2m59r7mtuvujtgfy6eq6lisydgmu0ra4fveyagbd85g4bes7dmj1z2bf95njfbn40u9wj9f79p6ifmt1f0842it0cqovw6ohb0rm0mgego0tte05gqo8is15f4tb6buprkrtmqf5c4zjc4fc5jyz62c3bdlothys6hgxgqo4vaulj71mvcv15wzkkm7a78whs76tqweiqtf8kvjxh0v2dce6kk95plop7b82wcmx1acsytaedxxix0n2c27mlrevlbr264acnjbz17ycwtn9m2b1pjkl4041gcltl5rpjcvbutz1psurgzst5l0z7l7ukvnzs1us9jjod5cqirvuhouvo0x9436adxhbcldhgc2urotk0752p4rgfqbv8saxdw6eyl5vq8fkec206sh6hk8dzogjevnw37uspj2yommqnhfz8llgwsfv',
                filename: 'oyhscfv4ppseo4towl28ie2dfjao1unxe0dtx87jko8sabplffudnq35uzs2w1f1h3m2jcet2b9k5z1b7umldgo2b60uv3dpw91jitgzl9pgugog4k7nmift3zzby3rpflys5q0wzgiuhqlwrbejswpm01koqgw9jrk125kq7vszksiqh264xhunz7sona35iq645dgxbn034ndhy8xhirczbb9k7z3l1i6fkdzk9jvxlfucu1aajr9ulfm1ijc',
                url: 'pu21qknvdpzaygbgz0rmxi7iwrj3zp8t3n6jd7bqofgesq3nmd527acobqagou918r9a6fzpihcrvzpx41do7sq1pq0zszeg76xii6avywt6xb71euiaadat3xuf5v1kx7dd22po0dusfj5z2i9q98cf7zmmvwftx5kmtql0bku4wu5r4i8vnlmde0xfxpl0jj8mi4qz25k9f6fb5r0dqcnfdr145kjy31jfs0k02j82h1n77mdmr3q52jrscuij52pyhtprro6pdli6ajd8jm84thq2ygsp1i1fakfuw7ow55jleejnrfnimc9sovyrjkjl00agl2567zhgewd0daqp3wclwafib38pptlj3j6nl9rr22zcow1y6lsyfs18wey9llpdw3q0usgxwmpgr7abojdeu5buys38ho4a9799aw4pa84h3ka725zh75b3ja7vzk68qi5wu73tsoo06er23ygaysy80oeowr5kw4dbk7h77adfgt93yagqo9jp5vde1op5t7fehu5sbhw60qta7dtce26lqx7cczf23injyind2h7f713ve3xar1n1xfshaqvymw7ay5ao5xozqipl4vj315zq8wwg7tdni2jm9mbkx4ejfb3h63crdxoyecx4b8032d39b281cvocca9hh5l1d8rvzr7hr5rfaxx8ywzyimcjltvc1zqgspqdxc7ngdiv9oceqp1fjs7o10wp74amv2iwtvjnqmdvpsprc128n518s66aqfsur4ksw4vbi7rvqe9ryt59rxtneu2zcuu6c0jsyl53zx4eaxi7om5zsdpcvmkgo148jcgo7d7zd8r27purjt2fvcntt1qx00j2milqkagdotpqxyysoyz98a2hzf7wugb59hvpo70raefuwojlyg2dnnhmrt6632e83h0xs4j93rda3fm7e96r455pmv5swcxok5h0ahxj18tm3fqbxoo6s45unc0pkpebod6mu9et5cjuujgr1mjqbw6zrlfki899plx4',
                mime: '8aexz1bx6pk79n3mbscpkqa6v8443dfa8nfdqrzixweizu3y5w',
                extension: 'gb458kexxlcb0hfpyif55db5si8itqhjptgzhkgzltyof4ip6q',
                size: 9567377802,
                width: 331817,
                height: 567022,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'uiblvn16aon673xj8yqo734jh1n3relldkdp0kkmg44kv5x7kyawf6f8g3y7dwmobdogkb31y63sfeyrjtnra7lj1i5870w8msnqaw9aheiyo3f4e414phvp01kol85vcvp172uki5wi7rq1yk1brjpcsi7fnah6g00py0lggmnwd2arxaemmjbg4vj5kj6eul5t2usn0b7uu8dktgf4kxu64a1kte0k4fov9kzcfsgbhe7c9ppfoo6ghfzdb37',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 873215,
                alt: '4z6142ppu9yn706bq6sw5g1sjd0ymh6vcu4219oirc85wm5zhuczy2lalcvxcx1jbylcvd7b9g89r6aqbgcijohl760istlaopxrnrzdzyrsr633cuc1vj663zm57v2hubspd3rfrto4cxi518f84hf2kvpxy3p5kd5ukidix9m3dqeh17xf4qiemc7vz9dx63vcyfte26o473e8rv6xk3b0nll1209iwtx6rqjbgbm4uxr4plhnwut6ilxbpqd',
                title: 'gi9vc6i4of6osqzgcd0zyv9x33o3pr87xiksu78ochfn21tgwvknato95jg56xoag3sz39e4gtml69zr7m1eu94w1asmrp2rxlckqjrv0pezd49miroksktfbmz1ckbe4k8p96lev2qlwdbzl4jc6x3au6sw7uyfyxp7n06t3qaa1omxix34mss8dp6wa1httc69zprivo63cexmzhlhcrhbpu8urej4zkha6hg2aj19ilvirjwagelrq0tpaib',
                description: 'Sint et consequuntur aut ut. Fugit asperiores ducimus atque. Vero voluptate error cum consequatur eius. Sapiente maiores et. Culpa sequi ratione eaque quo accusantium.',
                excerpt: 'Minus perspiciatis debitis. Velit impedit esse fugiat. Et dolores et numquam. Molestiae totam unde placeat ex. Eaque rerum adipisci corporis deserunt officia est.',
                name: '7ia36ujcud688zbihhwujzjdbr1l2xy7olo7o79mjeil649r5dus8twchs4am4x8n52re2unh133dxi7r1cevpxxlkr8i6a5e8uiwpqqtbdgom2garxc6hag09h2qmjidu6rotginp62cp66i28sw1s3kqg6qwjprz2a95z7scx6p4vlu2g0rc0njurfl7zm8dp9lfkknnqz7ha3wd9v8s24kpkrb2ylohnvd7ekjeuo12bi4pfe6abrgf7ueaa',
                pathname: 'p29vccc5mmh2cithawefvw4k6tsvy2owyyee0xk8odqcf1103prc77pwaxxupb9s9choym9yvtmafvlaf3x7nqmzuo4auupq3kexsikrodtfqq0yqy7e1j7wagf5z6o0gp4q9bmcnkzfj4iyy87ct5zeaa80skiid7llrzj7b71jtnco3ksl5ysdg0cw4dmiwdn1mmemkkati9od4mxcbiaaqnwldptlo3njrpv3mqj9bgch1z12gt1t0uln9ugz60062nxasqju2vxr6mv9y07nbt51xoi7ml6pvdm5xl5nnjnhvbngskxic2gs5i2owyeuqs2p7u628p4wqe1napw9l4sscx2wnnzjyvx3b7bdr62ixguhkuiqul4f819dhs3cbbhfr4n2g6t1m4alpyaemef1vqciv2awpjl6s9mar6iccpakr4o29bgzs3k1i0l1mxnu8vwoqohhyk8nbohvjdt2eu92aw9hbt8fyo5i594w55478tec8p5en6ts8y6wrt7dk7onib5ram2ebcxnys42tq7o6lx2mgc4fqmfjw5y6arwzbf0u99qp2oj2imu7py3lno2it14x0ru55dgpvippmc6llx0pwe5zhf4t8t2wmq1oymcs00u2pzz47t59pm5ed4ijxbq6fjg3igiy3sxqern2nlbyd9ie5w8sl2w414zddocgf1grkv0ehiqyg0odhl8budczqnmi1ycraf7cbkq1fslvoxkho1593tk009tz40fi8bptwb0k11ad1e41437uo7ykoxw3xz354pgw29ax79gwbj233ycg5ufs1bw5rxsnpogdgpkci89oak3px9yw6krkims3yiiati5ns4z7n44uz8zhy56zj04io81lgkmduzueehtx788v8zkdl240cnnlhcr1e1661b62tm4935unn41t8kevfdqxx7mywm8x776p0howvn7wg9hafvwzj1ev9sg8431z2ocyvsu1g24sq705bn1pr17o0iutwr9w5f6x8dq',
                filename: 'nr3z04znd11vm85tpen9x4i6497cj9bb6xkvl4bkwf83ap3gv5mr6euhtkozxs3natjgkwvbvgwpyqiu1gkzoppzlyapkioo3fa9oh5g1vd9se1a19z6qhfpq0mo361n8oeq78hgmzoxymz5zs6sk3vbqw93msu3yol4mnbsl4rnmvmarws9ay5gbfz0vkmy5wgnumfjxa5fbck1x6ky4g0uxyvxh5fpickzkf28crx7ibh5payosbmht47woln',
                url: 'uria2zzgw1mlfjkpffx1co7yw5fsdmv061kaus1xjh6hfsy94o47jq2uro8ob254dze0753fv1lmi5l4389e6dxqg4bvijpytmayfp80wgzep5pyfrcc47zoarqbs71kd44h81cbyrpd1r84cac8galve1rlylaoe8h63xjoqfibd02fk5vnlka35eywd941ag8smerqdo31ge3nv1tqwj1o7h6r8vbaq8lju4y8kkdicnwu6alhe0ulwrgre5eh2pyvjp26omj9xadcb214xb7lum86sxhvenpr0fl0m6qes7azrugjybsi8zejiaox4fxqu0l6e01ew0csc3m3kfh55zo6f7n3ap0j4mx2skhw974xhephiwm5my21ebmq051th9fjjssufkh1h1c396c5lbeft7dspx928v2x53eyhgbnt30srliqf8knr728eenis3rc4gq78cmr2oo61h4x754we9m3xi2bggxadk4xulie9c70nc3pihixjqfwsqvndfxp8h811tlcqxsnfp8bg5x2lkr06da3edhlx0e4j9rf8b1n7r5rsavcr267l046t0pudwrzcdbevs2gt0jyuoyrpg7zf9qm90xb7i59bmgkog988zf1jqtlfuijnnl7sa2dtku6ntzh10obsms0ozdvfo9vpd0h64cwtm82s97j8pnoagm128ruempfdq1ovlxcckea1b895711azmn84naixz65sy4yr4v5ti30hvz6g2a7r0dto1utudnsauud3h1ml3a1vvfifppt5i5k7bcw1zywxi8f07y8s9sh5mfyu9hwqqr66rxzpjr8e7gh64r6fshl74a2cyz0153dq99rrw7w57yxolgdv9wdme0hw0gc4wmtjigdakr4ff86ccqce8komqcwwlyq7dyrs2mj0wflfqs7hao0em80502tlytuqgq5dbne7sts1kxkchfneq56zyoy3jrt5silqtfd3ew251jd8p30zzq2eoo44gtckxjb0gb3ed3',
                mime: 'kgi2vfp557i82hvtii5gpljnlhzpzixv69xvklqdutmw7crgg9',
                extension: 'jh9wvblkgyqsmvcbtx3ppvhsldgp0tu2zhums6o7qseaat4pso',
                size: 9546594745,
                width: 954498,
                height: 152630,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'nda0r2qu4fbse3lp6yufakn4vz4qrsn5v3de1y4t38nbu4mkekj22h2etv84zii5qoi2xpdw68q94ccuutzf5axhyghzi7qqnxbegk41awbnxc2s5ihv2v22svx46d0t7gorekh3uzjmnu3u32b8j74llepw8gut235yzyehua4f4kqar3ae8t1mynmd42s1c259r20vfcyb2np8webp1otn3bek62p90dp2xjvgjakya7kv7ptloszkc93ljn6',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'x2z31jkxqyhq4boq49nab1g715b4rioc7mmhxrz1dwukz58jrldclnjc1x9f4rv6r7xbgsi4rrm',
                attachableId: null,
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 458329,
                alt: 'ndbyhmc8kn6pgqmur8tp28y78xp3rs59io3gtx4jhphd0b1vf5ntm6vik7cbwar02856k07ntyw6npldnufxkzfadjua0ts1ox8bt6q4ky9hc5qcvh4bjc3fecljxr0fv6chii1o4m1vk76uinwsy2b6eskotp2kw4mzels875sgbiqvncdxwrr1n0bo6zaeqfk65bgr5hb858ctnjngnllk2z50pabc3j8tbowd2dkp19hr91a33p4ph7lum1y',
                title: 'jjvg7pfwyfo6bbhhtfsc0bm2eo3fhyksg3ejsazaqegrst7byn7mdqptvfp1jssdewbycbqbbtzwrunt8nxxkji1uda2plw937zs8qsbojg28ozs32dwt6ugxkvemg0559mpy0eoqaol2hidf456a0secjf0jv2uhl9nczfi03pq5gkufthdpzfnamp94ypj4vfs9kd96krylc5erevysyy4iirzilpvuopxyygos8uuho2ntz6fboz2f0e35i2',
                description: 'Maxime consequatur possimus totam consequatur. Laborum earum cum a ea quod iusto. Tenetur rerum quam nostrum autem modi. Hic laudantium quasi id. Fugiat facilis unde.',
                excerpt: 'Culpa ut vel perferendis itaque debitis rerum similique. Est deleniti tempora eligendi nihil corrupti. Laboriosam consequatur et amet illo praesentium modi accusamus quos.',
                name: '4lakf71mvbko2rn3r6mjry274kd60wbpzo8ucrj8hwn1bxlviyolhy698b5ais7s3ztp221klpatj38wiajqq294otrjb4e4q166cdjg599rctvdpfnz2nvr8ihywas84eir5tzj0oxsanw6o5ghwuwb9vn3ggtrs5j4eoz552ydnby0tlsfcg4lye2w4gnbic0enx8dv1zutiq7s4ir0nj8gqfyul47lflce2cnt8mvu6j4t98hltrs9r02dfm',
                pathname: 'k32aym9k6tc6s4tw3tjmwbgahs9drxg9flqi7xbc36jtabd8apgnuq5pu7boj0a3gxejg7k0aycmromtv6pxv9vjlxuo0htgwr5vsnibucajybybsq2jsiu11nh8rxy0e9nsxbd58lycw6f0v1yrbyuy72ixr8e8ps2do1v3ckbimqvcbl3u8u47fc3rn2xqydx43vp6819rmlg4e8hyu2bf0clfm7a0k8k34fawd593yltwtou4jg3k2tqzcgc9qllphtrsk6i49krjbbi2z9m69zehj0cj3dw2tmen8rzon9pjq36kka4uvdoiu222kzkcp7j9faf9b9r1tbd20ollqlm77hrcffpnleyyoskip2t55yrbi6vir0z3k7sg3cm3ogu6umw5lglomv0c6ai7wkuw8zvc0avu9d8dqgabsvinkpe1segvq19tlsoqpys98cu92wu4t5t052zae9fn2kbzw32wsntreg3llfl9lq62otgilgg7iabymjg4ina2ji9w89ig1fdyjuqlh91o6agbbalprmf2pv8ltg6otgvq0fz2oir4rs8is0vsz8oa1u83ou3gb289m99hph8admp22kqqhgzes0qwfe9udbxzbg5pt6q9w89oz8mxus7we7bwwnqdjsp6hc5q3qc6l9t01fhu16hrbjso80vl75zvoirajaxdmqxu469ayi8n6ua8c4s0s2h13t9s0yj0mdcl26sxbkg7194jo2nye16g3d6xvuelqyaq62qh1ixqzn4rwgqs4uz6lt01kusq6a7z6h7ddxf8bjwdtqi5qhvqlo8ky4alu4dbzqd3f94izjtzicg170y63g4o0cczapfmqg25inlpsp0p5rleksxt14y4zkf4v3svwg4g5pqnmygt8th0e9db3xit3xw32ph7jj66apyq81x7trh8dfik99e48baibafrlfjj3pfpy6u9vuakomkh3ydia4g60yv33y1okhrp7y1x7kphcwv787iy5rpyvk57xui5',
                filename: 'ftn190mzyyhmbldgyq7gfajieor9waqxovwgv0mgiz5at5r1n7c6nzuroymbeypck4dp12nmq79lecca3zin67g1nn06sne5wt8l2xvuvxw3b5q6c580nhdkdvo806sts47tb3p06qz1rlgobopxegq3eea9g1iv3yx1rkq1jqo1rnx7a3umqka6b28fu83b1jewkawwmt7tck7mrqiprnfpsp221of5du6j9kxksyf1ecwdm5pandw4rwiwu5b',
                url: 'k4poz9i8qwnco6c6cq45vlouco7mhl13qpuxmsrqdiptqbtvupzwva1g4h7w5l3osythv4o3mz4h4mdwrx6fxfix0oe694enue4mhaketvg6z8gblg7w9y9jn16awexbkozk90wu0kujte6nans3e8pi2nvdqz51kxkqlyr7tyyqqhc48y8nmny04hwwa3g6jbwpyzgyq4x3y3vc29ujjlvmvo63398frjtuybs4lyadfluo339qr5prsnz33jole7y9m5lomvpxzt32sefatmu5kd2zyf7kxvlg89dj863qsdyjyt01r2etfc199h9qk4ybr1ceonzcx44skqzkvoi36x3n2v3dpmprn5kj8tgmyzkrdinnbrbab3ctm5tj08clsvp1lly5h80jl5lfejuifsapupjjfc7sri9mble62hezpylz87vp2j2n2czw7fvgzcbtuwkebbx03yt4nmpw8mnw4sjm2qfemicai0ygw7lmmf3oifa9nvcqj3jqkhr876l2z0dbe3zbymc7ec15iwok5ahtujb1oviluxf2qof2k1x0q6aob41l1kdn5lx7pa17gttpgen9i75atnwuga3kzjc6tir2et6flvhdcrqsywjhyjmp2wu9gp7caqxpq2tz1u4qthjmiste4o82jakw72ftb8ss32ii8ljuf2k9czr0a3o93u0mpyo1x1ybzbhmsb0cns0c8qxbesrbu9437pyge9cm9p5yol02bylvkp4s1d7i5wurg04cjlxitoitszcxhohhvs37ak4uyu5j25sg0uqfqjroqh1es38klapcvufwgtrkk2twtkdgghmrb8ltljlijy67q2h1n37xbia89sf6ew3qb5pliewazekcxz7efckp6u1iy4v30fxnfqc6sonp8bn16j6pznkhfmumd72x8thoehvry9jiw5bg1xy4r7sta4hbi7gpizo0slz67juj066ebxp6bc1js88t1p7epaezlw039q32vdu1sd7pu7st56o1',
                mime: 'ocvzjr1tvm2yenxtbwga2bjdyhxvvk32hq8e9zho7gssnrzh4n',
                extension: 'gv8qjlwf6ikxi0gmcuhp7h87vobvetl8zl6efh4dw1ajme65zf',
                size: 8272219279,
                width: 204732,
                height: 436623,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'huf1e4m4g1r935rkt8mrdukons58h0jjw2xvfysbt29y7kuwayi572zhkp1c6ieqrxrw813cezrbazdejawfytabvb0bpns1ts221smv5ufwiis4fcs6o99unxiz7tnskvkvrocxkdhw5d7fy1ai2swj63sot7vcvme1h2utioghcjq1r9f6n6syek1hyscahnlufat36ojr0z59ci6n88p9b4x0esof0pmaq6an0kpcbhw2yalg7c65yvjxfbb',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'jpqjq2xazb7ebg89u12dqebm3e3ox9pz6dqcrv5wt2243qu2cljzybte0vmzst71j9wnwx1rg7x',
                
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 177616,
                alt: 'g4z7v0kke3ls54f8zczwusphekp93v40oq39cwzvo1evj2jo0la8ycvg3toudu75qqb6we7920coacfcu1lwjlqgt87yfysmmkai44557foizbd3ww7satevyrt7crpduxmmaqbw68uvo6i1czozxp996a4pmm0nzq5p0gbg4e3rrvon10xhl5qxemekldwdyi6h1rvw93ft090vh5zhc1grsfo4w661yzwplv5rzx53c2ft5z3cn9bkk2w1hjp',
                title: 'zn9sow8qpztz40nemd8calhwo9rgvokvm0vey34r55m2ksanzo8ve6kwdd12dkbjrzkqn9e3uso9g9fmezjj10mi16zm9h8tu05d9pzk8kb0bbg0t252ic38ot9xreon7cqeejo2nlhzzhytpsvlhie6z0pxnmt37gbsq39v7colgr2vl4euam3i14yelw7b7taibx9d2vtvz1scvc3d4tj9vr29u2gbo4pn1bhew0t1914opa64qlepqtwxj6q',
                description: 'Omnis qui eligendi provident ex non est totam provident cum. Unde repellat eveniet voluptatem perferendis possimus odit iure atque. Quas non provident explicabo quia illum minima ab aut. Quidem dolorum sapiente est eum quisquam eum non voluptatibus. Sed ea veniam vel consequuntur ut sequi. Harum autem numquam est est maxime voluptas consequatur optio.',
                excerpt: 'Sit sapiente voluptatum natus dolores ut sapiente corrupti asperiores velit. Facilis laborum laboriosam consequatur optio odio sed qui. In vitae qui rerum perferendis inventore. Fuga iusto nihil quae quia repellat voluptas molestias optio. Officiis eligendi sed temporibus quo ea. Id qui dolore doloremque perferendis provident nesciunt et quisquam.',
                name: 'g4wxeyk55yfqrtwzsamvzyo741jmqvvjf914ycje2rnmbbhsskcfaxvuvpk8brj9ho7wjf0n0rg13f1gpi7vad6jasrjfsa3ktulcijekq2q2q0y1m9xvufj56qetfsb0lkgnzh07hlqarlz11sy5jlxe13utbbhvci9kbv0t8l1rrnsla9lnylrscrfm1rhdrwblo034mzgkdibo91dsmnatsvofm3ha51c2697sqvbjw8kfziqqwve6szmqm6',
                pathname: 'acjph4j2pbnceclrx7tzv7v2bdbqdvv6qf3hsu9r6dodqa2qcevgh59v05lrn1g3g6hre1z4nkwbaaqv816dn3l7davxkyqwgac4gi0mk0okx2be2058ivzv7ssqs8y7d96baz5pfzia4hjn5pj4nnbfh1ljesdvtixys5mu3ety488h8bvdap7lbaqsmm3r5bh7s7vzl3amtuqkds0tcl4lthulaz1jv47qx7h65y1yd31uex7h6e5qhxfz658cx0uda4x79bhu7qzlsvxzao8sxlan0348g3o0la42ft6psokyblmmlowaj51azdikdupkuxudqr8rtenv4zxicobe842hen8cejy5cpfgzqc5fi2tk60dcfflxwma0582ike8wu10e9e2wtjljezdzl4576qaymz527nst558rudva528wbc8jag423m4j7qojkembcbqwt09k8cqawhslh79ofcjvobbt1hzct7jidi0poxhxxc8wu8vun0gpzqxmtzl5w9ak3dar7qi0rrsmpu1g2r1hgb63p2jbvq9yqmfu7426slexr907u9e6sn6r7djhpy8femae4nvn10hu1swjwseixslx4cmq1o3lonce26lu8bo6o24mt0azu528uhoestcbz909f6fjhhskpx6qf98gx189be51crdub8q1na0nhkiiqnba205lx9ulwfto7hxgu47hqtcrrzv738k9fdmrp0a0ib89s0zamnrypdzr1ie1bxdb3iy5czxga65z5s5ot5j82xc79kqaxm1dpg4ite8w8q33c0rdi1ky0y5ue8u3wcdircrjaz2ey8a7m2zoonq58dyi5udz2sswkjibuniccjhivklpeswq24d7ggk0v10q7b4gyo7pqyupz4mvx07eaqts36s2jqdxakseww754nk42yfigsl0jkn4rmcm5j5ygd6o89onex1m6juxx6cih3hebjshnqghd20q8vvb92oe61ip18a2dr2u8wrf7lp9qsaqazh',
                filename: 'cvs6yc29d194z6at8shwxz258tqq3xtef7h2toi2eh7fdedpnpypolzdzcztas48ilxe1yyjz3j5slc2wu7c8c4gzcapjxwb04m12qsxhf6ywkal7rwvemgczbr0oo90viyy3a5vcofi5nwerv1h0hfkoorc6h29cb5r5yrtfp78473t27wp585f75dgvx3xkhbsi5fg3c1c7l8ln4cjevrn2i6f0i6ccctl2f387qac02dkrr4fu5aorg8r2sd',
                url: '9jgqfilqjwo7xoejrvhhxu1e7fqokdg86vsvx512rdvwynuz0ao4q3igudxg4fbbpingg67i84surxuwiurd6oq4w8rp0umfq34yezm5hwq2sqrb9wysq4li53gm4mwbwq5lcipdnoy9j47tjrhnnhsgy3ukx97tqpdxeerckn0jnwvz1olminxwx0zm9tjpt6tozgp6eftaxjkx3bfnj2o8mwcayxeoytu3fdy5fwz31gyj9rh7zcrxrsyi9od6hurz5etme9dsxmhu75ecqivb4qpkeww3ok51o6owx8tqu77ixrfa0x38tknl5py4ayscipf58k3yj5sezrtwqyev65c6sy4shdgx6ldj8mrybx9x5t25vncwhhad3tqqzyn3e4tr20472anakiimjr6xc1yomotiu6ui95vj3p68770erb7xb0s8g7b60k0f9712zm1gr6t8nj6qngracd4a7qjfzdo97quzepxqs2tw76tln5l4yp4wna1cxcjrzhd2p1u50rb6cb6qaql8ximq9pnh5kb5d4fzltpj3kvr7avjbsvt6ed81cun38j93rssfuk8okxj2gs9dmpkfazjyz8ruj8baj8bv1q1ma0hmotxxzu3ehwpex8cs1k46kpw3rliihkw4litkkswe5kzlv4td44o3zddp6iy4ryzvbm5xz77z3rn94q8rnnzwcz81owr9orl44tnbcdaneq2fnnor1ykciis8hvbzywyf08981f821cjams4v4o2zud1tarvrw85nyuqvrblh9ri2pumqoqt82yhnp1v6oedq819qezdbs9fszlv0o1b9hebap1gwqcn8ys9orzyybl1pu44kow4fxbodes3cvpoyku1s66eavceqiacqihrq5yjqlr6bfn0g5insdpvrozmi5uzgswo6mtnmsut7xdmr0nlhplw0howvax88k79mgbcqcbdxxc8cl65ldo0tudboeotust9pqqzuw6x72dotoakw3vw0gh2tiggrqm2',
                mime: 'fhmjxyb89jx7og204jb7e9b67d37qnv2nbv1e9d737hmm3jbx9',
                extension: 'usw6wkw650hc3rk206u781addinxurqtqghqih4ofnuvj3rupx',
                size: 4820957102,
                width: 967353,
                height: 989304,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'vfp905c80z1hi2yblgzirojipgugpwev956jt6r9xaayfv28s0yu5wskuagqypjpxn3l9sxvv5em50qrt37u8jdq29faqduxoxd25n3itrmxs25gk4k7mlz7nxzemn0dtbh4mij8p0lx3muuo65ybxog2ycgbfwz4bp0uj1dpd13airsqiytwmuf4gv05vaunzc2wlffc9h9x4govyc22b4d886eppu2pwp6ogoijygp1wbjaxs90479eb07oi8',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'htu1boh1wawpf0hnxqhhvo2vcnxlo92ude5zzaub08yah9mw0y0hbqdmsk313wkwtw6b6uk4hya',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 370981,
                alt: '2shdhmbdk15vn11u62nl3blazb25f7cwrsjucq7j9bk7gtywusgzkav04fkllowfehs6oo64ut0wbmgytn9mnxx0x25e88lbiouh4kk5dp7lz8ev43u3wlq40m1mlrduwasqorxq5n6jhno440hvxoxw5c2setl02hzb5s3s48ki4r10tlgf8ubm43riznl3pwjezg3qxm71dcfz64ovqu98ney3z6omyeipvfwzlejjsz7dn0po9x6s0sovofd',
                title: 'xcho7pgoxmk41it3dca4kbhh0nvvext85g2o3lwyatbc7ri45gtr47fkc5qiuhv4ugbliq0finnzcxf42hchult0ywo0y673hv8c8fcpaupmmfg05rld6ixyo07rkvppnht6knhh48tnjpgh3885jt9t3525gzx4izdt0iuhjxu7wb2tq01t4irauf8osbi2fuqa6ytkxqw0qw933mv04jo1utlichj2wvtuwgx3y899vxqdqr1k54h2o5ttoqo',
                description: 'Qui qui aliquid ut qui distinctio odio ut dolor. Repellendus incidunt et aut ut voluptatem. Soluta deserunt dolores facere eveniet consequatur vero quaerat similique natus. Minus aliquam omnis. Consequuntur aliquid tenetur quia quo fuga.',
                excerpt: 'Maxime debitis repudiandae. Qui hic ab qui sint tempora tempora sunt labore fugit. Voluptates deleniti quas. Dolorem numquam vel aliquam odit ut vero vel. Ut ullam aliquam. Repellat quo quis amet.',
                name: null,
                pathname: 'w81jbfe0ll0ulule3g4mc5snj8xlc4bwtxcj8biig6krm2q5pmwtm4kf9s2zs8k3g0p11iggvpb9ii13gbpq70vcfb6txmmjb4qajzaqgky1kp2qpf7ux8435zwo7w2r0fednpgf0zntjt5l60ahd6dk1d73jxhpse5wkl2nti8q8xx99cgcbjughdtjle2xu95wnf96zgl0q2tit96i2l3dum5wlvnxqgq44q8xkr0sajn44ty86llrrtkc0tjubnpwg2n8gtl7ijvmc5hi1c3hhh12d78g0wy246mici9kka9qlrj6xoj39qvmtdlsgdcev8zn6kr1888z3vg6uly4d2dj3wmoj62iaouynhcgm2qpunwjiwmlwu4tjyxffz5vmb9akyn3ggivfb1du6dl8l76ik13j2lwqqkqz0f8n267uulfexbv9hl7zq41yepfrwih7vg93rmtor7pvofz8xhtvn09yqe6eg7nbw7z26lyx4xqmhkmlpdz1jtq1bol0f63w801cf4ka203qnm8qvzx1xoxor8we3j87epvl50oftf17n1i35khm6gfiazhqt4tkqi29heio128shkc5dytr91byzq1tt90t89di71txqffn7rz9hqsynouzz4ggvr1poaa7e6ay3do9gru1lorcaa2ptfewifkk1z4hd0tgzv0m06x7nhdvtcje212nujfw0k9q1nngmvdl1mejux4m8sxkd8lmrl5s1z9lvkb46lvflax5yyh5v2j8gzj2ko2att36ngqm7ba0r8dp10lfe8682a67aks525ccosdxakmdq0ucjay2odl2ao3b9sqg2bli51yxilyh06orh5d4ob04macbq82wvu0tzw9n58a1o03vram61wtu3h3novloem8xv4cpotoj35e9yctx9v86eodjazwehy3rxka9upbgxm7sx1qqwaktr94qw2zpj31vzovxzqrr5jeryfbtw9y9isede0vqd6np29b58b8aspxa9l5a5bv',
                filename: 'qlgrzbe29ihbbbap6osye13ajuybuxrex5i7lfhfmbf2mx11xjmwpgz9z57r3srzglg94sclegj1285zpwy5hy2bbn8j5429ogwe3iksyzyggz8jhehziz5a8uuy98gcu5x9bquf3cy6kkk4rul1k1crqisqre3iwwrub71btc6kwhwtff2bz9qotfr3joi6ntyvwqtd3unomffc1vqlwq267ulfql3otscot9z2rxft9fxgb6ksuda2c3ltbla',
                url: 'ubl6yyd0zwee0b7muzrwc05p5yto4y5anc37fh3qkgktbye0i7nlpwzwcx1i4x1gmxgjaknxth950elbnpnqqagsbynxdj57ngvqdssohgapc6hic72urfhgg6fog7rx2gcuxlbakjd2eu6145p5crxcaw465s8j4n2vpn07ee3tv243vz5rk26iu6k344tpuihlpok5ppe6p65wyfbfqhancpgvtkg61xgcmhv66fp8cgss4z6n2xmo2ueursx9zx1x87ua3isd0vnx7vynnrlaf8ybt8irmeo13cvxzc8nxekftgl3bgc5mm62cv7bfpj8rwivqmtqogtl4e52s6o3vodesg62qknthmanpd0sc9cennk5r1wai2lh3pkqupicc4reftlz5i6uqwruj4g2qtvki0nnnjrxv0k8fbyy2u57s75gpi16hmvw88k55dxpzb8wfitj9et1x1vcovvp12yazu1ixd872zasq6ucs11ig3yvv9evzfx4bj7odse7c85762drv8k8vb65crjanm3go63ftvcyxmxpowcrvityjek4zs50f7ocu1ctvjo589bgqab9w63664edzvkw2rh8raggy1q20bex3onbuttr5i2l44vxp5qb8ofdratr2ewfngcg5dc867c2liwuuc3lx0hc7qztz0knb9tas4a63bc8wh98lbxwjw3sabliapeplkhk7klrmtrd64hcf272sn4fsjdx57wligj9cg95zqlq9umw54qib9k86lawyjne3hrxj3nr3gm5l0o0d2bgzs7ypqogc4ippuxrnv3670h5sfoxsoetta70rk50lv02gzangn593lk4f9q362nlzpe0ah8vq5e7ufwhu36z31j7vr3k0ojcawbvjgj2mi6hiavsafzhdubm9bczsg6sp97edz13vp73p4h0ysq6v3r962aqqryanvlc2ytlhb99llnahh9yl49cpe922uplirdizk0dtn44kj0l4puy97iu2b64dblt2jzf',
                mime: 'k7msi8ry402p4yos3cl9mfodsa9nhpd3xgq26hupytn8x6epoo',
                extension: 'no75djp23sx64ivi014c1xh1nx0xi1qcz7zno1aogtwc4r13ey',
                size: 9171506780,
                width: 203727,
                height: 448166,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '8fxx6wapl02tglrpqo6101e5ml6n7igqida5rjgtrp66v4588lc9i189x1zzh0l3blc51fari1150njqngofiecbrdhka42o4h02jzvkx1x9e0q4nwv8bdekdw741eui7x2bwwow10vdbffl0g7hxwywv075j2xvdvdaevwgnvsfs40vilf213ee7ncfd1qicimatuw4n9fk63jmmzrpdicqygt1lq8ps4g3f94i3vu5l9ct7s031rz9vzxo6mi',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'gsv29r1q2l7go45gq24906ua4wmjfbrqsuimbzjjwdtt1k93vnrnvg74utzr8gmopgbawi07eto',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 445825,
                alt: '9vq6gm2ixg3du0rt54bmjq1u46jkosnyco5x58eilujcfgz98msmxt0mjkev212euq97mttqaqj4gf7ssiz3xm5qa355aozwuadqefua8k9h6vcvksyxvj2wy71ohrgu5fpflpnsg20s237q66755n60i4bzq94ljbn86hj1abgh5edzg9v3a11bzuvb2x67d9hg99gsxcnexjz36nf8hdaww7enjovajoxk9n2opr4z02qxg3stvew7abir40i',
                title: 'bq2sj0d79gkz6phnpbs5d6h2723pymtrmoa0je6nstx9hlst4nwrimzr199mhzc4ogxhoj0oxrnsv0x6yk2nmhevnum5fg3spri7lqtgnm8ool4p9c8yeagsmh42tvs33tutalewre7j5ivf0fvjqqfpfwltmgohcl9m54yhtx330tvduczeg6wx4y4angmifa085f1bfqzhhngtht17gntw26l3bo5zl48m7im6hgief971lubge5my414iby3',
                description: 'Voluptas totam doloribus doloribus quia ipsa nemo atque provident. Laboriosam quia dolor enim ut vel. Quod rerum quia veritatis. In ab dolores odio inventore blanditiis in. Qui qui sed quibusdam.',
                excerpt: 'Ut cum vel necessitatibus est. Deleniti est voluptates facilis quaerat fuga porro voluptatem. Itaque et sit possimus sit laborum iste corporis officiis cupiditate.',
                
                pathname: 'f4x3uame8w99vqi67yipbdlpqcrg1i4d36syg9cbn9qf125s9ulvshwnackop9k5jwgh8w72rqub71gf6tno8hhh28lqkitz639ut5iuo5vbu95d45l0nut5f76ounij2400ukhdik9nd7w4s262fow5m3oqreki7cs51wdncfi2xbc97uih5arf4r1bn4labmienb4820t4qr468h2vujuyczwqy5dr7tj1k5fsdeh5k32jj1obeycf2cae27x6ge2ke203hg1mq7novnkkp95b1eyenpse48h13koxulsyz5dr9fd27ymy6al89yv9vqf3xtuauyvrqwje9gjphfvi1q5skcb3lt4jov45bstu7grxl7sfi5ge8m2b9yjb70a0kqeeo82ejss3tmb3tefq39mxc6tbmosgql5m6cu7hti9z759afjuwpyak3lhx06s4in6lm5pu9ghp878b2ra089tiezqe1bkymh1kxnzyhq35vaznwcpbr9u08pf96ese00ukblbelvyi57p30r0qfr9m5a5ffe9cfouxxjmeoyahum8aayn1zj370zpwmgdy6lzrdhsa5yh4rtgm5krm0oyc3hh0qwxkgliskatz5k180ku5oyt2o0xcjiv9add7mf9uidmnct0neg8oliyataj3ig57ouubacluryatn6ywcufj6swhe8f16v36u38mwhamn72zuymgb98jq68un3m6pbqw1ige770w1k2ox9pwha0i788lp9e338zb75i0dae73oqwnalu24szqr9869opkeg40nfhlxcc0zw70taneqwzhr0qqgmuktwnqyquspj2avq3sl7xqds4zcl67im28haxmxxxk3gf1rh393tqbplhkez3vdlnyw2k2v0e1b07znlnqq1jtotmupug0sfyif06rfzqfh0w6e9xpr5qyix1s7g9pnj5ry6nkytdh0vt351xzsc69kwir3f1jl3r9npe66ukcboi5ug3rcoinwj6hz5nv7clukf',
                filename: 'pzrpjm8orzic1v8matbs4crmm2ufwm2hqpcw8677p3f87swrb9tooucqdpa870t3ghl0nzazltn3piv4x0wxphnvdd3612wl8cdhykolg6jb04pzqh32ft91styg4hwbh0b9o7xsjnze2surxpof742l7cvoh0u8b1m9whkjc4gd55ubvdkv301bacz3prvtvxxe1vvmbo56h1tnqsrsv6y9nkeqsk62b2k51kme1h46llkvtwtsk385q4mg0t6',
                url: '54c03fs0gs86qzgfjxv4u7o95u2ayq6onhnkns4e0sn43eagwc38m3u2in0qh8i95epi96nidzk74ghig3ylyl6op71za9jnzdbf06t3ywxdli5vlwwupt48byi2dx40lbfflsmqhfr9reyxyhyhz7irflruwv6zsfvgnpay4j1bkkue4k1ft1pu41k7qsvvy32vyynmolotpqefvbh6bva1u2hlwjrn25n7nte3dnqjfxe1hbo9t0v5kvjwo898f68sk40rxasjx6zbz6p7i7zqucri8ckh86cbsv4m5gs8r06x3wgyg6ehptha4kcq42bwvr2eaz2fnh06dg68zhbdi6dlt7v9z0wvwl9zgof0al66g1df1kxm8as7hv4v2nm1jdfrjrtywi4ts116jn6175vzgw3cvo8ydcpecfdrl7m9jcbmojqfklc8uzvk6gmss0naq3vy892jedx3pvs5i3dastaah47teqlelxenvvu9tqreknexqif6btxbtah229zwa040402x5vkvfuym9w4epoyx38i7yiihr5rbu8lmpwlx7nd1y39spbx9ig5ychwjv3hjymq492dc098xh058ntwm8cmea6qjy39m3bt25ox0z0a2px75rfunz5pjmlwbeqftm5pmikpbvcsyfephk832bk059hf6fgadeikd80ezntdx0lokczpr4dr3mne8v6ss3a7eb0g7zluk0hn75lng4uvar7k3xam2abxmaqr9q07p18o42a2b4q2bv8dck01686a79khyajkbaqe7zgixwvjz8iehtv6d7ovz6583m0hdowlruqniat8v1aa9fqj4982booldv215sw8bd7k460jn0gj6spj96w7fyqrkauu9u9v5eskjqcw4vbo19nvu02vp3a5qmttro2sqhtesmoftqii5lk1853b1lcm9ko36vvruz4wqlro91rcwuikjuit1fj8ijl2iy6g0hl3rvdzi60i0muu9xswxjvyv842n6xjc8v0z',
                mime: 'x69vmcj51bvo8jgt23djbczk4yjzl2798bfef85hax42x11e0y',
                extension: 'qcpqu8v7czmppnjj6imddy66n2azt0c9h8wt6k99chnk7fsmmt',
                size: 5094298138,
                width: 938795,
                height: 911347,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'qp9gyef0v58mr9bg72yalgtydqkjxkx70q43y49pktitrx7imigfv1bpf20brm8b9hxp4vtrqs2tf8gcqssm8yj9dy4b5isvih9sp401ymsysc775tjkr3d2cxa3rh3d7753dhrmssklu8klxu1oecya81ylekjdcpitdb08ks26vrwarxp1c7vlcam9oxh64x4k68l2so150mshq2xmml91hizpfayovz548vox1qt9360p40xsz0o4lcxqlmn',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'yghn76yuwpdgar2xgodyljbdpubu2lqx14qqfk6mo98u8evzd7obskmjoy8ocn3eup6jwejgs85',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 330274,
                alt: 'hr4b4ltphjq0oof2wxuj4vduoh4uu49386ffs3y7749p88tgbtoyasr4xsshxs2pomtpn25n0e51y4jp0zdikh4av5p63eqoumk7utl7ktdpfkobrwouqmricrbkt319mwtsh93b4i5dw8l5wz8yckyd58o815kpahnpizulhzc2crh04zjjo68kh6x2xwijuhd9etb0apr4y2hgokbqh1hc4c04yfdvxo9hk37vhtf0agn0otsnivydidb5wzb',
                title: '2iaypv4usnliuefbyaxj3rdj8ame6xkjjep6dx1knc81ykoozrkmot46ztuatzicpz4ne7vpmiw45839fb8zirrh5wo2rn630w2we9xt6uaihdl9ibu4qe7gu8k16oxfd5js72tkhuba8lizoyah0ctf8lc1micap3mymick7mpxv80dpntytamy519w8h0ddcmznmgjgqt7h1n1lw8dsigvldd8utsls9xhc4y3lzv3amd8glt9i7vlxpz8u6o',
                description: 'Sit et repellendus. Alias laboriosam laborum enim at non veritatis rerum ut. Nisi mollitia ad. Doloribus eum aperiam aut nihil est possimus ab. Commodi ut sequi ea. Et reprehenderit optio molestiae voluptates sapiente ea.',
                excerpt: 'Et ut explicabo non. Quas voluptatum ut a illo. Inventore saepe eaque corrupti nobis dolor expedita mollitia cumque. Temporibus eum sed.',
                name: 'opdr845hur57o2c9hyw9gzddslobym3sznotr8kw16dyyfzw7zayk6cto9lyj3uyn05tap91cebx2xkkr64qi19jf0iqnyl6az605izmx2lih00vuo7piu6i1b1nyt66wzuzsqjfzxpx89kwf6uw4ywytckzn9z4hjua5wuczooojsxia17t9qhmz71re29hn1xtsl6shnmw1ij1nr934bblw2qy0t652h4dv5r12uvf0nosx0arzlgal8moyum',
                pathname: null,
                filename: '5by8t021o93v2n3p5j7n124vx33jja70im2qad2e7qegor9oacco0tn0ukonzqg0plezy1yyahluloo34ig2ec925jvwzo5gv0mwhvknwdneejcecmx8dj15j22b53bnfta9ujymhzwrxywy0ht4qmo75xoklmtnj6vhpe2jl5zl4qnrlshag2qfash38pwt1dfoq0rdmdslxg8xw9eg3z1rpk86yt1aacveknfts59mue54xj24vyhbuluo9cf',
                url: 'vnc38nemso9tnfz9p6dtv4ykboag7u5i8ta37klywdh69t78qf2qgvfc1b23xch62ck6h2lpu4yqyah7edcf71pwkqh7tdc85mr3y4motu7r3u21a9zd0dodqncldvhcn827fqxzo9pqo090nj9z36fn8obz89kbvxl4qbg14518y1reili4ptgo9o11m4z6o0jampeijvn3huik01ng99e5wsq9u0m7uo53ctbn3svzwo71b2xic4ngkockbcwekhrdq0rc75x2t7bq4efljvgqhn9dzll0kw1a902w7zhp5pcevz18y6zttpmesbxtktg0xljjr6rvgj649g6tf3j2j3gguxmejsc0fl0szx10nq2elyr6cfv5w230w0z9q88vbkblzn0owr1w0fkbhovej1b2kj6hzf2u4qb958uso5ry5330nms9ui5wbcpukh8udl8f3aiupd5rtg6s6r8aij5tiiy86cpyg4pax118cyoj9w4yr1sfa6axvjrrjktbtr4rrx70pg5c2e3fctp2c0yurgvkmnrdpbzlp70hlfs3sg1nnl64uktygm9yk0jwj4m2rv0ctkiwr3lzxmpyxbdxxx4w28ju777crxbt2wp9xwk24z4sb3fbmes1b6qw4rvsdto1ll92iaon8zamk12alx38lefhzkuls7800xlx9h4r00o4sm9f6mkouegcrr8yl7dri9adgwxhe83b9z3pipmpnwmj1cnvhuoogshb8wa7v92jm8782je8el5rxu0rgt3vk4b3t0xhey0c528lrqcwxfmnovrslcmidlqx57wnmzjopdcq70vs6c200mgc4994k1r74xig4ixbhdh6vxo2drn51v1tci4gba3ychbydt3yg9t5g6mibgpzp8aic9e535vg57awaf7mfmhhe7ytwkpbvhjzrkbckx1ju090zgcy02uozch275omgoxtxubzt2ilbe5id43fhz4ycd1an5xz70hldn3w4qlqmoola64ijmbl7e92',
                mime: 'sfgx0tev8af34ennux52theknuez23kg4o20yd41s2d6obdcrg',
                extension: 'pfdvfzinng2jgla7yajf5m1xua3zzkwqcae86v4b422r6xli66',
                size: 4877099641,
                width: 711719,
                height: 664531,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '7aahsqj3g737q63uekf1bkx93lq8phvwai9x4xrt6yfjm25ddkcyfqli1mqae1gml70ljtzirlrp4bnwolka694o7elf6vlawmvmy1jih9u8uywy62euuohngb24et9eoww6mmuhjlyylvvos3im4xnixpwyuo3hajf4yl27n4vf8s9y717bsgrvxigxnrmxl1soxyf21g5w3jx52zwdo94wjhteg3gwu6xug9oc85qgwdojmt0jrgzemyg9bcd',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '0qe6zghhpfungp5d7fg41yd18d8dapq5aodbfy0iej9xq0i08tplew8i26pm6yktis759amhgt7',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 430261,
                alt: 'em0m8x1oe2cbwgjkf3zxd81282eh8buyv5rug9bc3p74rigcj7as7lra0610l5mg60xmc6b2lz4wc27dryoyhtuyi8u8bw96lw7voozr4pw8vqmu1sb8blvjksaovpep2otbbi43mm3gwue1ghprvophpp9opvrpqk8knxx2c159ft63s73zs2mkf7tnvwkod19xbj3h1wfez9ctseeemgu8kh7uvzpf5nct4f3u9lhj31bihka64zjjafbb3kz',
                title: 's1zhqkoq8xz1rvxz76h53y4g8ez4o4xkpmd07fxq1k7z5x5oab85ei9cc9lyyaogtnhbg1xllhd2frtnfntxsie0o5znbvwql4ssc8c5r1bpmcn441ypxf26koskmviz9q0r9p6ahcqmexw101d8b911ove3x3z0s1zqyzhsirvee3d7dgv68s2j341ozud0q5xhgkop5ibatkwdqg7s3zlobfk24xr9yt0wwp08myhl5wfjwd2c8eydo37v1q3',
                description: 'Et quia aliquam. Est quisquam deleniti quis. Repellendus tempora optio optio quia.',
                excerpt: 'Ipsam in odit aliquam commodi sunt reiciendis dolorem. Culpa officiis fugit. Iusto culpa molestias. Rerum ipsa voluptas est. Atque placeat impedit sequi assumenda. Dolor eveniet suscipit et quas atque dolore exercitationem perferendis perferendis.',
                name: '8j7bgr8phxut0k1sj13zynkww8cqajje7yplc8q8g4t7uhcu03f2yvr0xvyap3sqk06rjld6ben7e1mm78hdqq0365qxvyhopxco998ju3qfoonm6dahchgrhqe3hnqdwkniwt6hohf7hvg7u6x57we6arnq7d6xpaplz4hp1ippvm9nd082vdmx74d07mh3uc3nqlv668izd6n8rfi8vcmz2p82s35ka2x42w6l6h0ibu98mrf5rwj44oorkwz',
                
                filename: '0cfggz8f357mdy271dyr7ug0oak3i7s3z2m03idv19jbeh7op11j3mopw34p18kcytjkiff93okqj9vh2e0mrc14a3vlrfjidqychqqbvkhsejetomrafxj3kt3tewl9xi9j5ts9483uaf093tyfs4lpt7nhey4biamzm21mj6q7j1he7xnjn0qp64h2uxek9egj2i1cb5w04afcqr1f5a2s8kfj04hdggklonewhfpew3o5ijb0wgx4kanw7vh',
                url: 'okxspumjzteb3tjhdrcaqig1uxcatdj4bt3gjzq26fevgil3v339h2w1gyeuymkzcjz10wq166yxa2897agrx0sic9sf4omvoyd1v973d0hyv99vvngble48ixjfj9i59um4611s10du63gvsrcquaqc2vx4cy6yq6l4uw549zwxnmkvwe8nm57d0875cvb6kyx1wllb29crlmdrzdk0ty47te9ytz8vkwa6v5d26jasgk9b7ud9ce67kbd30zhejxo6inb2109lol5311kvmhxfi3xhtk30ohnaryyma2j43bxg52bntha6h0ff46wes4ebagisb4tdl2hh33gmz5hstw17tt9cyqh15p51kfwtluf8b6qnvlpvbry0yv68c7uqmdkzdgx05tyvdbay0awrs1r4yzsc4wl2ai8mku56qpjx4369ecer3vig82mwvxsl90h8rw4gb17gkqd8puwgm5bj2d8fv7aaokv2uwnxam39006uha9pc28fp1mejq8tr26zrl7xhexrrhyp4l9amw9eafgcwr0yx8eryjsqdbgfqb39rwenhqxn10n0pcnc6vr1bf805jwplm3hilkgjrryjjxumg66wfuybopwcz0l7noe92y9qzbrk9i9435q9solortutgjlc068r12tc54s1cww0h9auk9553iqefra90sso9mhzic0ibsnqq2kxxrrot0twhahwxtkr5tj3a5swnl889p31nlx9t2zrisz3j4vrqjf4oj4p5zp1m7zdq48ooclncxmn6sqnydgdogt28nzr05mupwefyiplkiw056uxze6fklrygmrbg85t6nt8xat6t8zitiogh1uk6riirmwmfwce6c2arnow7ff8piex5218w8rphvy37c6qj7bd3ajo336ezoycpgpu9hk0uo8tu8ytr2waf9b40owk4a3z1xab1nmszk5446q6sh23j3feci4n4hvseroamd92o2zk7j2969rjwqx5gvadvp984czr44s2rfa',
                mime: 'oclrsbp3ewqompjrw3y700fzywok35s128f32xuldcgxd2tn39',
                extension: '599veoyoikacy7dxb0j35wlym0u5y0qvh4zv3l6rutnb25m66h',
                size: 7057407838,
                width: 676172,
                height: 506848,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '23vlzj7n4c84h15lpltrujruqxsuw1che8v0sd5imz226fyft6136h91u0ywe6weenortyhvs5nt8eqiqu21eh9g4zi8sv4ou5unvzfm2frhb0iaw1xega3vi0bsuh3iunzn073mpf9y5dwnt073it4e69q32cvd8w39skec2k58tzh4japqlm9otd9yteqxdx4igzyqxeke8sgzpi1skppj96auij2d1a6i40gkehw27m03oy1aes1la0j6uso',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'gmoi8gax8drpfn06miiunfem7snpce0g6wkd6hw4jzkdqvjtbo8vjp2nl4ig255hee83elsdodz',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 714641,
                alt: 'r6hs83cvrneo2wdt58n2jntofimpdhs92slg2nugvrbg6nwh80w6xphx9ln69j0t2a7t5bcim4s0ecxfxjbm2dfn0lx55oyiyqo29sk9ruhj5vn78fv1fxbu3bqqyj0vzqf1wdjv5epudnxjfg6f8mf65yfelgcdmx3ciyk44xl8tnefgrj00p06ca6es5wnu4p3ogss6p6ktqtd0abyyw71600u6irj7c9fc3va4bchiaqntjb8ookr7pf7fdt',
                title: 'n3020d56i9gkikabk2oj99eiu9h5buamytfbhdc4cce79s6aeboehdc71915ph09t6bf5xg1vvvcxeznlu44zhdm6y9sm1y56a8qk4ol2enhd9lrdzjzatp2scnj34x0f3rzofvugb509mtmmtqgcess9fv48iu70nip9ll0kjrv0dvtx10ryd8pkwii407ennicu9dvluhc6k9fgv99m5wfjno0cpsjdrr1prxqp0xl02e3umofchu10ege5mr',
                description: 'Veritatis modi voluptatem quaerat iusto. Omnis omnis eum quisquam aut nemo voluptas dolorem ea. Tempora mollitia ad cum delectus nam quia debitis expedita. Dignissimos quod ut voluptas id veniam iusto ullam perspiciatis.',
                excerpt: 'Adipisci voluptas placeat quae porro amet magni. Nam esse aperiam iste nisi quaerat earum incidunt. Nesciunt quam cupiditate vel est itaque quibusdam recusandae ea velit. Quo et autem unde beatae dolorum quia laudantium deleniti numquam. Deleniti repellat optio.',
                name: 'gtqc2jawqtu0o4dzb07pxnbss4t0rgndik3i6q6vpvyv4s4mz9ihe5jbm9865ic3gkt3tgdipqnfk4d2gojqrch73gbqfpv1pshemjjy811jk1j8w4867auzwx9acyupcm2l9pyad7x8hdy8qwwaln3wzi7cbunqrjzk0bqtbr6a2umitc7viei4x1x1mhk2mqzlnq49051wj39uc3w8nceqww4l0srrnhu73a952ipdotav3fw1ofcwy83bcnl',
                pathname: '054hwc59d7m9velquix1tcnvp2um6qhqa4n5p8tntsdcxvuas5tuxmejielxgjc06nh6uv16o4q6rfpsk3h8wj8p2moaf4gv8smk04b7ifb1pfcirjll5l3qnalyvtybi0get734xreyox6k3o0gu4zodfdl1a744p1228vyyieyghksrngsb7n114n5ie4nxt6tyua4cnp8yrolx3vx44o6tjwjyzcyf3ixcnapdlb09wzpf1w1agozp4yjfv26u2gfl6nz8fll44c4cxos5scqy7jfwmkxucq7cim5mlhh1gbreb0cjmbblx608lsq8o7p2yt4yl9qi5qreig1pzehmtvec0v41k726ckp11b7haon7mcrmmtglkee7jkgghzrcju5cc6udhv5h4e9lfoelivikda8efnnq28vlaj1rnujswnnxjtfsf7955ftjamqjpwyd1k8zr2ecwqvse91do5nphwumtlvjw3rsnn52es8ghqmpdw98dp99qtbfwrl9xwwau8v0tjywzndcujqfxqguio601uhhuj4rrvedvzeedrnyqablqtlo0hu2igl55fkt9xvnryol7ap143b8bh185qbrzuj15yzwedbybp1atmpjwvncbm6lg9xc5v77dlzbqm6ovd7kdp62tssxahzgjcomun22nd9k92r4uj1ig5hij7etwuppvmh6n7ijpwsvod2asvyk6qfhlnq7ujzahh0qtcfjtj1qo1oexw3o0qa58qbbg7st9xcsd9snplqfvygqs3l5m2edrvp29fy3ftnibrbg79esetmeyulq75fc08ww885acirgvlbt1wkk9hffo6zzjp56qk73kmw24ive539bqywy047w8gudicxnrt946m0zm6sx13lv46sle4rncoisevhrgv3jy4b60ce173pr45pzvntrtskdxsk16rvswcazgzcbneka8cwcs849gh25ypxv05yiyox6sfcvyndofe2y8h1srmnog058k724q8nfrtm',
                filename: null,
                url: 'v3bx6w6h6ih1tqq8fjx3r979336ogdp0i3b4eq3kqfexklwtthyviud9oy2ibpoogi5z2p2q45u7tphfmez4dlf7u95mj4apa4zb5vcz60p6t1be1pe1q9u99zfycsewuu0c9gxeisdmigpkkel4fhj7pe608mkd6sevn389edzzpk1373kokr73zcvqrutqpuzzp24oukj40st55jsewutqhqt8rugy6f81d55q8751cq4prg735kex2dgh6ka1ux36srr95ct60phsvvz11cvxfyjmitvxcp05fa9h1pny1g7lki0r7fc6dzw3tdbak5zdm1iaf3kokhmnfizzt951iy3gw490xz1u5d52zv02gce6s6wvysrbbbrpj8t500atf22bjeo5dyc7mytfyrr68azyh77s6xtkltl4xj1pu7j3u2u2wfahlfehsv4dh1mabkjp82ogtcvo7uxu04vztxpjjn33iqfhck06k167e4gh8rdc431df7ipfyei9pf6dc9enx43ewd8bi7tdhik0etb4y56q0r3dkm74l2nwj9h2b4tx7c8jo2c8ypw5tysu9ezfay69jeuefdaqsg72yqpn45k1g981539wfdn4vva98omvn73wd3tdttd1afzsswptes04l1i22uo5oi2vey6lmgsmepeh3ee7101v4pznri3qynebpkjisle6sut3qh7gu102nut8abry6zyr2smav61jzczr48kar0ht0blb5fmkd9epinudf5rh2ix42wr639pqx1uzr1l39io8cshm0gsp9cmmpka6ehguyeki2w95yyvbc6dj8w2pj3pzfpq7hkx81hqqi1l421x7lew4bwxaub1tvayrplhvbsbooron5f87240j6zp072wg4zpz12iq5t35n7jgf384e92d026ztggmkxazu0fy1gop3hdd86y1vdkqzogv6qb9bygavk928r4xx7oqugjd55ku9fla1q78ewq1bts90jspxhq5cd0dary9gpg',
                mime: 'x9k91udmaxwzcg8o8iaxck47lt1xupagwcdd6pvu51wh9je0i4',
                extension: 'q00rusec1pijzm50e2ul15oeurplvqo2wmt7jjf333t1u67715',
                size: 7244642236,
                width: 505144,
                height: 743451,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '7o8s522jstjugdj0m5w7wzr7m8xk2ss6kbnawiueg04ryneqkkxkahqxvp0hpqj8npdoekk9gwf5muho8fj8h6ew9zppdegsso9w1wuk95uddszkovmgf14aq7f45z2ibnlbilhpys7uq9owvnlv465wnmvu04san8yvupwybpy5anbao5pztf86rmti1xnhj0rn270r80ye3xn9s29xeczvm0qry0ajdy1wqwuaqmwqfjuvs773xerx9eaccym',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '9hwn1x39w74sk279r2364ivdy7mejhgb2y9wlh5yd33vi5l28ju5y2sxesdq3nm29sytm88r09c',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 301065,
                alt: '8kp0914cklxu070e290ybuyr409geelbn4hcm0bu698pvziu78lmmfkkmrmkodasr6bqkn1c0a32qx1t1uu8qo30qpfnx22efykorbkl6r2moavi6cqp06npqoerdjlgymi1a7i73pwh4xdcpe3azhkx3w1lrw3zutzmqforu3yolblg4tl2py1yfaifrodhi1z3jyodxjeg9pu2qb7gk3opneokiokywmxzk0l0gxzyg25nrxrxa686iwkgk6f',
                title: 'myin5a5ly8xknw1st33yy8v7myurydfg66unvn0q4sujpv3edt2nn3pop0a5527y05m9p5wf1qfee9mkhce2opg5hd0350xk8kjxlptmt0xlc2f2emgl1736cgz5c0fvewdwc00wbrutaqutijj3er0eh9z7xcqfiowrmm6zh2bdlje8rcg3xmaggvaeotzbt1ml0jno2hyak27cwhkulux5faqfg3r7dnilerwt7utolpsho1mdq40npawkkjz',
                description: 'Nam odit error magni. Minus sit illo aut temporibus quasi aut vel corrupti veniam. Repellendus eaque perspiciatis.',
                excerpt: 'Repudiandae ipsum cupiditate impedit non. Est sint accusantium temporibus laudantium sint. Ipsam est quidem earum. Enim inventore enim. Dolor fuga nostrum qui mollitia ut qui. Dolores voluptatum animi dolores et dolor qui ea.',
                name: 'p0etct9jdors60la2bkon089b6hvabat3dn1m29kab3dsvma27hiw0e8yqkhc0utbdnkna7o2cm8s0wvn6m46c7z0upsed4lfma377x37llqtz9q9gyqmzau7bdk6vgrwz0n1w8bhlie2ywxl3rlhhcc922yapnk5s19mmadvfagkdae5nqw9b4t77uj7or9reg1a237kml74ji0ned5cd78stt31zt50wz9261vpw63q6egsy9adejw9ws3drt',
                pathname: 'aygg5ikx41ykg35husncjii7fm1w16c6g5gvs3g4prsvnicwwqxubgrh8rnvy26r1y53omd0faykxddhemrwuhnyyxnbed3bs4j98ml1h0wbiyndsnwwpyk2arjnmldi5d4x7kbnzbqhw597ym5dmimvpmo3my4ytho8d0numq6ee5d72w1fa55in5fxs2rd8n0iltzngc431imdcff3u0ufu2cjryd3eoy97hj5daeqs3s8ydts7g1ux7o8r9j185y237z0l4ev77topbqzsv7xxcpbo124bbm8nxw4etjjapibtdv8o9qlmnaj35zl1tt15sg5kkz8br5vd43o8zje1xq6xjyipc211n7nf9oln78rw9xuqawa2zfdxby6tij8gkcmmtkkauhsxn6ow7x4pb4rgs7cuucqqu94l0wmhjjewvznc8zpcbz3edzlcv3dwpxhwm3cwioj33ppmfeaqnbxi2nt4e85thxdgd3rg7jgsqrfeyai96tac38cxjc0n2hx3h2puhcniaenuya5aoqyk0pnbazdhf7hd74j3he7f0um7k7xmh3yi1imzjsdqty3thbfx6z04db2znqy1hqv9mvyis8hm2sro7ppv8lksa45iaj4dd5ax75m0age78x241exqh87oxufpn99wyc83dhs5heqj1fs5kqw68a2h5pf7qhlrf1rd3phe8eoxnsnga6qmiicss3k58myeco0yvvzosch9zd8qevksi46unl9ceg7ozff0logypb5k9upjy622vl64nzox022t02w10my02zrhnnxq8ypxoi99b0rdxu1tcnvi41cc1b40orz5hai1fjpor6t4wzit0jhxs95bncxnp4gn2vu4nj5l90mhedubp7kdltofqq2lk1vvv75bztxrzrd8bqvoq2ajvhbwbfoamd18kz3m2z7irrkcc7ce4lc0ahij300qonhsqbhx5zuu7lx9cbm26gtyc0v8hyk8nooon66s7sfgoos1877n4xg9j4q',
                
                url: 'octvfavg7ien7yugvn6xzj3o0mrgj8la9sf6pftogjftggf3k7dcjewg9km2xpt7d8w8w0u8cnkny0dw1t983s5ik35ctyfdyb1aqqll16nm9kz5d34ix0zq0r95neiqgwz3j0xvof87yjamgo2h6rpveyi1vbhrrvihn9mdm7y7o6n7ji75eclzvjlegjox3tx0301rlo7nbaalzuxorlc9gstddi7gzqmegpldol9klxvppmyzbbuwsdyhk8hlisv4qhdirf7pr4pnc3c9iim670ejuv21t470001li4ei48oap46fn8jutwzdd2abi25ow09l53qd6qk2s9gzrzk7np3p1sajz1rpvl53ehnbv7qkgoqzksmnw2nwwvjnr9oq27p8t3x5n8c9dctvxwqkdy54xoamyd3br8gwlcd8593a18dh21fh91pgoh00ze4e07lcf7ns60nwqrphn506b36ywxrujimgv6zdmn720m7auec8xym0yuqf7vbwg3mas1znmxyq077h8jn57o9pllepj5vlumpigxz1dchz6p00s3xtkr1bgvdbdwtt3ivfki894ssicl4kojufaf12rpesgpai86rssphkujb36r28yqvznmeo3y6ottku6p7fqmfh49myn12c0g9j8ts1294zt21lz3pm2aahh3wp1ro54ois3xobad5u62xedxl065a952drpus5rhywtg3ymcj0w9bbkzeuq5aifta4t2s51u8g6nhzqafof3cnfnwrprzktrfcfwc0z2mjn5073a58l6ydza4ooh15ffmw43etcpw7lgm3vpfdddnh9vqaw6rl46ffnq51mbq06hlmnlrae4arvopuu9sgxhycn7nttafwyt6j4zkh40ht1vjterx4ch1tbtut0jmyncl2zxwstltn41nr131wbwjdb3jthfzgmyeza2c7v3k3s9xqw3v953u4ntmht191kmwwphoyfjc247qf0g2eycg929xrkvwa5box6m7suv93',
                mime: 'wgutafp41lvi39pkp8oliyodfdutdh5900jqcelufl3nc4w7h6',
                extension: '4n4gi02n0y9b7o1uf8jiqrrvywsugxi7lr2apew2aiyocvsnqp',
                size: 4453187382,
                width: 319525,
                height: 171838,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 't0ohsjzethsi0doxh5bhufsc2tuq0dyecmuzuuivpmz4olz5ydahbgvmino52b4ikrzonjmwno9g65o8eauvht4d8p80bady09zb84ifx0yl7mhj91tdxt73ztnidw4bontbhyrxbzo3f5pfj3iy7bec4alostb9x7mbwts8775co6zp3bj36pcmg9es6cixktedumss7h7jp0utc5hdltj9ccdf3i5rl0he1x31z0p8fzzuvox4kypfwbfohov',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'n0shqq1kvmpy2jonaee6qqp15i2h1g4iiy4oc4nwj2w4r3paofkjswam008jo9nhvqjh2x7wgwx',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 509208,
                alt: 'rrg4px9kbpedg9b19vy57jzcietooyvj68qmr78poja6uzhqkch8fuhx0xyeyk1aywxm2oiknevjldq8sexx2f449nib0qk4aiczvt5pjx820s84lbpfzuui1eoqp2i3t94smdgoo59gm59j7pwl32q5qawog7w7ziuc9r0yqf4hdy41kruspctv08ca8sl5s4mwjlwlw81aiohq7oy2a63iw8uts83tq84ekuugvmhkw2rgio64ltd1909g532',
                title: 'ghr855clgt8r1l33torrvdmsi7j1woz7paadrkaar8cejh7pzroh8g78hf2sq8zmjzi8dq6hdynm3a423o79h4lufjvp2s0fw9pe27c1lq2j9c36a984oe3mczoaubhv3y9tsgfu4u41vij6blv0kst01u8261iud7sw97189lzaaenfp4dk0f276pevkwvd61binq1q7jxwf3qoxgte70p97mw1do6uyzo7vaosqeib809o6dc4ze9wbhra9cu',
                description: 'Eum a a omnis nostrum dolores eaque maxime ducimus. Deserunt repudiandae dicta omnis voluptates aut. Expedita accusantium quibusdam rem dolorum voluptatem animi ad. Et minima in tempora.',
                excerpt: 'Et dolorem inventore et quia quaerat. Non laudantium incidunt eos ipsa. Cumque ab laboriosam illo. Quibusdam dicta cupiditate.',
                name: 'pgxoyuqvdxno5sgukjn9we9krt6t80tdg7o64ol2zyp67f1d6pfwtlsh61enmzh83rbiurfmvspb33hub5xinbi277alrkot7f2insnqb8ih6odgqhdflo3kf68c9oyn3ph1t6ion4u3v8gg83i1k6h1nekj1b3b2j9jtgtrnefxtvx14xaqu7d3m8nr6hxdq29gfywykrq2991mh47lg92fjdndbw9li1iqmh8l1ots2qb1kkug116ids89skr',
                pathname: 'ma3wdk972t3yk125cycfxhy0e5ko2mlljgbz0lfhl88cymmhuxzhpr0oty413r8cszidd4m827ojkpf4lnlc7qag7bi4sp8jnmofqiubav40ao5gy4g1ko14w2gwy8ou59ufmh4b1rtoisvqgrs1r5mzzdkz98x0ogzgev6vxt9x28oh2nxwmrw96t84arg95ltipfgkfnn1o8fqpsdza3i8jq2p97qmjsctv9shye8fotgkpkriy4x56b7ryl8bmqirzsg7vw4gd91gd3jpxwrdqt1q884ud0hsgb2gsfeh0jwhj7od9szh73c587ka8q3cuqyby0txmk8i4ntjhvht4d9t1snu3ctmk2jdhqh75mlix7o030atur7645gnf982yxshov2bextpjb7gbpffj6eyej97pclzibpkugg5rs93for4du5zbw554mvjl9u449w8tqkjmcjchrrrm8o2gpmvcuob83pnqs01sgyuvfu5j55e986fkuushahsie5pam638hz09k4b8vvfv2i8upkhnvtywu7hgmchmcaqvy6se19bs8xi742g8hvp46gmvgkphvzwjt66pje991vmzmkb1zwtw88agtp3hxhh1t5srvot3atw0b3wis46gg49x3dwr7d9len9tsyks5iy7hpqa5znwd2nffbdkaxnq381qn0vxg6fk4cfqrukv625pzweowpu26yae9htdfd3xojbg1evgsjuoey18zhpb6ezts4wvm72zytb6ea3ex1nb2f0qbt3bbz0rq0gctzm7g68lpb1bu6s4r8e11kqb99neyxyz1yarhzvwamohvi1an9r61jwagl5kwyqmh809xw4qgufkidt5sdufrio8eolrh0437gtdl2grfccj2ocaawtvqqji29h7sbgukeq5iapd5bin0ibmarx60lk79wf9jmk73n0d8hxpkale3wjbxy6wshqqfpui0sfapz27exs590kce41uw23q0ghr6t3dn2n8whgju2zyu9v',
                filename: 'vqvcbrq19u4qpan58h6encnc0me02c0bsd9pr9tzjpp25axwn7ijj13b1l4fpik46rp4oev0r317xq0eqlllu53cbufk3gctvdp5jbctxmg0tz1a3zk6oxdrfw8btdasu68yzfolhuwcewq0zlspxijvutcpsh6x7lwq4eu01uyk870uiafmp56dnx4cas68bsobvf1bfgc3us5tbxfze6ec45ywrvzm5lld9nd1rlup7gnc6tp4k784q0vh2uv',
                url: null,
                mime: '88pxuger417yrjv5fn4e9dc1j4d187idrebyzt7lqi17tui2ct',
                extension: 'ka0kkdnle9gbvnnhgnff3uyybfrf195log2vj4ph2k8jpk4tng',
                size: 2560158692,
                width: 945670,
                height: 932256,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '9r8w8315srguxmx2ikcmpmid01kdpy1wmdw8jknu1rc1r45gpmkmirgg44qilub3g2but2xo3michf1ms190o3xt3wh20j9aj13ezo8fe1j05uka4qoh9sq6n859ykmuniyhcno6h5kmifi1f5uy30ccef2d6no76tdb3a6nrdigio10u6hvufghilmmohaztwvldueytusrhkouphcysx6aejbks833ao88umg9y6bdvtex8fsuriunj5uij21',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'oro664s2ymyo3ah2v4cc2e5lcbop2mm076jdyi1wy0t5lmmupn68yyqd5tjk95cb7e80j9isfnh',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 220618,
                alt: '8syvevpnh4xg788v619n5xgwanoczytfb9bxt0flrksyz7ed0epb0fd5pugx5cigei773yhtqsh37w652t7ryprumyxaqccghnlzetxcja2yl2tpdm2et5ouaue9oprtaexi1bj72lamad3n41mqn123kromd4l2o7mnbkxbjojdo01b4oq0kzijcjilfx0vyxyo86pxpq5uw9qbdkptyn2ol4xyumcyf2m00mvqz2dwsgysjfcn0nz2zarx212',
                title: 'eruaqqdasy219ybucm9xfccsuaouy05qoj89wlb5k71jz6ma6y44xaoofpicfmsz7rgstudx0l4w4zmtbis6ni5v5w8kzpqbc4x8fkl4bhb7bn6an08bjic7r4ckme6s9vw70752f7dw5s1gnvc01pbuwcfhsg7m99n92q5noe45wki3jxgmzl9j04eab0nq3xvzimi7ur4efouqjo3r6d9ga8khhk1iiaw8jdcqgemv6qiy1cv11kz0a84ffkt',
                description: 'Cum modi aut quos iste odit natus quia doloribus vel. Dolores ut commodi et excepturi fugiat. Exercitationem voluptatem corrupti eveniet aut nemo molestiae. Dolorem qui voluptatibus et natus pariatur quod id ipsum praesentium. Quo repellendus dolores in et quia est dolorum. Quaerat commodi ratione aliquid voluptas ea quia explicabo numquam quia.',
                excerpt: 'Dolorum hic quidem veniam. Blanditiis nisi rerum modi est. Ut suscipit doloremque doloribus.',
                name: '2e3sm9f6x81rvr6rt8jts9hgek3wz82t2eri1li1lg3avj50kxypjhg9r2725t2s4zae4gyq7uhamt3ulmv01hka7xfuhhq01vhvrcrztidclh7uukel1c78qk3saifydvjxvty9xtrdt4k6p5etkafvaacb71tvzc62c7itmu5y7uxlrqnjjmmajqzmc34t2efis1f4gcjfq0h1sap77txv2kd2rvahzuiff5b3nvpt2niqptohohxrepvye9x',
                pathname: 'a2imq1ezibosrpsp4mmdtrop9jll0d00vlszgwjyom73bmbnkt3f739pmvg49fhgfa5lyr3lo2n8wv728f7u1uuv66angkl37que48dg5o5f8zw0qxgh53nlm3d5fkurew0fycegsnkgaomytxlr1dn7kcwle5m3ni89iquxg82wigr4wxx3agsgbwkhi2u9likpes0j9vg5wrx9w9bm18e3achyjh27hozwktxjyta0w03gttvvxw13jvcjxmqpwqfunm8betp9n7i5a9zprtmxse1jzcmqb6f07z27xig83x2c00epsw5aim5hks9gygy5fin9t7fvf0ye7aumrn4yvu3lqb4llaw59l4bm0xkt7z3i4l6ei9kt2suy2bq2f1xrxj37qb8z7x7d7k51aabbzi9fo3n27vywt21h1rjl924splw375dozs6lef4topaovwyqiuk522l98kn4ynnu4x5kjhe8v9oid9u58pj2oozq8san8c0pr0e2v1uz13l11troyr6yrpua0xzk9k165173j7dhahx4wop3ro0bl05j250o4y74mosurtu02hg2pb52qely545oqp691yfdx4c9mk04iiomy1k28nf55ri15se8xgytvsudphtohn2ld965it8ro291fqdra57omqq58mku6ertnuzd990t7aix6bz9n61pncwwgt7ja9dd7cfpcvovw9mw3r83ag03k5gr8x6cwpfq6r9g0fjc31s4wgfg7sv2u8z5s047cxq8s03n7y0e3o3ussuvsfov2bagqpzyozqcrcjb5zywms0jl576bio1g4k1d5zj9o4kkrgz239fadjhwr489cd5s5uvcvr1d969dh7y4o6lyo5568zg51kt7sahluy0ywdvp5961cjkmomw99ygbx2k8cxqwbdqzq64m27qnrmko89qm6nl8tgyz62wtdaeo5tt1ii2b08pyd4xtka6ecedhtsqqvj964gn50vv9ucefrtqjomwxvfz77nwtpb',
                filename: '6az6llcge3mzirgcl02tmetio1vo4dik440kqzgkkkomoa68u3o5sv8mhp20rz4fg7rcsp1v3lbo1owsd2aukqssjlduzr6dpe6yios7m4otml2so1ytm596mxf4qpdjquje9m19qrllqskxcc90gvs29cmnbqnj847dpvoc4jzp28w5lkqm64r452c8u32klnurvv7fzcntenitjfmesooeamij6oodforkziskfbx1pph0d39o24lr7m586vv',
                
                mime: 'zkyjbnpzzov9ifuluta6e0o8k9uia5zmk668h0rgtporjiaa8e',
                extension: '3zmwpcgkwpdip1ew1yajfd9gmyib8gov50iztalv60utl39b2v',
                size: 5643959836,
                width: 900446,
                height: 704854,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'f234l40zjlu9xjrmg9jfw3msfoumbmoox74jo8blrjwlqd8cllzcimouxixtkdlqq425nx1weappipb3xph9560wmu7jie675pfm1cgaz7jzxdxtd8ofm96hbtpxq24b9936xgrj3i4akbb7et1dkos87t9inzi4iaf8sehql3291zm9oysuwyb2t71u9vmezvq1crgvwxuxy7h5rm5s4082qnjwi5mng8wctv0wphw33q2urac9pd64njtdzyb',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'hg7hmnqdawt52uzr74qwn2l8kmsze1barn326zl2ebpwcprbj7zzfveezlsf2zrggigv9zcc692',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 771953,
                alt: '0m69ogcnk1kkfoljbm93h3n7vse4dksh4fpd3gwyger0s80cbyds7b37mxrh8qsr4r29yg4r3s4qt8sv45sortm6n86b23802v7qvloj5gfzysjcq0vn6hlt4vgnq6t15z9y8ynr7a7ffylp0i2v8gl1nl1q7jqzf7n10v1nm0mrdd7dyzwtyoeuveglq1yngycqjabfsczwgb6g1dxg9t4vdxc484wopzjnmgsvjkb69i1sg0ty158ztnlweyl',
                title: 't2ebl9ccxcb3fw9bh816rgkoywc6j6vv3mr622g86146qbh8p0sre3tk0gf4ra3xvv7eghro3u17ac8u5jdqze8f41jcxeyqdlalc1is90otd7qppe81qe3bzso3b9c4ucmf03ua8tas4egaqvbz4g5p7lgr14nf7p52njr7919gmtodmbppbxgalkmbgiuraso5oqehyx3r3e8j2etjakeahx6iv03d0karzpe4qb2buqhtn6lhufaosxo60h2',
                description: 'Accusamus ratione voluptatibus eum. Quibusdam debitis harum ut sed. Illum alias sequi velit esse rerum ea. Voluptatem reiciendis eos in maxime nam incidunt recusandae esse neque. In suscipit est quaerat nemo voluptas fugit in voluptas veniam. Qui omnis unde rerum sunt officia rerum delectus.',
                excerpt: 'Minima eos laudantium aut molestiae quod sit sapiente. Qui labore ea consectetur consectetur atque sint quis hic hic. Voluptatibus qui aliquid ex fugit sequi cumque. Reprehenderit et iure ut ipsam sed quos.',
                name: 'pknr3y69na9x1recx8wgz1e0ih3x2osj7pw2drhhl2xarv0kcb26gabyqu6vkt4q1xixe4laiuowp503u28p81qed1r0xtpnfdi3t5x1qyymx57o1ltaaec09aw2nmmtjieg9bpbonbny89zivl52nyy3z9xj937glv8emxxqe5uygayf4spvmmk2nkln8rto9ndntcvefhs87peyksuzc45wtokiwwm40e974orh1y32yp0796y8z6jr9t6azv',
                pathname: '1jg054hzgtnt7gkgks5fko6rcapf60po6eyl93f0tqv5xjwdjd6dmq5l8eos028sr521yhr8bfkamj590zjo9bzcoa1byb7jc3ogs28dwmvdzzqje6lvxuwn1s2hrxjqj94bej0xjvedev4erxl6lt9bc44stii8v5hnnnb4aio6dgd51xm6em8grmfd7w85vy8e1eiqbm15569yyb0oc2zw1tqce10xjcng083vpkkr9ldeixuy56e2t4mwdc4yr4h29rf3j791zbn3v5gxjoq8e0m1xgzj0n70fobyb80p4bigvr8ejb1noiqnutybixx9ngr1xpja5mzrdqyxfbmydsolfwy5tho72lxyc1yq2662p1naw5dlps7hgegvwng6qv9lsluqy7pzl1vczuopn3tufk5lvr49hx9riel41xbxst1unlon81r2sx2tkjsmxnnkfq4aln52xvtn7mz2u8f6vw015s651y7hj4k84uutug80cy6q6tep6ev879c4hf9k69vgq4jbg39do2mxlnk6t34k7gtfbgalcv1uarxw1scr8hvxakl81kcoigvijlt41a2tiiipp3x0fqp5akcrqvl5n7rnj46h1wmszsr8mp6h4hinldshindscjt9coj0tw3aikhi91vbmvaj96oajs0skhmmf10t8mw81ljh591e3nu37663ftfr3ucmsivympgop2x4l2aon87onv698l3tifjuppe109fqq5bccsx7cixlelfe277rcikok6gykk0sdr7llzoghcdajdpvnzw147fon0yb2edbnkfd2rse31shnwrm0aavmssujey9e14zyrhfh2cj1rudqb77ktkijw4apml7qrgnbnj8f0w51yn4d887ouesy8mctgyvm807cqzlloo8npii3g6swurl1a3a8pq6ktahodibj3gy05oeo8gmjh5ay91ag4e2k80phzqiyxo8g9c8kzs0nrsm1w9ezds0bshomm015jfghqcnfaxp6rk3',
                filename: 'he379xfiu81aygkxy5kyqk4g1k7s47i1g8d8vi2cuycvbgictlrdhyeafm332tx1ym0n0zclfsowatt3ddz69m2pg90aoodov40qp5q2ldq9lhq123w28jnjzlo80r3204cy2q8b4z1bag7icm2jw9rg1bt5vrffcv7yl7z0kk432pm6imzlbnssoc3eem726diiv07cy1k8veoy0jhks69u4wwgqvjef3cfwa6d5am4lca4uvh5cgcyigyqvw9',
                url: '4c8or19810uao7i0uxayi26lumu8eiqf50djqy4fjciv19erudj1skhpyn3o922jd61ods684kbt4rscc0m7uddtj2y2ec09dgpoctc1wmbb6xpd20bvre2nilbt5wl1hkyvna3c6bp9raidgrwhjn20a5zbiep1d4na951v3yp0hwdmi9sf89h13fj8gn5zkpgtczkza61ja8roi8gdii3e80pufvx3gfgtuaw6mye9fxib6l4ulr3op9i67vgv8oioc1mjxcujvuigsf0qrghmfqz0m6q0c06qjxai8u1dqd8vlk1xls09vuvi7y8eriyufeq6h4z70xzz248uyshc5q82u2acghj1xq483avlwprib7p5lyr8hhpxeki0azrztzdf8pm3hn5uy4eysrxb4rb9xu0o0etcwbre3hmlyp8k5xe3svaelcjhv6rnj3j2uv7f9epczzyb64mvh25ztvlkpm5z6j0u06lscosjfv2f9bd4olrk3kq7qthqpuj8xsshbkkjdf89q6u4xn0qbrlji9ctir06jjifyd06prmm1shu09zu03e4ic3r3ewlbzboy7aeu9gea0r6dp8s5dnh2kekqjyqxe2f0ck98hciz003m5rhidbz4h3d4kdmc5loi8okiken2dwo2uvi787b9k7pjk07p6dqfgt7w7extw6nd27ql3xazx8dveimj7pq1srq9ed3m077ecbkbthjgncruge6ni0x72ohnrgyb59lsnpy4zmxhwc29an2nx4bhof3d1ti8slca195iwmkeb2yy1safpuprs9r7uc8n8o9nawsi2ceityi2w21mt8rmuufihvoazafq4dfx8m7p3kezozs6qt3aw3bh5voz12uohml6ob5sn6q2ypskbzokeyx88qwq1xojplpi3n3bqsigl6662ezgivj4xhriard6irz8yz82096fvc34b92caxqiockgvg7ehf16qs7p0zqf3ab8tp04uj0ir2r4pqjvdmmt2xag7u9',
                mime: null,
                extension: 'nvajs1iw2rhs70eaez8c3d0sfmh6hfk041en54zuf73e2mczcl',
                size: 5894314330,
                width: 492421,
                height: 704060,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'wq54i2ynce0nturtr5uncjkjoovmr5ru2irovhdjlx1nqsiooxq2gm3euuy71xn2ehj8yhk69y65z0chrdty92w68rx36gyrhnwpyfjvn0sh69sza1gguegaonazqy8k5rsmbglev2yiwms4oa9yedz9ealypfblkup5gj3aooxi3w723cttbb3j60m1j64dil15f7fq7cifjwzy56lq2xuneyq6z8zvimikx2f7zi8szz61gd784yt1nrjewyn',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '993atfe083lf8k94io1qaeezh4ea0dy9ecjgir1snc3yw92tlzwshlom2me37o05ha9ljazq2aq',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 555048,
                alt: 'kwzzsb0glludkcfoyyams9b3y583a2or8ir1dgih881uatah604kfm0wsu17mqq6qtavpsvw3bnt8q57807ersfv2ygj0vne4hf9i19edhct3jbd8wow1cporkeuaep3fc1dgurmeylwwmo4d6yor3erwh5k1qcfsqe2y3spuafr1y52w2e2q9w277055g3bftlm5l222rssg1axckeic49zcgjxhx1c14r5zpv5lnpighnzc3dsxlzetfs6zid',
                title: '6c62dd5zhezoc57evnx3hbmff7oett7xllb3oak6a5sinapulpmpu7spvufajbnkk33s7djqn6leuahm82vxouei5ij41aerda7690vtapevcden1sitn3dz6rcy3rx4d642nwnoifxb3ogpd4pfwgunt5qsztt7nz88gn7zgh9desuh4kokpsm26fmmafqoehd5sveerf9fboi24nhp9adoo87j5qviff94j4l6gpussh03dgeb9rmc7e1z4kb',
                description: 'Voluptatem repellat et. Saepe fugiat quis. Laboriosam incidunt excepturi corporis architecto eveniet. Ut amet ipsa maxime animi ipsa eos in voluptatem. Dolorem autem rerum assumenda harum.',
                excerpt: 'Illo a rerum officia. Qui est velit enim et. Adipisci voluptatibus sequi eos ad facilis. Sint ut iusto doloremque id dolore ipsa consequatur dolores.',
                name: '220210fva4t3ut25muz1yrx8a9mea0m796ch9bdyb1vf3swl1u2w6zehk41wmm6gka7loryj81mophx4699qbod30uns2t043x2v7gielk49rkyis8bv7ud0z797yl1xly5soh8p21ve94lfdwxixyq6bo7wx3qlc3xidjlj5qkglfrir1k53buj7xskqwwaixv0vz4k6xxp6wdizuziuxrcp4figypx30n64f5dwixt8o4bo0zm5pg4x6qkf0i',
                pathname: 'nuix9r5i914gx243hg2mi5pzv9c55lnc4f0xmnc3sg61dmtjf3jjeanl6und66lm4y82bqjomgd8psa68e55d59shspjyalhwk1hbspsix6282wy4f17zi48c95tyfmgovk6im4aikim7ny33tee6tc513c16y06bwfr0r9y4d0plz549sx7kwbpm0eeegi604zr1jtcdtbxy9kljhvggwby3fkbwnmqxtx6626xlian8jwszwcyr9fqljgcri9n67ped4obaqp0vexzd0uvodlspjr7qooq84nop1g94jymhzg5fcnwdgsmnyr3zwghk2b6ssjg0ovju2lbr7w294aq5i64c53qkb4zozvxgvra0aeb4pzllt9iqec3fegstdxablkkesxgp14ft91ka3f41yn33tloem9ptcz4c88yphqwjoxhowqgp7l4rw0i9y3fa7aosmuojg30fck8lrbz0gnbu5ijksvba6rfjrcj5kgk2xh17d37cta2jwcd5uy8kn6ho0bn54susy0m9m7rpelefea6czcydh3cuk62s6bn9ba17e1ap4fi1xurh9zl5n9s8uasl75juv024pkrgq7no2zodvselta1c2x9mkuuqnua4g36ecjvpcfr3sw8r22cf0sic2643qmf0j7bixsyj3rk9o85tkdu4e5gsevueplup9qe6cqlh9yf2gumo1rt0suxnyc49grjhgag4yb8kcmtg5c8d0v21e0v78t7839asub5bhertokrwecp26i83lz6gso6tzcmicb1k01h6ihq32a40omk4mf84p02dmlsryrfdpm4q7g50dyb9bpxf6kkqe99g4n461ewsaddmefdbk4r4ldb5u3sjn2aoe34sfrrf7t6blo1m11gtwtfm8qm4dq4xu3k45fjtdta8tv0mcsl9wkavv376dfludb43vno84kl5df23i2ywfm3nxyk5ermlg7phpslnyz7f1zy6e4g1fto74yg5ajm1rro2l6qsqo71c18',
                filename: 'x928fr8sw7ygiwkznqhq7th9aj2s53xgqr6560zr9new04r995kvebkttml1wy29zpcvgqrxhu1jka1eebj2ber9s34wefnb56qi6nvtfwici32uiw9r0klgk989xxdsbika4qjdro6i2x2220qn9zxvrx39slsat9bntkgugkra8rs4x7oe79z2asf8f57f5oqxdbmns4apg609a9y9rugm50w8mdgs0o5qw7grrbwbz6n5sxt0kar0n0xlfsg',
                url: '0xct8003boma3zazkrj1w7105u357h8alnfzynowhf4htzstha60t2a86h60tsmjfm9ophhx1am75v9392hmnyz7fgoubw3w5sf3qlkqqpdaz9ba4qwfp5s6uh17mqvwiiu6polv87mkpvmgfttt3pt6xwacc9uk676bpyibb15cmfwxew0divtl7gssa8rv2tevkul8rl4ny9o18wi9b8k7bb68z42y2u9n5r2isyixzqm364hetqsunpj1m42bxrxqh51u7iwh6863g4tcwjmx19o1it22g2acsfpjucpwygw3rigjxsm1ti2j33gahovun8iawr85f74bbj831r8c30vxykb3tkz80ph8sbh85icgwofpgy9kuonccp92fihf7tu9gxai6q648ydu6sgw32jqq1n4xd08qv4l5f0403sepescn499d1mrv8w4uaxrp4tpkbckdnmckkp3vqvhpq0s9cehsxwd32twkld3psc6fbsa6om5grxwxvuovh4hnhv0wzxm5vu8fprt5ammuq11ulwkgsgx19tsgd8sxo1wx2vb21nd0t1pzyefe4e824g64o57r1o50pwig0n6j39qvksjw14s1torvus5w3p7wr1zrwrtyo0secic1fvzs4n1gndnayuyekdw3shkebwvzfhjdn4imwwqqc99bb45a1v9yl0blpdkx9yjyesbxtfdoja4tfnauks1l380crng617y6iy1l13l1yjqctk5nne9z4o3no5v7sm7mncng1s2puei9mhorh9b04kvtdj5vgla0yldnavq4tqbifceo2yv1v13dqaz0aynpf405i2w1p2avhcd4djrnqvuhxakmonibpueclwdqbmb5t1wm6pr4nis89rl89swkmxodiak3wta1g69ck0ehc2nov89tosaxgjxeto9eygnjvetpdo8ovdivvaolvribskvo06d7kti9aj6v66hf439dnnuf83xud4mpf4wqfcdtqehrgc2xl39aw2wiv17',
                
                extension: 'tpw7j8a2zqh7kuc4jwxc9586qncshqhxo4k730cop68jw3csk5',
                size: 3669912030,
                width: 268132,
                height: 649993,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'sehd6n4oijt003pl0kj8ghu9jhi4cxe24ms5p0e4tvzibjzqsmtm50eeifu1km0909rpv8cze5lyfo88b6lxe00hvy03qpqwkhiok2u46jjkpdeq2em4vcauhforqu9bmunlg97k50uas1umbah14lji3lnrz0r3wjo624oyng6zy9av87g6ebq0mbhg1iebemv563ya14u7qrsbnmf8s3nsqtv9ovh5tiqoghge0z69wj0uig427s4qsmejavh',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'yf3gffdyxn179y6u2vp7qcj4g38shbkwvwts2sx0wsnikkntnl0j6kbhbvbuux4co17nqjbwxzy',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 609948,
                alt: 'nelj1qkwhxtuaz5c4m4uv0wmstxggzzaqz9w8jqp5dwhpg98fgcdrhlvvyl4ny8pqq2yq6y2srgg38pi6sdlw4u6y3xbvlyftfbgbfxnzumr24qqs176jqdfjpx49jx1jftesjq62z00mkz3fzgyn926hvnb957thr3jskhu2be7ax7s10jmfo1qxrtl1t2k89t4x4p7ei5q8d3b2n7jwvaksz44ng9gurx4kxrx7pls62b70qo8xzj0xn5hex7',
                title: 'u56zvchm1fz1cv6lwobhl5n5en7c47m86l5sf13lkzuvwz6yr3jdorbinsw1mspkkwub0omwftge1vsryrhg5cpn9b6r30z2efkp2478o9xfh8axn85kee2ftweg5xpqdh23wh9t5s1r3hdfe6w414l51rvph9qimxztxbea3afu39mi3dee1whqc0wr0c7nt0polyfpoiwtqwhye1uozxgasxk1meksfx60qjjtc5iot0k9saw2hjp78f40iap',
                description: 'Et aut aspernatur cumque excepturi sequi et. Vel rerum quod veniam perferendis quod voluptatum laudantium sit. Numquam mollitia dolor. Exercitationem sed quasi. At vel qui fugit eos dolores suscipit fugiat.',
                excerpt: 'Sequi consectetur quis et occaecati. Eaque qui cumque natus quos quia. Ipsum in ut optio omnis et nihil. Eveniet numquam repudiandae numquam non.',
                name: 'hamz2cpn5fg4w8zu63krgz7lk9p3ci0irnzhq4p5msvbrdqyn99lp6n0607rr6y6atoz9xm4u0qvyh6bcuw4od2gpb8moim9zbbwkmr2mkewz1wrsb4bqdthrnuxr5hr8felt127vpout20mmq1c5l82dzigf651x0envekwuzmror1ja3djr2efe527gjrx0jsbl23zjl2soic75rsch3rq2p0t266o0o0zxe3lx8kpsz0rvacxu3ps6jprwzu',
                pathname: 'nknpyqj8q9j742c46yqy5so8n7sea03u5ke7dwb91zuzd2l8w08jkr554yuqila1q43ecqrfdcmoeactfvkdmd6gjz87d59215vgpbcov8ostbjz46otarphvjd90ysnvzsl3s6wlv5wlrchmqoz31ti0mdl79hvv8nlk0ldvbn0wqmlvtu7dtvygv91mdhb0k62vcjmrs3l9or8zuknril4kh2adu10slyqyc5sbhkd8p1cykek45ldaxpoetqx6aqqpu1gexkyvukf29bt43f87wg8w4guxaqyqoswv3dsqo7r7sm0g301bqkomhfzlf7h11t572t3j7z0w6ng3qffbo1qxrkkz1kz8jjovow9s6mhfjunlbn5yzo9t0k44tb6exdsej3ylv2790wewmyeaxtqcdv7ltn19m337e6ugtrpxdma1b08yoipui2lnhpypq2l8x6mmw9urfe6ph52kfrz595yauhulhqchp9s3eej1htn7bqqhl4l486zrlcbjg31fa91aualfbzbw8o4gj5wtft8kqtjvvj9k9606e447kejrjbfzb7v7uk5g1hdc89ozjle9r9912qwpnkvpiyp1afzcg3844k8eyerb1sozo7yk0qgrhiw0q1puhq6vbxt1gzy4ria78h7dzgmklfyyyqbsnjyhjo31ny240faw5fw1fq9d5g7gbv6azs4j82ov1tzcgmz60hj8v5txjtt25qcw0cv26113nl5wl7io0hklkjio0nq6zt05hqsolun9xfdfroqdaubv3ptlg3qh71027zw0z372wg4eudwmal41akgxt2fxhwagoc3a4ucubyjubxrr54mskvpqzyuhun8n7bay9fbvsz30sim86feuarty1ipatkjcsemsqoe50nkryt4lnlzowoprpk76om304t6du69qvghihspqnt88btg0xh5y5jordwglllxw5enwrxuzx2o6ux5b1i70jh8i08a8r7d5mxtwzdwwiyo77ud8vv5mpv5',
                filename: '8p1aeg33uqggg1nnlx4dmhduiyr7xo2dwssxvusjbofbsn5arc9k46wvljc19fj68zkd07dkxvfpk2t7soydpo9dszuk5a3qn62diat9fvkgfjl02pzd8wxbexv578p22k5ai7ql54q84bqu51d4kjoh94t16i0tjvn08yyps8478ijjso9dzn9zwp6uyq2deh2gtq2r93nl9ogr5ngoh7ti12wara1b1qmyozldi8xgh1bog79wofbyrr5e731',
                url: '1swx7kzph2p2u0xgooxwb2pmnx3u9rdmn20us2ces9zp7w8ck9lf0ppnpidv1ai3tjaitgyhtsc5yyshh6rwpj3ifl4ku9etwq3gf0n9vd6kb5zg19wx4vcw64uulo74apewiezygx2x94e7dqxb98bb8m6ii0xie5gryn23zidf6ri241molc7oh4wzlhecptycpbiqbkgw4gbyeotu0i3u9g8ydr2shta5dd8exqlboev2ytq7zdwuhuq568c7cfbobkw8ak2vaihb0987i780874omwwfweyu4fczwqkwizv5yealyahk7hgfhzxks3isq3npwzgsqjjn0h9l1oukow17wf7558258reb0ho1dlyhgntjip3hg28dnwzytcvmye348k8atpjbzcekqolvsbb3zx810ldrru0q85xhh87zyif1gelu4rbmqx9mo68s77ff67kd8sqzbzyjubtf0ojt7wtdpket05u2haq0ejm1lienae5e795ie15jheri8xqozij3ts6kyr6y603hnmik2bbjkwwb53zaaikz5lrvh53edq5wnceek8c68xitgcn40e3s46t4b4j78zcjjhlz7xfswx878bhnirtatl2o8y7zpe6qr43yq3jv9b6nd0sqto21gscn766zyo8x4h60p8meor1ueyjoa7quqtbo9x1iai4szeo9y8r2b0i92chsn9o1wz0hs3z1r0yab9x0526mitp07agw6us4ilwwkgavi5p81trn9dw8n87coic4xh7yzv5gnbdplfop7hoxa5ootxox2m4m1kcrxodh8x43y9jjxaaim28n85fc6d85wxmgs6vtjhd5iim7owt22beat5gnvmqkjlbkc4q1ord3en0e37kcfuegrewmd6zrhsxyury7abtywmi9vkjsyh1pt2ovtfn8utc7gzg6b0jvsqpywy5it2gw4yw54ps0ezijv3sjv3krr6f0qvqssssz31biredc7f3q69hglfd0fh4wlycpvg2i',
                mime: 'w0h2yh9ykurev2zu1ofi3dl7i5mmlu9dyyn98cucjs6tff0moe',
                extension: '8tp3f78avwv0jq3okyiqrgmuani8tlkeg69lc74fgl10cugw3l',
                size: null,
                width: 538062,
                height: 404470,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'uhyg4v3c2hj2uqxra1sjztx7ghlhxowd62bjruk47hdmc3unnthtfroxwmuaqs1nbv2xesn0rpuc00vgrzx393x1ki5ylta14sb5fcgw3y37lnk1xgd4zu6s63mhnxsa5bui6qar439wweh0xv2hdgnfnigg79l8qej5tdmb4c2k7g81noabhqoics5ctq12czat1d7fw55je362zlpsp8v44w9ddpwc6p0u2fbeo0039hepz44glqycngranf1',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 's679s3asha4p4npcp42cxhhw2nadsdn9il9y3q3r5elaqi59f21dljbb15jqjk0iq99b9fx2cgi',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 169644,
                alt: '1rz3mpqgadsjab4l1ahua2mt02kia9kzixgu56yb3bfz6i8qvy4iof6zdbqisw225rk3nvwgzl7taaputtp15yjhqr26dpdbaqv0xb9myotorsw7nmj9dtzo2elhxczjf9n7wa7xi97nqmeljlff1koumxpg4xxoaf33zb04lnqlv86eo5aogeqyf1yna23qh37u9vknchrcd0h7cbjshzoswuh1cma1kv8puvobqn95s88spohhsx83470vl2z',
                title: 'rotf8nuin0pduegquewlfeb1xmoo1foybp2z8fqvjnvqh3f0r9d31j7dn9xzrc8oqqm6v2n0qpyjxss2axdtbehm70yq6fiig14uakpdflzkh2c17msklko7f0wweebwqs1k0yjs57r5l937n6yyagp7uuv1grxznl5z55kxshteczm60gj982ylvyaqnttryifq9isnoaojmj7p2bzyeigponjnw0mqvu4u1u8x9ijng9d86r8tzmou3pkzvzn',
                description: 'Vitae blanditiis nulla corporis quae nesciunt dicta ullam. Cupiditate error aspernatur quaerat omnis amet. Optio possimus non facere qui aliquam et. Earum sequi tenetur non animi voluptate est vitae necessitatibus. Aut consectetur quam qui corporis sunt deleniti autem officiis qui. Quia eaque commodi ut sunt aut.',
                excerpt: 'Amet dicta vel aliquid. Impedit doloremque corrupti consectetur. Laudantium suscipit eum. Id dicta nemo occaecati itaque qui nesciunt qui. Recusandae quidem cupiditate. Soluta vel et quia velit recusandae.',
                name: 'jt7cas9n0t5y5nawvnb1iyb22oy9ymmtgi1tc5a1lppy4vao8c1ctu8fnf9sfzd382id698jduj5ym8h8y31oyvif54x6yl69tpfklwwkdlos2vjvlpzu0v1jwmn9qbwzog4gs89b3ic3skvzjcf60fm72j5993vesy9ewxi5z8hpx0xwcijrhk3fiur9ctn1sorkwrvs790cha5hhikb9jw0shunw4mhyaopfwhclywjga8xj5hup0pjksvyct',
                pathname: 's1nawemcyc3n2dm3rx98cumd1g15woo9l7n8sd1ir94zt1nniimiz6bij05a480n0w8ih0aju40xmbu9cccwcpcbuay70agx4iusqu6l4r5rxfyqfimog6tc9zldlkes5sd2qneiutq5kzieicq32f977kb51bq5f7mssxfcnr2nn6kea7fn75rqk2cijn7jvdk1cs1wzrn53vialu1998tjsc6813thmz6p7ao2kc5gjneekp37hjarq5n6a1cojw90jhfvksm6amuanw0xy49w84x3mzooq283whs5a98lu1v0ws20jg6tbmur5thy9ck5a4xo13tj9b7lq6x1ppd5kdha47ljue21g7njafqn0va8spuab3z1tpxkt3wto319wt30bqzyrlkvl5i33zmjhs77otjags7pa06ai9c4kx4ua5veqfiz9otuclr8sh5g63g3h7buptypywig1e6wssniadtwq5w17zjb35srweius8f1q9zphrweqneqdx5re75lwdowieli4pe1zbt6e1xhemowmjr189783c3g2f82445yyf8ccimipsp9k47qko0mf84wrb7lk7owtv54yvl9vfhtoy6e8d4xzdcgbeucegrq0h84oxmc4dt57jm50pht9teaexobp3ibj26s1v142jp7omed2s0h4929tlwdtvekdqnkqhkamo2r58tgc3mxriorvj9pvveyhsuicqorz4rnds9l1xk84wbhacyvobuazpaxgopqlcyxeyvr5ewzgl8gv8f5dbtkl4deql20nm3ibex4jfpxn7pw9qkrqglj61gc320114wcpsaeru2ta12vk795e8rolie59nbuj3hhhobtvhpfgp1o7v3h17razg2o4fge3w09dynyf35kcefsfvc6hsn8habait3j5w25luinsaiynn0lpci15qyzkgeh35svteb5r6a4nwf8dwr6xlx9v7gkr47immw5c1retgjp7i80anodrqcjmcts79h4xa7wkfie',
                filename: '1khtuektbes3vnvrmu35h5b4njwzljb4bcs2i93593nn65ol2a2w60pxzpba1jnvx68rcxmlco3l51epvfc9g16i084bwk969f2dtdssarvl4tma5vsmcksry63n1ohnjwxokcvkni5ms5a90f6f0llty05fdt8fnvsr79ctm4wj1mzs69qrc1lo7hd8x8g5ujsrbsvyov4zktky08srcpptu9ti1qim9s3uoeobxke1g3kzkor368v07n473g2',
                url: 'dpm7mcodmbkw8zcke35u784doe2ag70e4vt0k5t3xt0dgs77iagqu5g4n90wqqbfp87ed8uabyvguv2ucur20p27w72zmzegh8b0lhoout2tg5n5tyb7hy6exmb0f0hud77j3s97fr0ucpfbapx9lcmxcpsx8r07d990duoy27dnv0sfisr6ylr401esnlbf87oha6x2sr0lbn8c35gngpb69xj9bglqw8h5ijcd951e3ps09rvy850kak6yxfzm8rhhv2uoqu7rn8wyt9wdamvk6cz6vpyi3b1dnsmjh2y724w9paomhbg8n10711vzsobynhubfgo3491kq2vywm341yqqfb7uakikavep543alcgv63q0edhkjjdhzs3tzsapc4pjr2o7rqxwkd8aeozcg0g9ks63ey2o8lu47m0r2zawqmt80qduqcurmpdtmguvjfxs77n65nspdw1v8x01jqlphcoj4ay0lav9vd37pg2o4kausie70rdw7z9a878we068e6kmwt0d7kcxeet3rci984fanoe104vksuihitqd1ywvb3f70pqk3d4x3rkuaqb3j5a3bf2btjcah1xxvjuwrn2dyl9hmmbgczkbar3kssku6kevzy3zrjkklw33qvyxnlaik2tdur7hj1gqcki0bxa962lp9t7mscv6yru2t9ietrp52lkgsv0izto7z9eaki73v1hjfwgrxezth14p7inh6ohoz4qiuikxfwjogtrnzm7rp7r27haxhsrf9bpmfr9it0r0qxqs40qbi9z8vunil124zjv0yauk0x7deivviyuz7tv596446cvr98m55s790ymz2t5s8y94idjkmyh17a9q9eug4isn2ajg1wfw0954nvi2njzb4mrl7r63wbyn7x2ke4ne30cyb13wyblclgpcztr3sl44g0ncpkf9kokk8cl2mkgmdriiy0uj57qia4h2eal0zi5raya933grwqxq4k28tl0ikbhh9d0lh6d56j83ustg',
                mime: '34lyfootob0nz3rat2kcso2tktz2j9nmd7n23254p33t849ttf',
                extension: 'qjvq68v2886k6dkxy0wmwphrnw2bq70q9hyzcwhb3q0eeacrdf',
                
                width: 299054,
                height: 529711,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '7h6lglxioruoc25mnttkxdtj2fmwr5feqjfqoj80vsobeltvmyvlqx187bjvte44cvlmck7b78lfyh0mg23fy1ir0e7tr1092rkqw3rnds0po9d3gs5defwcjvtb11lcgruwf8oadaabntqayv94ii4ivwd4w836729jjg2cstt3q3eadnmgwly9r8ojx12eekss453uqqlx1aqq04nql1ylwcxhxy79iw820n7zr4t5gkybovd3xuq4hfwcaav',
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
                id: 'zwumixjqiwyeea81qqgext6txapt1ohauxpfk',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'txn5bqttiwta3ccv02m86qai3p7fjzh23fh973p5vystupzqnhyg5ue2bb9ghf28tf2eaiidmz5',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 182374,
                alt: 'b35y2lfsxv2awqrs5p9rg3h5xc51i4eltegd2vy8xkg2y5iu8mc8242yoib4xwglspi66ye0jhkh23gs5xtfroyvngq9vnt3n7jidafv3mrre3vmwbijlbls3i9cc4pvy7ljwwsi0u4tixq34bry8i363flkhxswkeywxm2anmhy0mczszcgscx4bevrw8i8t76z31pwppbxfvi0oy6zi7uofnxaavf0pdkr62nk0t95jdcod2clwmb5nt50qeo',
                title: 'auhs280sx6r9rhx5i2uiboe656mymbg32ndlb21yh5wykg7cpsktwfw4o10dmlgfimamg9siyvzqjw8k3q61h9yr9rg6dvb2l134zvf67w4dqmjysmdwinieti6gudpgttn71e8si1ptkc4ueqldcn8kubu3ar0tgd45zranboow2tidueeby4j1tp3wjtlbax4esxgd1z5r20fdrjxnmiwdwt4dc2vz1eesszplcunz4q1h1ou1gb2q3h3us7i',
                description: 'Et et enim ullam iusto blanditiis in accusantium maiores tempora. Iste ipsam eaque iusto. Laboriosam fugit error beatae doloremque.',
                excerpt: 'Voluptatum distinctio laudantium quo quia fugiat voluptatem aut et et. Aspernatur veniam aperiam saepe qui. Temporibus consequatur officiis blanditiis a odio voluptas. Et atque culpa modi modi consequatur enim eaque. Sunt est sequi et numquam nihil aperiam rerum eos est.',
                name: 'd2lkfv0sf3tx5aephvz674i0kdrf5qzm6awa1voo72lj8px75df8qhfc0id6e9zb7kv1ajt2lpaj2pfhjoulfkreug3uw6ldkzh9c98r3m2den2b9zexjlho69wxgy6lxjx6arrkiilj03wtb5qwdpulx2hh74xgnskxo77wfve7c8teawi0c6vfd0p07zi86f99adma8avicpofg1cm166fcsvk1ibzx2v4y8b6239ohmj707gwgwy5y3hopv9',
                pathname: 'rib102acbdwi39bbf6i70us54tiar1gy3ct59sq16rs6zqbe0zkp1ym5q0exe7der3bv5mymi0l4psq7xlxcy0a8xenwdx1p2k1wwr1433oo0tglrwlsdk5liyyvnmnt1suu3xcs1gws5xgqttdx9y7fbg56eaf34xf0j584hu2fut93czp0hm84r92adji82ik0rjtjq910vf7w6490qyglv4hu0h3kjphz4laqayzhavsq71lle1lxe6t0h05w7jkm46kt39tb7ifilij4aplh0j7nqfwfwkn5hvoalht4dfesuw4wwnmpsrr5x0127mimdrwph0fdf2lha4ewfjws0uor20vm669m7wpjagt36tgnim7va1tlcduqchjf1ylep8jj01ln20iov4fnuwcp8ymbax4chmxexzxvnwhgp4hvicugn5hql622v6phy9th7o4ilayiclu63ot5v07m1zrz0mga12krt40277fl73jn5nk044f9v6xmuqn6d93a9cj1mortp01xl880wrq71c8su7djaiukj8bse9aat7gd2hjwi5zw0cgiiup9wea83prg07rmn5s5c1smh0b3amny93d5ddzbmb7fpqm0fgq33x51kd9td93dkhwq25wmgpn0h6wvkp4rx1csh72hk95xkxkvzu5ohz2ovkzo9x23zwyvbch7udfnr71itzqwfm8vityjn76zgccdhvqt7l7plow5m2ttmr8fexluiws3p475351gsfym4l1xsfg67ltntt5px02kwsv8q4damek5909kvo6l9dmrjzqk7njdi8oligbnrxpzhc2i0lpuxpy73zad68udb06be36ueaeddaj3dk87a39v1xhyfi58aznvqyyz2sxhjmb80sv8o0cqvsrr4g04pbwkhsj46o64th03jd0qhnnf72y9ossirrifn866mx9hflklla2q13y8g0iauhq3y0awrxhsm864hme9ux9e0yth0tg2fayi4xxblq2ploamve4h',
                filename: 'dpz4dxf9ijwy9nsk6wsn0msgmlcxrt278px46xcbno5enlfyv4ghb5zh05hfwciycbjo69sx18vv37yr6eggmqj01filnx1mdlubn9ik0o21m6emzh401ijm9jmpnom2yi19efv9m7gthwr6lsqgjexcaudyt0ry0n9x3sjku0cvt2lksolq3dm318vo34xkh50y32fp7bl7ze4jmc4z53z7nmr8qxcaj24mq7c8sxgbuhi064g9529z8g4c7vo',
                url: 'hxphqwvx1jlb0k47zrzzsdssp9p7vpyx2g09rlhs4vzik0tcdx5cclu3834z0ixiyk6obgetk6hyarpndw0laehrmfduhqtzg38q4vs0a42gp158zv9uke6qb1g7uj86x4w66agtfq8b9v7gaswr5m34y5qmhzit5nadu991m9qfraw7l4v2rqj29sglbht63qn310njccj5piztcwji18dmglb4bxx91tti4308ibunlb8pqxra3kjni4cwmn1n8k553rga1mmmwmh5s65pmovnjixjg5c60zct882d546l0soo7znux0mbt6pv8bfq2zyo2uquyaakwdhs4ql1kt4e8782mqbto5rske84lkgp4ilahjb1kzivb4mieou2v9r0bh2guhrde697hlc212jekacnnm2eimjjv8t603zz268jfvab8uh1d3hqvsbvupojltb99iqbwf95j61xu1cvaaf59ebp0kagfhzk8t2nguc83lw3wezhb4417ij3s54v41srsjbvxlauzjrf7n0xxam9vxwkxsh9p3chmdgitw4qweddx90i4qy2etch06od4sevalouu4l1rhwkyybpjvaa8plwi865vmpl62jq6djv5b519s71libx31itftu7boq1cyzgcnmj57741yjos520n450w9meymdzft02ig812ttpcrwp0wpu7mqoy1imyw6sxf833lvodasb85rbpw5o4etfqbcmti2s191yv7ppjq019zedamjwcbwrg05wwrm1afd15nhi0bb7w2ob4m2b80kw37xx5yfju6rt5z4291vtlvzc084mi1yzmqvvsmne8fkx3kmczc7ihtlpp6jj6mhfu2mqxmgx35xtse09n0fsmtt75ujdcaxqny7vra8axp78ex3kxbcsg33ww2m25ocbtqwb8k5a7xtzt808efamjj1k61qrqy5665krgzx7yscupbb0pqavg3pf329wxp813m9vst792cskhnpqj2yicr45pckumebl',
                mime: 'm2t92ysru7zq410pjoad0aoijv5b1zrag9rbc5iqmavm2wfxxp',
                extension: '41xznyi7su8rube1yti2im06959vnly43jo82n60se55qlnov2',
                size: 5274005432,
                width: 250732,
                height: 885717,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '45rlfb28k2xz9y2ceftjkuboguqd8x2fjbw0sq65tnkotu1uwlab7fe4p5s0ypyq3owcfihnrfezippy5tisk90alyfzefz0z82azu2pu8da76zhf93pg2h1es91ybqmkxzyrde6kelpbuhf9s34suk3jeqmyy5rf76ymlm4u3mhlt3gmanflzg2g5ys0zbha9kew1xir75aaoopfsfof4yxxl0roux5wsa94zygbpd4lyfr2g0203h44i45z42',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: 'zwv8006q2janz5encwy12shuhdenddlhpskwx',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'okvix9p5jv9qfftm9d6cb10s1vw3iu0yiwmbsryg1dbwjh9zq9erse6qehao09zmaja8qwfh9sv',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 724161,
                alt: 'gb5qgv2iimfzleavwinfp2kc31wzvg4ih4h0qnv3zne560zg680a0uh48imreuqxnc9whkfpvhza82lpovnq1c679g51wgoodu1suwnl40ko472nj0u7n41sm9mnwzphzfwjchvwo3qpfah6xgiw1r4x7204jrq1z9q37wr96vjb9xn145vs33svlgfoyrvtolrrr3atn5rvd7bwvzril2g7ts2o6djkpxd94zou20pwg113ie24a2k2rcz8afl',
                title: '67r4xwfan3i5t21iczmc6679c5g5286scqwt9ana04vi5jmp1rdkuq66pl0insxenfxmoi4awu3dwnvsoudeknv1tkxrtuxc23077k0lg3iz6ypay7e46d4fn2yg3xxnnf7xe6ruh292k7xdhur23gvhjx804rz0922kgd8c3mchynhdl2e7zvzvyqwym8kf2jaf52rao9ywi1ge7xvofm9yn63fwij7ntnon2ymp3rzas0p5gb5x9kbcrnrb46',
                description: 'Omnis id ut praesentium laboriosam debitis tenetur aliquid quia. Sunt debitis velit maxime error nulla quia doloremque accusantium aperiam. Eligendi est recusandae quam tempora. Maiores autem ut aliquam assumenda quas. Aut et ducimus laborum et aut autem explicabo.',
                excerpt: 'Ut velit dolore numquam nobis. Explicabo voluptatem voluptatibus et velit veritatis. Velit sunt porro omnis voluptas laborum. Illum recusandae inventore ea eveniet laborum aut neque. Voluptatem et omnis sunt consequatur pariatur earum aut et corrupti.',
                name: 'glzpuntlk91mf4bcy51u7ktfuwz76x33qytay7ginv3xrxlr3sni5lqd3hm8bjdkcaw4s6yo9vpjywbz5mumeblj75hognwrs20n4qtpa7keuidlnzpon3lc49ik82ip5kn97b62azt6d3p6nh100nnsmfchgor4gem1dabep8i5n6r8j4epo6jqsiba1iunbtpiz5hya9hxtm3ocw9injyoik5uhgjrkg69ja77yju19vgg0pv4cpb7r3479jt',
                pathname: 'pulhqyyqszl9sah6kchbgmx7kwwqjfkbmbodewhydtlhazbzyom7t4f6ba61i18eomgg7t368y18wmkkmu1bz9xnb85alpfvnlu7wj3cbcv5fw00e8pjgd77p319vo34atvj2aefvcw0pq0d6gefkk7icyvfjggsj838eszl4nieh14okg696sov5vt0gnjor1fp3wl9jlqmoswjdrx9leeh4gy3fuj6xt30zov86qe6s54ko48z66lonhkmet2ms0klijzst71g870w9pl9d2jmu0ao988bptxuzgh8s9g4azichtrscaixctopoyn0s47ephp59465vz2eaajb0b2twdfb4y3jyj8qluanl0bvb2pyd33ckstoqjbbluhcrxj4czic7ancg59wjugzw1x40bb6si6dw0m77v2o84474le4y44fji3nh3wm2jx0mtyflci2pcq6dksff8d30mr8vb2nbnpoilgy026837x9izzymzuqdpt0r0rm9hdshqw2tzcybwldgxahm6117qsk6jr09ipmip0tzyo0618fo4ewtjxy3akys5rdk1ti2z96e4nf1p42whd0rp6b9vkg3u9zrera73gmnxz32m9571cxwc0dxiph789pl2k8n43znfzrkqc38jyfcvpfn2pud52sqjj3ncp7v7ukl2lkcl59aypyo31n2uoxcgg5zv94zau5u79q2tq0xjqms5h1i1xqkzk8bihkjxyqo79fxjatvxj4dg6nvgqoe053xz38mk4m4333r0hhjkpdxjgdzv08l6hbplqdwxri1eacxvjlrnzuspkwumiawwzle8faqvol1o83s90hf4svcjvceoh5wyspt6zb8aq1k3id702rsata2mggwd6gti13d39lctk1n3xs5b5k1bp2nqaukqlrdbf1z0pkml3uhijr9omvf2r3mn6mainu67dmwax53mui1cctwrtj01ivopdbp1cx91y0sfyturozeyvwtvh729gv188s7kw2wndr',
                filename: 'h6wd9viol79dhm6dkbicm47an62xkf1gfy9ppg3a7rdxhsh8uoxin4d849g8b0eufz02nxepi37lm9c7ajcu3xby38iu59xn26cabshlts3xiapmsnmyphwsi8l7cxsijk1vwqxefy3o0u0ed5d9rxt3hid8ukz2a5awxcdq6fdt7bs44g61s3hdqa2onhdnavy5j3uen5cbbymwbfdm0p7u9rcoco5qooie0psh43rhf5m8d0la2ctcq2wnakt',
                url: 'g51xankpz3ik2ol8k04lz8bezcrww1pgpuemepqg0472c99hf4i4we0n39nlapyqt1kz6fcta2u03d0zncaggsxothumwv818qnt90bbnejee8eidg5sy7kjij88b2zp2bjq5owsx62gyqkfplnv4zrvjynzg6g2shh6khvsjsqkmjgj4oxlhflv5mz6zjiysiz7mr4xi6r2i3473ulyu8pn7ixb05is9ynaplx2ek2jh1kc16k56yr6dy7gphg1q320fr3qc2bbn9m03x5vn00g3209d231la63jjuzmjsjp6ops51bp0rz1zkte7mxme14ykk0g5bgziemcr2xggno1dr8rf7jujb67r5uw4guzup7siu6ufpuvuqn9ewkqf705hvzpzh7kzsaz4yp52j21b942nxzus9n5kb0v8y4pr3iwxelt2nfz4gnu2xtuvpc1d3vxfta8hc50dkgecf9gz4peb6dxg5y92llz690bqxvqc0rm97s7j4pcg3yipfjprh4p6gc4xa7gbqxddjocxbkuujd6cquhfdh33n5re7nqkg0s089vus69j4e1mq5wguqvuyfi90aajxhzdk5sayrl901xgtltv89arp1ay5qqfz0odlhxr88hxeo20jps5qkustcz6ink7fv09vpkhadlqnyzicdmvg213u1lpip0asj7bq08dey99q3kqitk2m14gqdp0i7a9c2my33kxoykd4575cn4kd4h2rqbsr0cxi7oxj3myuq7nqewze7a3hzgy90xrfv6vyptw56dn7btv9c20qsfjffpginxarb376w1f400tpwcnasy7r4bmbn9tipd8de3ml83w7bdryrn18s33nng6gwwjd5ru9okx9zpabfzoilkkttx21jpcxr0s1ft4gjaz6ixqfkqjfro1q0aszyc8ubj5v2pcief7jlj6sdslcgiv952sdibiw80komzs3pyv8wtluky2fyne5duss5n6g4puxodm0nx5mm62tjnykos4c3',
                mime: 'w1zo8i4i2f7v4eeyov95vapj85oqpwagvjs80sodmd489eus3h',
                extension: 'eghaij3v3nol6v8bxt0qxv13g01bqfh9hk8mjja150xyh4yll0',
                size: 9085477815,
                width: 904569,
                height: 681059,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '65t6ko10uemfnej0n2xovm17ba7xw8d3wwhl6l25y8b9ur6dy28r9z2mc9bmrfn8bv4d3ig7zwn5f7d99vyro1wkxoiaemjitjr92t6v8dpq18246bfyu897maatw1mkl3rb6uy0rcxwm5rbphvs924omxvrbctfkvbbm7i8cfjsobdubrql86m76ow653urlp5iihftjwvp9tej9jvnk9g8bahgebp81tab2dah2lxqbflrdbccw6bnkz1nfv3',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '9kll6h4z2dbvze7mxqh6g09nexzwbl7b48h0s',
                attachableModel: 'e691kkbjj6k4cc0fqiumy02plemejry3ub9z2u6wmujgxh7mk1la6wac04a9l276qjtml2qycms',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 793532,
                alt: 'kkqfpyss6psuc894hb6rf2ojg8r6w2ki63txt1pf3vkic4pjxpo9wvz5mtpt94xqoymzx5pra9pkdyz1z21gb9urccz5fvnbn9p3wxe5n2zcysr9uhdesklgrpiogq4mkquhdsobywcu4any3jf1nnz38juqkthx6pjba8zj75h287xjwa3ysy4efap8kdrv9tgwm22fa5roubnvhuvh3mkix4sbda9tzz0eguv2ekwtko3zyeztxpm951ofxdd',
                title: '3csv434cj1wlantt1zsnh96xnyzxqbhyu3kjnwxwd6oj4dtn4ydmlvnhg2w7om6me3tnfbgl4w4bvno8jxn367snfdrszns777tl5ugao1u14qk0q6xz43ue98c92or8i4c0u6yioskylvby9srfr2ofxhqh03ro267eoqwc5lduedckwkg8483jq1slps17ujmwo5xkua7vw7nbp1aj0dum8lu4q2hpzrq6cwk67q1omx3n1os6b0ua5aoopgb',
                description: 'Distinctio temporibus doloribus et quos aperiam. Commodi aperiam voluptates consequatur. Doloribus qui distinctio enim aut maiores error. Laborum laudantium alias velit cumque omnis sint eos esse. Est aperiam rem vero sed non ducimus.',
                excerpt: 'Dolore architecto labore voluptates. Dignissimos quam eum consequatur ut rem temporibus labore. Accusamus vitae aut modi. Id sint at itaque.',
                name: 'wg37kir961qecgnu0mgq3br1cniznxnqphrdti1fp870613w3hnpryt9cd2x0yzg77tqnoi9sl5nxtpy13xbx96h95cetn0umjfl8bensa2zmui3if1nqf5wcbzyfvcn81pafspecr2a0ilrs4naa9g1hw9t5a9ulh3c5i98ixlx6qok3273r1t30ad0orwne167fuuostf0u31vcayigmfbl0u7n5ugccic00gtg73ry5ehb2lhjxe5pk1u08l',
                pathname: 'qtkjm5w9374b9n70jv28ebtx743rjhhk31zo4au4kv8muraapapjdo3d2sowbun0041267nbqdvxgk1mbqgpaqudhi157j6378isxcjric2m35thodpjbqde48g3acrk5uro1m2i07ca3j1cvk5xcdqwo7z12jscndz631luz9vjbyxgfydg5k1je0a4rwa8a63o2fil0a643krsm3gom37nyirzg3jt5x56616y2p8s03gjz0c7imris0may7m9hc3t8zpp4udshtg2v18d5tv31k64uz0ys4kq367mtr72jdnhp8sfjd55q3ykv7us1o6dautvreyv7j44l8283q8h74p3ghbiymcx5borhd10ztv0nv5553i8o1214xyngs2yr8vwzynx1dj1f3jk8exb5stnqzxgbm8n30yzfs78q17xcz851ne6d6kgk6jge5cmmxarvnuvrevduvadq4ldsmq8un47obhxrw3pwijj7sfat32qpwry0dumh1xj17m8x4dsn3xm7l5vdqh50fgvi6zdrg39fq4pcmod3ya06o6k6gmsze4hbfi3l7uti8bretkf310kd26kg7h9u9xa2imw3ou45czuwjnr1ihir49alsm11tuvku3eifr3ypw0fxscniaaklbw2fspxkp9mdegox2c8gbdu3a9ficrp9gwgln4jhm2q97arjda3a3klpwv807u5g6d9mk5a5fa6s9q2huacsodla6flez9azupeysnwx0l6w0q3kbz9v4a91kwnsl26qndg0xs2igb0eqrsfm845gnkau0i9lwx2sndxgvbr9fq8pc0ghhrwdh791mpzuvor3jrmy7hfwxpnswyv8aqu94jgg1wflfefve1a7uo4k29y6h3wg0svqjftnq3zcaq9qdfwf9j9xjkphup9m0w3pr4vsuwv0bxzlsxq3s08g4nrva3q83b3l2ozsl16tgqjdbtb7capxswighbncgnj6g61vjyakl1m8amc245bnbpsid8c37',
                filename: '7f2v8u08ejjwntzlkusjxsty3qo72g4surdsae5kwpn4547adhj1aze26gbj7b1delp577ap0i5dew6nbw6s6z1ey5exapnjfa94unjie2levh2af24rpavhkn110a3thqdf2uf1p07a4jn5mfinxglvp99l6rv5wbzqczxmc3jlm00ozvuu1nrdvyt8axzj3vr2pbz4d9dibuevytst370modonnntgjn6hwqecmckqyduzkyzc936p444z9d7',
                url: 'y3izphdwu9kunswssg3gmw2lid0uyflbj3buj85lxoun9e4m195ac12ddl1fniex5iszv0mrvn6tmejykt4rpgdvuf4zko7mhj1ah617h06hxpytzkdiztbp65ux1s4g9e3snoy1rcvu8jzcedx59koi4d9ce75gg15bke6tuobs90q543csffqg9tqgp532sz2p9xf0t5om5f1th3lisyhkhyj8dco1i7a5uoxconw5zl6kr9wak4i8vl3oys8aamwiev5ehmfag42hw3g9bn4h1jwt2uayipy2iu4m3l4pc2s8fghaovso4360f64qs9tsmm57n7yyuxoadbfk7ys7t0kpsi2cgumagfe1aps3cmx0lssyi3rck34akxi81hogo2dpx71py5eh2c4hz8u8ej1mmk7hlgnukkacr8gfb664azrcgzvrzdtrtx7ukxwpp8as3pra0xbjm6faae137ox7mc25xazhde45rc4rqtgkhan7uwcqzpxsmlu6xo6c2g9ees3g4aeehcwib2kxcq8snahu7ex8v31d1pwz7n8l8db9chez3snufr77daleqrtclmd9lqdnjvbscqc684i27e3igv6cjr10mfwx3no2ftx8ayfwtgpbppb671wdvhh1jpey5yna1tt0ariajvfn8knz8w3f7tl6s1whg2nh900lwr8fq7yj80vdof5p0fdocagk8pawgsbjvijes536nutanprfrehu4mrvhqfcez1wowca4id8mo8kko1r6bts2b8kh3rjj3n4ei5n8b6q9jm0oon8ieatyh0auy240z8mopobd4h24ohyz4y4mm2r9hfdwag6uf1q54flbd20nmph4czwdg251eq8fwo0rnvofhbdwqj7de97nlf0lmm20kv1swdflptnwx9u8hi6bxikrgmiykqwc8gzk4oz7h7nbz10odoicyok726k4k4wka4xsmkar96f959nk2kszbppe1r5jwjm9b99omypye2s5w6m2k4tit0t',
                mime: 'uvef76urivbcc5yyusglb5ld3ix9o3o89isjcmu6fyxss89epp',
                extension: '6gotoclqb7nm29iq2mvb5fnhajdh4hxjploetrhby6x5y84a8s',
                size: 7971304398,
                width: 231808,
                height: 868055,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '333cc4nwwx8ci6ewi5tes2j7apy9lz52oy2ugb0n8dbxbxosk6rh9dq9haqb44wv2ytaaagth6rhh3kpc44clcqx6pkthmlyi7b0ksm3gbl5zx44k39mhj1thtdxlsk1kzgnkq1ba5hpotsbc211abdtvt3k8ezmtftc8usp79vdkth01ki7pjhn1z7vzp3ljuupk1h224bhftuv1mjrahtztkjahoyhw63s48at6gvpwegcd703io0jm6ue8h9',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'd9mlwjezx3dv6zkt8pmnh8y1y5cengh642hzakdmljepzuefcz8cjse83wfz4fi8lfwo4mjjay9',
                attachableId: '2vprjyn4ub9b0fo9rqw2irpd8u6wesajgyyuz',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 928929,
                alt: 'cx4jcqlatpgt12g3c7wb6xsmmf3ja3xha70mj23m87bep7iloxh07ng96dh8kupqi7uvt5oym8kjg8vsok8ye914bpdewme5609n1qrsyrar66yvttk12tvffnqdzlkgphuvqmo3009fgcx0mb53bwwqcyutseazz8tiwbxtnem94myde5kc168u11phadk3w330vt3hxqsugt328857tzcbtjqfgwhpz5z0nqousitwpc4oexbj1aykxg8ijp0',
                title: 'fxyxki6y6djjyuw7jxg5v83io7m965p3p331ht9rj94ydsazcdn00nvezampg09joxh11kw0phq5utidnxxsirat9pvbf1hvvme5pbvmmcjiixg0jatuz4ze3p41zpyaszqphgpnmw9u6iz61uthidbksfnxopoah40c3rwarigw8ikuas24zexp95qkf9zi43ahjgmmy42s8gf5ukp8z94c2yyhyjrccgntivfpaqgolzu898f8a8mp5ph6pt8',
                description: 'Dolores rem earum rerum provident nisi eos ab adipisci. At accusantium nam voluptatum voluptatum sint molestiae dolorem voluptas. Eveniet eum consequatur enim nihil. Ut illo eum.',
                excerpt: 'Incidunt enim nihil ipsam. Rem in et rem ad voluptatibus illo. Est nostrum voluptatem.',
                name: 'p1l8dsspbqr8uiopyybrvcyeks9ajlat8paeej9akpnq5zgw2xi37cg3tifmv69zuvijoelh56jrbznrp2cy9rn8voy6gyme8t1770o8vt66ieuyv9975iz7bt6nnx7c4jx01nirjhpwpvqnkgv9egszbol12re2l4ua48vwm1f2vgsuy5pb32ousn8znihu7ujz85q38nofnbm0jhuzwn4fa1qxt6ttxmigco5bkmd368crc8gag3f42uv7bjt',
                pathname: 'rwv2jqkea09wko1m4302a8dfa5mwiddqbrnndcefdb6qbe9235vdt9fk7w4jtzqc05ca6cq9id568f0138cydwqte6dmyzwci2toavnoujy1ywwjkd4wk8bvi430swnvbeptz5anhowgrkm9kso6pdq4ujvxd56udy465o3t2kmtmjr126kv563x5b8qmsa4qrc9oh2ycbwiy3rdugx1cz3g6yz18saoh8re3zv7eszxe0utxis7w6gijuqoiyd8v1bfajcf3uebf51givbc453w9z4sj0pfzuzzulxwvcinb8986h597ney1m1kp8d0cum02y5tlqqwhz30f5rylkhitewt2ho77qm52ub4pf2ne8olw5rc6u6uachb35rkcg1md5fupaabpcab6vm0w088oj59gjwy0zsyybx2rmq4z244ivbsp0f7kyztc31mav5y1e26ww15ljf0vgcdn2tvvecwz8xvym21ybe52e201p5bsqze0q8d4z0n9k6moyup2b19wljre79usu0pz8zcjz3s0m9wbtdmdih0om41gzz5s2xgvuqov7nqfwatasg407o18wxtg4x77xbrtjmjyp41j5zn4up3vtwst6ywysxi1x06f8o34284xi8uq9rwop29uxy7o7tk61p3np39ns8l54x8id4ddxto9w5b5oxksil3phgpfdytd9mhakdk3t4vu2z8m6pt7zedvbxpg35917xfv5723ss33qst48jzhjx48ya3ptbkmmd5ta07dlr4u3acql3c9qh07njmtknz3i6lu2j1ej1tt3iepav1n1fuv4h1twj60x50hrmedjsz9dwjo5fz87t3uhhu70czrv2g5h1p852msux5dxqn16mv17m9zf0zxzo3tf0d7w5wr1j9fpt8etoi5sfheum2myrkkrvj5u5a3jhfm44gttfpflyrfk62nz6gutjo5bb05fytpfaafaa4cm14pwwuvbdxtfr9hfrdahe5ncr1oa2j3os8pjrrxswx',
                filename: 'mdt16ucbqjnews3zh80v7j81b45a4zfzixlsbrgvlvk1esoh4f1ggdobaleupw8lsn99vdvestbp0cctmxfo94xhk518ufx0eazday538whd20bgub68qoma3hr65gdl7sslcbqbroiw3ktxy736nltdbnppkz8hsh19arkqxo6898ncxdqo3t4jdkqhw0ygvzu02y8cqi0264totg7hrr9imfw6f32w4ckisw45o22doi6nj7o4gahtvg4bxy9',
                url: 'yeced8lcmzkjzgfzd52jbljoos0ltz3bkgq6oiwraloal8477r21hmt5xv28p0rmzb43he95bk78k96zqm89nsz2chwaaem9f3s37dgdj1tobyd2ew2san72rnz2up13bgj7z6kwigup8ve1rcppdl19yuqglf9prexizx5o0q7gwwno608nxqz4oe0o4thjmzeau24l4ccktpkan6rio0ibhxrmgd7o8rcvb6sih64q9qfhk2vb4kgw2bprseovw5vaa4bvrnwtd2qmk7vj2m8yh30l29aduh9xwbxnvdlx6jb6y43l4tv7teiuoj3k3h5x5v1nzagtv5ftmmldkucp7jnieadukoojct6k0dfc0mzi142ws91bty687h2wzaw3gg44exemrotncj3czpo6ixpvgl4w05jjkqui1wd5kyqf99iglp6682npp66rd7fn579z9ydv7gdp97ky4svh2bqtymk7tnw1ig4yizn90la2n9n7z7qdjk06y6yb19dwpb49d2g7tkne7p7ka0svh7610faswkq3ih49vhfl2f184vumsh3l2blds6xd51izmv4i7lmtwmp1zjbm6c524206rpe7s6vinmluzwk7wp57wkk0h85qmyq9597ip2dzdk7mgssbneljd877hpg0b61fcgia4ew35p5ff91t3ynip6ilcwjqwrlyfilqaa03iw4iot0re156gbf3kpnk1lu4i3w6qfvtvffpgg6g7hq9dzk1oqfd00x3mrzv3ba1ffxbzpi326e5ognes6vh47r1k4ncpdmkhxw74njdbdxayq6unc2k8kfl645nr3km7bsy5e3b97ysznrtl02nt9ludfttdm5m1jo14v7cs7f5f928gnen8xt9zho5qkplvxas0unn61vnkh202vayt63v4nesrtg9tjb06uyc5oknfwwevyd9u2yvcz4gdn6hvu58dhr7yo9ibyj1b0j2o8wutg1649hbcmojptzro46p8g3m071pero8ttzu',
                mime: 'ommxlz88kzg120q0x0hm19g9f9n4d7trqpk622zr2je0xyxytb',
                extension: 'xalamzs4k8hpeou6dlr8mook4wfnps87zqmyu3h1545ld0l0e2',
                size: 7688441758,
                width: 109236,
                height: 804688,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'hnddcbqlnsnhk3l6zblkhb8v0c6xiyjlsqdqrjyyl5kxqrhstgkd4dv4pveppvbzbtk0lvtf3vb2uw5itj0q7cikkmtrpo96fipgyjdkwnbrnyqqrjpf9ope3mq1w42utyuk2jwv8mtpj8yj13lnnuv0l0o7c3owvt87m0oqwr37f7si7ase0yw92lnf2bsuz6jygbggoli019ki5c5m5esokw2akpfmuwh4app9aeknluo25bexvu9dwdlf25r',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '0inia3as6ogeg0gdtvtqxe1woevtpsz932bb7dc9y2pg8iolxplg90phnjy478orf0lkkvthpvx',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: 'yhkkb41vgojiim60zqt4iw1foes6tdemuabrt',
                sort: 297948,
                alt: 'mjcg4abg2p1vfasqdn47a1p3fej334pagzxiwbupbcj4yzjvpgj40bv9d541v0499dy07ehd8yg7llsffkof05ycjuzvdxr4f6rrn667hy7cgpsn1wia3qztw9r6elumimpnhe70w4shbf5mpvgisoyflv83pf4g8d267pc97bgdgkcts9a5dmjtl1e2ki8lksz3hvik4e2pagrrv7pm62u238lt8vmehnxj3zlzz09ehxqiy3ncs8z5f6gm03q',
                title: 'gp578uuwaj0kj0hxlzuuwmihu80j9zz5pt980yufgxolk2l66fi17qc5iej2ab6d6a8gkmrqqw9lt7w23y1pktxrb0x8itmdxq0g8859obgqqfzaeowlmqulkv998h1jmgz1a0mmwunjmryan6z2e2pta1zyq9aife0a48f6v7r3a84lftawrj67xpjwk5biuqx4qz14xk0vr9jz08wsxziod5nugyo7k5naou48v3vq9nybjuq5zo5scrnhvj2',
                description: 'Minus eveniet quis. At maxime unde. Aut enim vel id. Quis iusto et reprehenderit ratione ut qui veniam ea.',
                excerpt: 'Ut dolores perspiciatis quae est soluta. Et incidunt et sed tenetur explicabo et. Reiciendis non laborum dolorem ipsum dolores. Quae enim quia. Minus cumque fuga illo nemo unde sunt.',
                name: 'eivvzm8fb0tsp541dy7fyerzp6r83z85uvi0dmiwsjkqhsqidpa1w0123rtwctkkdrkpyvywzs3otd0rueyqh4ksakyjwo1dbfa1nx7ldwmbern4mz2esquntvovc65ktp8mf44339hlujxnz5hv4hykyw3jwgktf3jx7utwcg1avz7eyar3uj2jotrm6bsr4q2yh0y86ygp8czrpd6cljbog74krqgjfmsicitl0dcfmcawefk46xanadguy8y',
                pathname: 'o4pff3kauw8vu959i5doaj0hd00d0f4u46jyhajchpwbftgj0yn1row6go2dxxfc5gayydevaz317aq7cks1kjd9jvqis32jcb4vw5671gaomlkebqv05jbn781xa4xuizhs315wcm4skygqycuq0cbolysj7mw32adct0uxl39tpxeveswx244t3ze8jvi36ckaiaqfmc78g2x68zevc4ciz7gjfjseuz6ft386j4ihzfm37gm0qf82m3is9fu34kme1ynw1neglsbjw8e3z5zc85s9oli7891nawfudjrkfnfxdmxczjokqotdpgxqmlkn3zta9flnge0dv7i9wcpcamnxgs1qzkdbosm108gmxis6c6n8o67r3bg9awke2jnojrctujx4iyntm6n5fd2o5xghaiejp67iiimhyjmui7ajme1gn3j70l7xxzdr00x250x0994oc7ii3hzb8aiie8z36zb74040tn360utgsf3zyrs6ohwj9higfn0bfdw4kaqil010ngihetmuy1ofmawhk3aglk5fmrnhmii29432h1fuug3t3m38qp1ghr9r5zd79rvb18hskw5eo7sfzoa08zjq5vdd5g43q2czoe3w9c5dlkx8ivuhgyk4jn6lqvcrynjszwpspjk8k9ai653n3yhf0tlyfai224463fw9pqzc3edseovkgu6o4sy4k81ygxnn6gem8v52gc55a5nu9rqbfybzy2a1s1s43b14dksq2dbmczin5kzfq8qwxf3777u9f9oj7faevb7orebnhjv5p8ncb2f2owlu52i0skd7gsf5rppwol9jtrvesvawl2kanbxy3xegio751fnowmg5n3wm9pngn3btceaymzr4sfeqll9yoc1j8fq350669cdqm0kaak441d1dqr7evy6n80b94gck0rvwevjshi9epg1krc0he3nx4jzh20oq7n823vhely77qpwshi3hszvc4f4jbqjue4a7j09hq3dop32pgu7g11e0',
                filename: 'xp3kjcvgpco8zsx1lvsx75aovhcs0psjktog7rcun7nd5uht3f5btzfeyhw9hk99gfikzxlq5p9dja513l8wvnm121av4nkjgpsj7cq9da1il4vg4hcvzmucu3l68z7n2t8pb99ejr2hjajb0oi7n61nx0pio5wp0wikf84mjzfagclbr4ezofgczsvi07fto01ufxvdiac12a9ch8vgzmi23khcag72c678gnvnz8hx7rv55lexf99asynfq1o',
                url: 'mcriijvmh6eo1wvscylqug9m43fwvte4fr894mls3t1fgkbhv2tfk6106ujmkleu0p4u35pltivexdu2vnrrlihqvjg2jmmsne38il26gsz3u13r23m8yih1hj61zijf6l9slwcnuf4qbqwp7bxz864peb0fh1qkw3vj8ravyg0shzscwlccfti6n57vzp1erjus0put9lvyhtoqbxdenaxki4mrbabda413rg6cho71guniq8ghg946zifl4ddxjqvih7ph97los6k7c90mwxcu7xcd87e84pep8hlu7ris6iac2843rkw0jthyovgd9mnld1nusc7hhrs4tmzw9r6zjvzvvfvsj1n0wr2by2eaywj96oqdqxpwfgk3ytu1dz1kzwz17ctxkvx3vvnclozxxlgnr908pyf2jrw4m8dgyskt89exmmlvu6sk9t974xmcnkm8s2km4pb02kfleh2jelcimxvbwredmy2rfi3xlmvzkq9hyhpkin177patwq93vzduxa3sug51imnkm7qnp0et505hyzsj1hltztswn51392hzwgcure6gw2jdxtefyzurtbvarjom3ufziniqx2yyedd321lylw7pwmtsdvoag0ukm0g08rkeu2ho2p18ch4pg2v2kqg59lbo8zfnihv0rmg078x9292ajjmgu7oa1xvtawg67hibchnofbebymhhjuu00407hi0fbtnzxa1xyz3bql1yxdamj6sfy1c51f9jec3jr74l8ygwnyeca9tov762redou5g4e7gkq2lo9mvrpzkmmt0t1izv34aggko924wpcvwrgi7v2q3ytz8c6ndxe3h4ec1es3ntigm1v9i3oliwntf65cayxhgypp4jfye67rlwck3fggmarh5ukntkgif825uu13236jsz69bjkji2l7xepyiqo6tt55axt52rrxk3fzzboc32zgzgovv2g1pzpmt1jpuxbvnpse850epkt0cmnxumnt6jtsvylraldxxukwtg',
                mime: 'cljv1d9xzoqoyw1apef3s2mgf7tvt47z7vwv8793nf9c56lqpg',
                extension: '600qh9wglmt38qqyuuqnir8nuj4i2yw869x82y70cdncrkfuj9',
                size: 6128538541,
                width: 474539,
                height: 670430,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'eht4rqnol1v7icxnrkp9omxybcpbd7ujga51v24t1bie6rxk5lfnfiui3rl0yo6a3p9hdiy85ouckhrmbhrp9pyhejyp9oq2v8v83yau3g69pul150bl77q1yjzebxjl5wzh3bwa9key2ot93x1wna5aloxz1fca508dlhf0m3rvd5xb51p0n8eiwc0jfqktv1cl7l9om2s69t49sum9ue0ijuv6oeh38qzzp551m0alpkz56w3xxa3pz3o0oyw',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'e7r1rd49rjow8fe5z6u9u532e4nlqohghpx6l7i71y9j6h5y2f8s7e3z5tswmihye5wli8csyx6',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 141604,
                alt: 'w4hp6aktbgm444bfcikzxkpch1zpl18piu29bv92xkzav8exriewbqd7syef8rylzrcwe0zau0pd55zbnvryd7wkvve7gauuogl9fvc3k848i0icfmqdft6rp5ianjet3ou31mqln5y813eb0vs7ksjuwj0f4r6cnyov22nouyhkceleu8fjgy6tcke2q4wuhbtmnuzbg4ndpyu6asabuy39bklf6n13fmb577eh5mfe9rvkqf8tfyg5fl8sl34',
                title: 'w6uqqfl1nbjgpvzuxk3zjc7pvrky2foteg8bwlhe3mmblw3gmoo2arety96kj7zlt3kvcc99qxenbjag3xttnvl3e07eik5j5lxcselzsbwa8uzbrhz2j5wl4ztebev538q13zjfibq90ka4luejx1rlvnibfs05821tcvrem8ic1rqgtidoax1p35f00eykszd1ihbs8udy9kf6e4ayizs5jrbwobwvl651slt1ea8n9g41f8d8w6ugbx4yd7v',
                description: 'Qui architecto autem culpa rem quaerat mollitia. Eligendi at id sint dicta nemo reprehenderit ea. Nulla quibusdam placeat molestiae doloribus quis qui et magnam nulla. Dolores neque incidunt rerum in quisquam qui. Ut quia minus non molestias odio.',
                excerpt: 'Culpa et non necessitatibus ut ut sunt tempora eum modi. Ut inventore sunt id sit. Nam aliquid aperiam provident. Quae iusto cum eum cum minus corrupti doloribus voluptatem. Similique labore quis natus dolorum.',
                name: 'z53hiia7t6v97ric91i0u3cde3mlgrqy2qifnb7jsmy414d59dotp7p26vnxw1d3blufxjie0v6t9a6flcknaqipesa15oag9gcptg09e8axssmdkw93mnxc4geshqzko71ennobobzh8h0e6sy7qndjekbfdk9dme9e4rdyq5egfqf9v45r5gp2v2s7do3yq43gzhbro7n8euakzp63c635b55kvfeww0m1anvd8v2fu9bl37bgblzyxd3kzig',
                pathname: '1daf4oedolxs9qaig4qnhh6nt1e92p9qn6mfgbpdtssnh4njtt2admhauj1rgptqfdm7wgf0oluidljojde26ga032chldtskmrtv5mglp1qh8jumjjxq862hhpur8z09o2um5ry6zeh17hdl86upvr7fhfk1rby6brh80pgxfskk5577wned521oyxs1ylmntfchi41kkis21ypf2habive52dkin77gazt9zyna43987fyldbbcudi7xp114j0531f86gmidaozj8r7a7zawy9zy97rlh7uy1vikxo643mjmlptwdf02a61op1esasqz9hu0dytvwgbd90bjwf7ud38gyv9ab3cwrh2dbuimwdhjf06lob91gcjin18zpycj5nnc72xncspt9l2jk35njq7nq85d3fz2814s7df2z1j8lcinwrnu600rzf9ndv41dw6cteql9svg86o9kwxpgbc149ksp2eu4shghn54zpt0otnkme5e512hi10gyf29x0nrc5ackwlnvx055v3lwqxpxjm8za5e00rp7knhqh9inb99jx0z8mwwmu66jsmmy73yrpx6f5bgcz7fcp6bamzg1xq1qiq9v2if95bxz00b5fezwz628oixfvuuvtwxkap0nyjdsxivf1d0rgrcmg3wbwftm8zghg8yf51kpgjdlxxdn1vuovntugb0yurmxt0fknha4112k4fznyo0099jrbxux1y2flru2ngh6607xd6n358ljx52zivb7be1ncvqzvtv2kxxuzo8i0epzzecw5ror46lzfvbtndsbsifih22gqvzy5gk9qom6iu8vgf68wytfd0ho9f30ntkvwylfdsgheo079w3krgje0f6g5ivzvp86boc48z66crrzzyq7cpdr4choasuipyugglxyiwm5y6ce9u4guew4eysifxwecly8gmgde6wvj9dhv1pkem93wby7vm1hi16cz8mb7zf2mz2p9bymsfzaq9kx314szocsui5ipcyg3',
                filename: 'y2w0kbbb2qned1rcdlg89md4xn0hjo6iuk4tsc0osk2a3pedinu3wj2xd1mu6w14hytalt9yld2pz05q3q60ucm3se8i6lj20xlrsuk3r52yfg6gsn9lb2zpp78usgodqz7hyra562yqb4rp6xaiejbivmyc8cx4nkq4a8sfsevfpv92e3a9skaibshmcdplu254gh8nqnd2vt8j0p93h7157t7ism5c0426vtz4ie3c58mzgq6itlfemnl0ccr',
                url: 'k0f3evcjb1jnt7ibfz5bd2ow65vh2qlu75alwkqj2y3h2u9cf36nle07b6e11xf2a48d4kz04d8fpl6i3qcsa77p5m9fl732w1o27pqpro35i5piurkybjnimy9ehsynjeuhq2qjjuhhrq95m4j2kjkhf3hg5ivjez719n358voyi72hh2awhccvnaonfiafhtm1r7kuk6celyompv7dnq5389k1c2w599e1fg9y5154wby9oy264f6e699dpj82hlo5lzkhr9ljqqxkvjouikr5wfz71enwva6wljm4jq4mpo3sj2u9k6zkhdi7gqogp7nwx1xbc6tnemli388vomo5zimizmpqbx93abq091wk45rgi58ayvjrllgf74pihqzfpgujg50odah8lh8hi1kk8jfqn2rmxtitor5f9xuq80in0yh2txkz6vze2fxboygeyi5xoy0b6a1xw2r4fwg3nl6xx6ko4pnhdhcrn17lm8c6f43y9zk6op4tjaj308oc76q4evsfit2169snpndmxv8hmbegpbcyanoqd9t52jfa72no54o6h9owq7ib8hbqmlf5n95on3nzy4nwimxl80ub0s12nlfkwluacgfyx0ajc81p66fafpwbiegedlftqzofb3ua5iuyidyfv0e6w6hapoyr9guqsxomdp9sa28s18mhx0zkeuzg2swdzsbvcem4vzvrrjon38i3btns48jib7c7yzvxdbsd1gt958i06y969wswfn87hsnxhed2508mlhha0dfmeu17ymkqcjvepicduga24rflkk2wgxsvzw03f4cwmn8dbh0aywjonvncgoly9epfan3etqm13oe9ehv7tvpdtnaldk00bo9n507h06yetobhrbctbm7hcndp9g1yvxdfb9lspe0n0was6nxdz28vjcthkjqafinchp6ma5rd09vf8wdt033dkd22mwro7zydsugxxn3a9a542zvbd6m3y0elz67l0a0iicuss00r33mzlpoj',
                mime: 'mljizlgnh9b75j51l4axgxi3gblgnxoed37c2tpayn60crvl9q',
                extension: '1wqez1vhvpqzimg2lp7konrew33qjhs9hdcurr2n154z7v0blz',
                size: 4551548146,
                width: 114470,
                height: 850973,
                libraryId: 'c1oexu7708u9npalanfz4ueidk22yg8f87a4y',
                libraryFilename: 'y3qq4uibtcmpkq4t80h3htg1ndzknythwdaaq6bqk5r8iu2mljcr6r2m2igtpeybjv9qibsqqbmyqpeap73tllvld8iziohxk6jr7d92kv0ypkreiia51ppugusekpbm23yvu7brki8q1d1rk9shgw7rty2iwrrg8939s8yw4ommszmxe111h9jsukz7ob75tp8xh752wpzxudt7ianebvi3oszae9cjfqpce8g7vhaha66mxb0sxo6mjagln11',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'q7ii0qfz1d6acwbci5tk8x4oi05wbaw0h92u1w3rc6nz1hfh25ojokchda56gec07puc2z54tovn',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 700715,
                alt: '7nw88o0z8tm6y7mkfvwb6rm1lslpie63laazolqu76b6xzk9euzmsuhkuqtrp69up1op2p7i9loq87ndyarrn59n1nlk2qidnrlt9n0t3wobxfwbey85n6nltc05uqlgi6dd8twnrcf9583s9d7ikwub1rxoyitnjg4dhirgcewzl3mk7ozeb5umtz7maoi024029xs67dazbywgxmizuf833rsziqx05m4f3g0u9djdma9t06umkh8rbow5ovr',
                title: '5yeteqro3e9d93rc49dvuy81ahwi0guhz1ig9plk6cib82yfrvivd16hel6nx9k6tehujd59co5ehhsjykdft0vg55d56r114jqls13wyf052qk9pkdte7f2mzm1vwpf0c1j0iplbeyieynn89x8lshkpilnqyiktumedl92jx6vhyceaijf3vnh8znshwmk1r2wtzpq0z0iu5s0wz4xu1v23s2zn59iv6wdpvwg83r7qaolkcddov93kf6dufq',
                description: 'Pariatur iusto quo cumque unde numquam. Repudiandae a ut accusamus ut commodi voluptas consequatur repellendus qui. Eveniet qui ea rem. Quam doloremque ipsam omnis nostrum eos perferendis corporis quia.',
                excerpt: 'Voluptatem molestias non pariatur. Quo nihil aliquid nesciunt totam voluptatibus corrupti illum qui quasi. Impedit et enim sit eligendi unde laborum ut. Reprehenderit repellat aliquid reprehenderit repellendus laudantium. Beatae laboriosam minus corrupti. Saepe dolores nulla totam sapiente aut quod explicabo dignissimos autem.',
                name: 'bav3fpc9zmhveb5bdeubjafd4ni84ymv6842w8m716ug0ucs8xe1klr8ffalzkl0h6av4qh0pmp0v0ru4rpo58iirgisq06soa1qyg7klgkv21yz9aun48a7w4aglf70nzcjdvreekl6nok7sush3wtj1c71v631x9iq9029hx2b4wdn1e8aze0ht6jbzj1isgkonuftz9mvl7ioedwilza8bqi7fn8xnbdwu0dp0oc1zpdyrcoi9wb0cg12y0u',
                pathname: '6t9qx98nyqjqs5du2ddo6epev18dupxq1a0kdp15s2boa5zylvkok5mrorisj0f5wruhvbqhltgtvtxjrn88jgfl6618tfhu0z8os3bvm3uej3cnqmbtodgwtuydnxwr7uirr9jedhgspg4psfv0kxeeup01me18uluoi65q0875fkqbnao1ahe7artzee6nmsojoaqfmu2rzsxm2u1ubendbrfumk287cnrr9ee19teu1jz2ckvncr9v5dpxakf8sl33p1nvjvcfwnkt5gkbw7cou8u34jf5ltmybu7qsxvk5i96wn0mgod3do5epmeieqpm39fvr0zvb0x8tquuwg1vm15j7qhxh8cwdtiexl7ed7532irnrk1218dbubvlj5n5snj09vfiflrs5wigpq2hbiwxl4xpzr4kztp71tls65gj3fvdmc490hi3eipp7g5htd725j364e4kw8rb5a506qoobzehvqasgotppe21zghi4heekudm39dhpdfq37ocr0v85zuaten8rkrcg18p3q3rtmbn5ck03bbglv1kwkgyo8epcckyuqgng5gvn3yidagl479lk0b18wke6km36ospesj3a7i5lngj51q47rbbycu79v3g21ou5i703usueaod7k4ndsfm3wqxzgvibfbumhovkueh7mb4q08ocwvfk3vcht1z418mwb0hxm5wyzv7gv2l5u3mf90hwcw0mey9tpmziwlb4dy03dhke09m4jgtgtrsktuihdypxexhxltmsg677pgugv0ojluoklpw3ow07e6o79q2e3h7agah4mt05mtg0yx2isnknkxw5p5ndw5x287wk5ecv7jrp2n9ojvzmyxksj3805ls7aev2y0b9uadk8zkzjdn40y25g8y18hzcpo8hw3mw784lqx28fawuksskbkl8ts5184a0opy21k1sqx03mem583ice9swj3uobj8qebkpb9pswsl9j9qp4ghph1p3bwc4gyrfei0koostmycjwk',
                filename: 'tmfud2d7qmebwdkznag4rlwbwozj1eeqlli4d7ycs5tc3bieqbg5jvi2irod4e3ry0c7o0lc7n6335qt8hkczlnk7t5zkrecjwrcwp997z24xvb6z0yqbznr4oolevsz01pwndaczsqpmgt9rmmbq6bc0r0pbd4rg7graexw9c10uyp5fcgi99beffjv3k4m2ykdoliidlkohlcj3woxy62u4yx4qb7srbow359h885k9fzhd2d9lx9bd5nk67q',
                url: '8t2bnbzbuc5lhp3i5x1ttsis8n3i57augxglqf2codbkqpgrckhvjabb906enjq9vo46bkozl0bz5mdyld8pnd2xs5birnz7c0ofjfg3z8q2utyg8z2guyt529jkb98cqlasali8vmhnjwh8dhkye74z6xlvoky6wgttbk5v0f306iyi6pq8vsq33s99epcey9u4ia0x5t5yc6vo4kp1e3zrb43xq8aqwbn8feuque0jhtpwn0zf4rfwwwzia5i15xy6xoxfenew86dl8bqc1ycoeilbk4118iwzytevelyqkmeujij2hf3fhtrtpzt5283lb9lnh5rs1m4m84nve5nwo2l9duwthw9azwv6tnshn6s4swj53mjl2kzygtovg9tfxo9amc99rafva1c7wgmij2tiqc00z8kry8rmzmwnohbdl05nii2jbi7m0ml3yz475mh8ql5evjmjybyn1rcmbkk33vlkbxffdwptfhdoe0iycsr0a96zx1j5rvcr46805ei19pp9cw4t3s00v0e14acnk8kqnc12mby0eh7rpc3iv5ylnotjiwyf1ndpsztcr08i4mz3b254c3ahrrxwkr2obt94n1oe82jcil9hoalc24fd539fp72m6biucgaz4b3cmr7htm3s3acyawadhonbjhu8ez691oxcam7k1644dr9dsczhdwwacsr643i1kd56zewbn55v6myh8t13vr9enfhlgan614t3n40e7t9cwntew7fwp482gtkw1z3rgr5sixiyb7j5b4z5scxk7d5fvsi874iibi2bz58193y6if5zd8icqs8f3kyf9eyeylmcgtndbo4jqt8k0k4dzh7xs2ec5i2almcamykb3lul8a7za51rmvua3hbk2y63w63koj4d59rlolixg4q11p5p06384ky1avshyuijumw38uq5vxw6a86hdorkutfponl2ecjgb0lgu3rgadk06pdt5ew6544v85un6fnbujzpopf4yidhef1xyb8n',
                mime: 'hscf49ur8f2i5ovlthijp7nkf0l0b96jnirj5sf638xpr2dzuw',
                extension: '7nyk3wduvdtpgta23zt3u4plgobvzpi3sfoqfq38pfcobwrft5',
                size: 7677366595,
                width: 508543,
                height: 192181,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'p12cm9sqooex0oujw00lypey5ir3n332wkkrwwrbof4jsdzww6y42i7u957zkgifbbz244lwbf4gclixs4tic9uzkgtm9olhwvg3enjny0bte7tdiuunmk8x084sh6pjisxc30v9k56mc7s2nkuo7l0zwdjkjzle1h8s93nerdp8rwct00ol4laxmhaxt269qxhn0asma6vy14ovihqpzg1kb0m4wjsmktx3y0bv9kasx7nlld8lhoq7zywnyib',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'z7v42kjq9slaifab73v5zh66cbo5htysl8cr1o0ox742tnngr2aqkhi1me4aqq3w6eqsxc0ldbe',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 2691753,
                alt: 'ybnzhjeh2izky6yfg8fbcybzu2wj0akbx57dm4ane0nox4ywl3buvmbqzgyclwyne2k8jhu26vf62d44w77y0qzxpjv3jeud88mj055e7thb6vwkubliucxswkp9ounnld06umhglr0x2y2u3guu6q390yi97qrckx6m7of4qlq8znlruokjg4tgnnlvzxs2dkl1nlzm1z5ie3wqivb7i0g0hmze5jhbjlft70bhn9soh9v9d3174ijqqvar39x',
                title: 'mgbzvoja7ouhhyj19nz8bin6athkuhvw74fvtxvafdd2z5shzuzuzzix3lkyfxusv53ma5u4fl4mn0lc7rxeh526ybq0igttu5o5qjcu5vi1dr59il5g7ugr9r0ktnrgq38ekvgqjmms0j4yzt95ryf44rzo96u3zlphkoe4ui0ngz8fhup7ukm2e9mm3wjg10rie13ksbz8xg2gdp75hhnw455up7qip1e5qflowpju2xl0ioar53g8v78yqof',
                description: 'Ratione est non quas in. Vitae deleniti totam. Autem eveniet explicabo sequi molestiae aperiam ut. Fugit qui qui explicabo dolor. Est eius voluptas quos perspiciatis facere voluptatem. Id dolore qui praesentium omnis est.',
                excerpt: 'Aliquid quidem consequuntur inventore itaque sint sed non omnis esse. Non neque saepe doloremque maxime aut perferendis sunt. Et sit est similique tenetur architecto quia. Assumenda quasi assumenda ea sequi enim a saepe. Libero tempora et. Perferendis minima ipsum.',
                name: 'xlzghpy8y0s0c8ap2e6uke1qh8k7lw6emkwzwjbnnsyxzujev6atukejc5wgw4i3g8jdwnd3ntytz99qvyvy9i5niqg6mi52x6xt5y8ldz8oaolttx7wpj6zuyjx0r0pjb2z6ts6soda6q2lsdd6z0j39y7uhc8o7ygv6ehulmt2hgonppm69084rdzo40jhs4yb70298488c29ng218isicoabqcmuumhtsqm6m7dtnjt3b275io47ksnay03j',
                pathname: '0akhk6uj6xl0vkkfpz9hkkub2ojd92g331tomsz1m40za1oohdo21cb6lxotlp1kk0ogqk4qgzsa15nq9jnhahmxslihsu9g596xmxlscfrudqkxb2bn5b15ytgasigi4mt8c4lcl23fl57nkelean91r6zygwaect7xefnm4jzy4nzs5bthq7q2y151wc1ghfnxmxo65m5vq8hklvj7k7um8kpnvxmqz38qgj9e1o814yvdc183wyqpi678suce97zvuqi9lxpqyfb93w6g8x8tb8loh0k8359hu87iru6t8mjlhvt9wtr47xfhgmpctr1k0l7kf84gtafrkzrf1h4wiahg1nmqx01llunwj3mul2cdp4v3w1wvg4tbe31b54ru0czfkuiokc3ry9hqh0naiblfrfqizgi4ah2kwbh3gh509ka7capeit7snerff209y4a46nvpjxnsv56tsj9noi57kjo1dh2invjnpxlawow0jqqjtzpa6sul5vg4z3zpm482xrfqf956znrsea3uzp5h9o5dqesittzp4r167h0gavssxdqc4glh5c3ge4rwyu99dwymh24lla6czpttuizvnnwnxfb4wp71yq04q8rkn3bhdgeqj64noghlyh47e1e5rc2da5re9mbhtn9fvde6osaojmaa0ni7x2c9awejketbgt4vvg17168glk68n8ur75drulwpj1lkhin3dsxxez2fym3btpthgdjxcbujrz5keb0ystz6w2smho2r8yrl9jr42hfmrznfesianlbpuw25clhb2ilkbs27wcbpkido6rikgk6g8x4wyz5x92nx5j1gwjnkmi08ifuubafunvg3b1f13mvxi39pgfhi4smi3j2o2gqeu4dvtw6hy9x921ib7llk9jdni8hee88rdsnw56384a26bjfpyo7lvazfi9y3u1y7v1y5p4xon7md7akn97x1zgaqkddc45gfobcbkgtxkc81ultsb53jxkjtihjfa4suuk2y',
                filename: '3zk2hoayqcr12soa70dha0ljbn4i1wlull6lvncl47mws97jb0rbkqy4mcok2ea34r1wok7s45grdvdw0jgfpy8slxs47400t2hpm3cbpapqyqj6kwnwsgtlxodv03iedd16aps82y2o72tfna0dtf3flde2w9ji468t6w6pqy4rlttmkys7umqc2hawwrf7sjh6e5rx2oh4tfzwxow8yh0l92py3versgwufbwx73fa6f9ygnsc1lqjnmfp71g',
                url: 'dql6x1zkn8zxc9at4rd7nmx54pacd6h6qf8xi3tamdoybroh9sedzqgfoq7cbozx6ytw99izu3x7xrf2bj8zxrxp16n61hjvyfbx28go6ygfsdygrdrlyf5vclma609nwmiclavdmi0lgyla7sfx4xd5ks2t3bvfc0nnyjer0hxt6hvbyqz8rx61li63bmksajb57uhtp5lta1pp0teint1pcfn2l4plvrt7ztgr16r8silfqf35y5ljkn3wfbvztdmyx8no196tgl0m453ptj22wv1ur8jtlgjhbyq8g2whl5yasugtdv4f4j6tjj6i6f7f10sqi3gtvm7j6k0uofgfn0ss2u4wcx0z1atcsvo8bjy5s4zkdhtmtwnwf62vzj3fqssoo660gxxo3na77j4o6domjgi1uory13ab4kmpft4z7hcnu1jtp10ndbudsvz6n4o3lxiry2efbgepx72lh2h819k8yzcrembmylunbtbc18k5p16iuckojhdb7tlrjta5r9mskp1dcz5ce2b9rd8jytlht21tyuaf8bvlsmzg5glj1nv4cffyubp8yr3n0dfybycl9o45og1lmfwa0v0pqu2rbxh8ygc0s9kkgym9mp6ttzvnymhrgqv9kuo03vgzs27exmxmvwehhjxsxpsfjz5f2ebay9pj9leg7n6jm1lgkw5olkrttb4x3r7n4ei4fh5n4yslw4j76lgl9xwmgi45n5qohjrwtdz78rraiosqivyzmolpacc07idao1vev023d5f13i8an4pxma10dz2it7a2033nww4ac38n7sqfbi790r2m4ycmm1ob0csbc87xbiaje3i7ij4rfnbyezar5v11myvpb0wvkdr88xjw1edn6q0ap778noax4617bo4zcv4yv56jffljyv5vpmrnldtnm1f59af0ijgq2q7p4p1p52v0fwav59j0fq6t44vx2i850632pmr588yzj7lpcsmen8erfwoueoylnrpst3xjwla5pqv8',
                mime: 'dd2zksic50nyo30i2kdgro0wcb2r1ku0n3ihbr22jo7qwp00b6',
                extension: 'kmdkyl60nmoygtcirkcb79lm4dvg57pzzcoecvxhn43j4lu4nn',
                size: 3886617449,
                width: 859683,
                height: 302079,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'u8z85k44limjroig0baosixetws65r7sd53icz2yy0qk6xayrdp12v0i69a8caouudnw2dhclpfcr9ocm9wipaql5u465gfspzr8qyus4piqpi9hyhwe2ropzkpoxgvpqfumllp7cvfofnr2ugxqotn7vj88gb0p4qbrxblzw1m64t1gzsgg62fiahzbf2ufj8p8fnks0c8k1oqxly8frhfk65gmxnuyr19k5tc52cu1l7osrz3prfw977ze0rx',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'mlee3yah6aa1hw8647sp2glbnfrb42vr29cnxbldynz2p1jo2duzn9qkjxkhi3r7y753tbsznlv',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 319768,
                alt: '4ykxu6izrgg011u6qal2tw22vrwvuso5zmapgz6is3gpos22e7a6axc7ulgkxff2m53o4muo4j2nzqepbwn74z8lumq337snarrszo6rvm27wilrilxip52hjgr2v5v6bqfomfcuoxnezyvxav5ily0cwpd3qirbotsqkvi39bd2zc1m7on5n61cgyvsq08b2tnq0trcrsra3s2wvxir2n6ik87krej8wljqrbchirencu3lgpnd8lig86yeeqf3',
                title: '8ia9etvs275u4oivhh0w4ut5ih2ngt354trr0qaepdmw6a687xqikuhgskqxeherufc9mt59sy1037bv3sp3lib2qbatv16wpdb8ir2vmh1pm8v3wd8kgoo0d8g720l8np89eb96diwpyxo5o2lcj1d3zws6dht47r4bkn2ojsnede5qqle20c40o3h65rp7wmhmcbzejodx6hujl4u21vhg8eie5z5bi07fmhwo6n09s2olvq4r68k3jmbvpmt',
                description: 'Est accusamus id voluptas neque. Repellendus illum quis culpa fuga. Animi et in dignissimos quia id velit quod. Id temporibus atque est. Doloribus repellendus et quis. Impedit quod sed.',
                excerpt: 'Architecto vitae asperiores doloribus illum fugit enim omnis illo. Id nulla aut veniam placeat exercitationem sit dolor laudantium iure. Ducimus sed est enim eum porro.',
                name: 'nq6ejg9xu0crumogddlsad6brm1ge2ux6axoezm99mxcb0tscxz0fjrg9xd16cxbdhadpe2uumyxtbtkrs1p0uxuebodqu3povgvpy325hlwptjfibc1fj9s2xngvd8d5rz6qx5b6c1ecfw3h128i40l5k0dug5pbbsmem2ru42tfqhslflx5wpexfusonay3o47nbkp8w5h8kc9e27nxdg5f0uw6dbw6vhg1bz0rgjppuozbozvvbdmi60ui5x',
                pathname: 'e76mc85uckzl7qfoopssafgn4ql0fxk5dq1f57kr9uirt9rxjvmp5b8dkudwed4va0a27q4c9bbpuv5i2zcnu0geq8hbwai31igk1u7hkxww8vzfpkyc4l4zrffhow1hqri6ab1ia1viuct5usb3ipgi91sp0hgcxajbqu24miklgmmqxqq1qrz4bfacbj5w0xkxj4klalx0je6gs5pho2exx3z5k11wee8f9n01xxotbk8o2dr031zix0oi66dufpgaf05j9nc6ygw0398gji564g3o7mio2orgbeofwtmtapfs3sw0kpbm6di6l3ey619qi4quihvgi1og6a22z3fwv7r6dd0u2mrynjta9a9svwu3bk23ai289hhde9it73gvharqvzmvrp438515pgtk3rcbyslxsa8fxtocy14p8aunbyq9ex7qqp03k5xn8y6f3jptzaudbijgf6pwdv2h14hwfull0n0zcn95hf6s5i3093pype6scbp3cqyrw2klq9kzl5r6rk4hfrlgaa6byvebhfgvpf05180nti62rwt9e4frohbnp54xg4jh02n26xm9yge6dd0mupla8z9gsv3hp3pvqivesek3khz67czz4h5gsqgrkvhltqcaz1x49ws8o752qfk6s7dk9ihepfncgkv8blr5jp5m87742kvvckhxuzbffc0issxct3vftv6cn1w4veo1woo4wahjacdv2lyalt44f0iamhtvp9hm6ugdmkq3jglvkw4du144sx7wo6orxx3erv0toh3m8d8435klgktn5npbg8r2z8h3mmtfsc0x61bw19h4lqy50bvoju4wotnohcp9bnldwdzel4t21r0i07gig3phid86wv75c33x49x33lp1oen1cvpmk6med24zsj24mjvrlkyoymnbmmfwqh4cbpasl0gkmf8xauc1qbg9naug46onvjzk0ey0v7zlaq6nnittqz2w0ne3tz3n3j7kws8k12qwtad8npujxghftkqp',
                filename: 'fnj2ok2e13cmuh5eeku9mjyuynognxodfdr6hyu0xxc6yms1b06s3r5h2r8tdzfdrekl10zootvln87yh4blbsdf7vpv0isbnd1vodt0r01mw12c5ldkjfxewdprov04s9ioeujbxfnikf3ks1yiszv3s40gv60le20f9kj5hi4udm4q51q400g2qpatq9ti5lo1yto7fixtrsqx44uaik71yvqr3gg8ko4kyybnh4ckz5dkrcsb1zodr3yufmw',
                url: 'vhrn4mar5wcfffzyxesvrytn9ezizvceds63stz3cm5ixbttvgvv5atuwiuw7bpvo5o49fasuxffuorcpjfvmi3jwmxnnpa7p8ewdjm3hpryug8un8cir5x6xwqk0v0zh0z41hxxgufoojk0ldpir218n7th2srygyguwbr1twezzop3c7m2ewal7s3jmsj12kc8qjrir6pj0u6ohi63dktem70ir25emegw8nuxdy5bz0xmyudm2cvuthjguyqvlpg2hn5wlt883fplvfrwzsxyregwff03910th5ve4kaauw8nuc1szd49e793jiuc4cwmq5nc1die7euouovxymxcbl4pbizsr879nnzcmjd32aw58vhi8b47zovlbhv7tw3scfmvewp9i3v0q4wktvwfynrs5pfy0t9jy9h0epoh9obcqx24ssd4li606tv34pnx1vdd6o97is9nwmvvpg2yvoawur54687n80gtl2dg1dqe3810q71nve3ptfk6amieki23dyfq3pejyld4cxfe8ckkcrejcgp9klsm3xnce1g5gf8mh2ehgiui0muuocgunlrwof9fm450c79epyzzybj9fithvn9bcipbjj7x4ex1t01lh58zla6wbagut3jtqzlmtoff43x252qq98hol6xsyg4zlb7y7vxbmqdt3hgkfpov03gsnm1mavntabpjf5e2mzazvnhrshy0w50b0s0s6xgsmio6s4kwpzkeq6tp2qvtulmaiyrq75ri2kyajwweu9qbv27xx9ocekkd9jbw6z72is5au18vromukxshk6ze05erp90mt9nj8hkdzywobwsxxc6wx19x7p12kaczl3rxihtlc9grw7wsq4xkj06y3wwnv3be1h9tq70qmuygr4zwfzdw0yp6icgnrb6snpsgekar5lps2rgatgi7029f2sjnpj9sezldh9s69b7wdx2012sbnpt32d88rlvowx75muzpq13zuvtdugcidnzublauvf8tb74c',
                mime: 'nptpxpnbrvzuw62s68lvpquuy6cmmyfortcpbqd24dambg11bn',
                extension: 'qtnpqu6gob7e4j5ow5j08s4ejq1x5m9k9oq8terjss3qhszrum',
                size: 8623676877,
                width: 369021,
                height: 658885,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'ddkkmyunhreq7o5s6ut4qaoxvkr1j2ehbuehf7r95prpe16w0tbp6n0hzyo5bz5zumsrnv8v9xebmk29oid0wf03wxnhfpurdh5bgvxepw4k22mk8r8qvt9typjoui892w77knulv5rzgde4jtq2ppiqfqs43ye97d5b26fpax0sqaeu5myznm1uirf9lheu73bb0m7o5xd613adoa8gtj19x88pkcqad9zrv4ayme73umjilwi29byc3s06x43',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'znh9t86dhlpnek4xvqtsz8sx03nz8l99dwafiyhrdb1x70tvrencd0i91rt2b86pquxf7fdjnti',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 900537,
                alt: 'w9v06ms6nqnqkkw9eps26gui9w8o99ryv41ryyhk1ijoi1i5s2f94mo2q9pkdwwkqs3mwecscqpsuujaqhvegr45wxpe7qvot3u0olt1ry5qc3d70fuwwg4mof6afs5x77m65bg99pf70x8jevgh40a109j84mj4iei3i9pnuemplulsjvl6vfq1ub7qckvl4f8x8brhngc1wzwa3r7b3opwr7qgbj3b4owir1id2f9xlzq5hfwndd0o50h3fjh',
                title: 'xgtysq176fvclmwy6xgnd6g18ykf4mkokbd55iama02bk580yq0k6c1nlt1g9rcbp8p4e3dm87zks3232q0xmtlzpxbxvry3qom7kg3cm1axp28eia1jbhoh2070sa0sauf4j4auxd5hwzujug2rkzfgkp5xk4rbco9f08gwsq9pjax5vqru9wdo7hutww817nab0bfuve1y7uk3s27po4k0u7spcz9ndbqfwolm731yyj4d9kz7tsqa906qga9n',
                description: 'Ipsam voluptatem et eos laborum facere aut iste. Est sed reprehenderit rerum commodi pariatur. Mollitia distinctio eaque fuga porro molestias nihil placeat.',
                excerpt: 'Quis qui vel. Temporibus dicta natus. Necessitatibus nobis voluptates. Aut dolorem aut exercitationem ipsam tempore repellendus aut illo. Quos facere iure et. Quae numquam eum non eaque fuga quae quia in.',
                name: 'k021jqbothhdhljo908bo0awatvxcftm97cotepq74mxcylo2wk5fgs43mmk4cyi7qiakp5yorzoz9h7jefz9tll0qhi6944fkpw0xyic2agg2z0r8hxz4nmo53yphz38ykzmbxgattgr5spd25frn1t0w6tqqxfad68jl4db5ks2eux3ga8v8inhje3s9xfmk01tzprrjnj1oooo47cxhef8ypb6z5vn4oucqde1cjx3o5q0bb2hfw806amis9',
                pathname: 'fg7yuusrh6x983ydppia6lrqqr8vkkgg8eg5p4odfwrlpf1eshg96a690890ju84eve11lpa4radwqs880etokx3wbidabvxie5qf98kkfkkv8a68g6b92mpavet4rwy7ti2k0gjsqcjgn6jnt3jm2d3q0rvbiwimxqn4k24kb2drym2pwol2azmx80zvn5q4tspwu89v0daqmpe71m5ej0gna3j6yndechubhkbdajowqr02lz1lnqn8lex5h31aus8zyenafyc3s77mi9q5rrhxtizjixxljvmsf9855h5x3jixd37vubr7e4fbcz9pb4nzcy31nisr6gzsplsvt3bahd4nrj9r28aznmqgvp5vejfb57fmzyqz3gt484o9kafj55fuq9pn3mwj18ibj65zjf8l2z6xapc3t3e5t76ln62fcywhilvaj2vmquzhu03y309yq9ir1jouur23p909bd7v6821qa38qxws6d4yqrpxo26hwicsydmmupv7q5vkwek0o9s54o3w1je9ld6mt3axeoqocytgt5beiwttoxyojxkh0lgosmwaygyht77og9d43hlrh6zp71f07x0yvtd0s14pcox94ccey9xwc3n66c16jdbn9wbqk2pyujofqvheaubq92vnoo4veia891zy4ctvvx0dh65vl0zcy875rabcxn0znl4xtnod8z6wgfvuxxmxvdhgi2k4j3sccr3gmyi7wyu1gi67qkto9w6uime19r3z6au0o7rzs8s7ev3if2b9lxsbho66m0a9x679c6dg2h17o3lrvigqchhv7m15r3ns0c8748l0uz6cze0wlyd68qph8qfhrv6133oyrtnllk72763j4um7dvwp2qj064vncovr9cbicugqe99xy89dh18xfpazv0y1ebow7w8ftkvx57liqk78mq3e6j5s435tlvdw225dfxe8aozwpfahbtf4f75h4zey6c7pdwah45g5tfw0s2xc7gd0mge04tila98hh96',
                filename: 'yxrbwvp7t1la2zlou47v1t1rjlerm9i9tgh6fmvrjz4w0rbuy18yj9kqehsxrzcyz00p43stcr5us00aghour7qsganwm66ta3go0ifk9ip3tooiwqhz6stprrei5m40dykf53zs5rh3jp9h5spsh3xlm6gd6p2xidx6taybqegwzkl3ki3tljsen7loxhudm1c27t2u6lxz2phrh3lnd2baz0qcqywu9i2l9sciplrvboc251f37fsll2xmuwm',
                url: 'ce0smkzhe9cfilchfof0ktjzqdwj54mlywz7oa7jfrkstappcc8fwctdrx3a4qtdeiorhn5d4mer76xvdh7qgtqvnmmftnar3uekd59uy0ts9epdqbp3pe7mdsp8nbsdthzhoo8n7savxr960eh8j1hudnxbqv8187yfpipldsd9hmpzmpgr0xksor1xob3m11fdvcry4ope44tumucezl0cakv17u4eum5uzt6itfk160yqtnbe553i88f125pnhe4lok6lk0vm3w8m09nay3crjtbui6vpc27qf44qalx5osdw9qnjurfgmrwz0i0dchxch83oba0dqyohsv00y9kka3k6knxpca86f1csrayg6yzi5tcy2roii28h5jb2f54bc9fxlzn3m9pim5fstqp3umh52z2sux65lkn8yj2limqnqh9whith5tooi9zg3vd8bdjg5totnttvnln4vtl8cb29ffi6ocowx99x3yucbyfr25em6v6ip23gso6rpozxvyt000h2fi04dj238shd78tqlft7eun8y2u8bcewp8d9r6dffx91b7fcfrxmmmw924yosxu8bdw4ecs2snz0ll5l5895jfbcf7gps64fr0y0kki0j32k0wwkendxw8dcd1zttthep5ai6rudrrfyj6i0a3b4zc0pr1utdz4s359s0ivomz0tsv6uytdj9n8g7xsht24fr8oqt2exicn7oureugk3tt7albi6q5hvvgl99mdfh38jlldw9vvqljohz91umw320l9ejc4ix9zqt6ae1h5me2mcxz3ai3a6w03v0eikz75ltyaoz2w5noxydy3civbgpy7qn10sgqwkr574m9orqb7d3fk1auslxgc92h1u0552tsbhk3sfkgam8p0c1ytbs8r392p4ngsrd0xo3sfpk3fkc3u0vcq8pnhq0pmjc4cy6bkfdq5szox16059wu6d30mvoibwh716pdnl8euctjyst12xefq1pukjmqx7v1tyj040ye3p',
                mime: 'mnlv4euerk4vr0pd5tpycyuh06v2m2j8mdc2pgoskd5zvgavry',
                extension: 'r1rw4c1blea7bynnj97cpy26k3a5muig3njyqs4nd95we7qxfj',
                size: 1510203846,
                width: 448549,
                height: 846075,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'npcjkn4gozyjamfkflqdrbzqdjhh5kz4vzzoaklsxrpnoroh2uwb8buwirtc95xeg9jrcxlf48yjjrnkv9y0ikv624obhnz9fo52wxt14lwcfg7wm8tr0s2yqhr13s6odywc0xcjye3kwduiwi6hrj3wgg6l6xqr0262udnuzm7ms70oua31f08lfr1rjvmzvjc6024vd3axzkrqxvup4gb4ezwk7viipqfjbec3sbrwx0829w5jxmx2hw3pasd',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'k0vnusmbfclyw9yp6z35mcuyxqtw8n4bha31imw2i0xqbabi21r7qjrgcskgm7q2b3nsnwkj131',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 989869,
                alt: 'psy3p0ouderhxblqecqq7wcfp5oopvv2575hm638sf1ilrz9w33wkw5ygrepv9h5j0obc6xm690v5cvpquyfe7lwm7xohb9k0h9kxkup3dvru7o1n6k7g393hr4bbbfft70z6uyy7kwwbkwmq7hte1v3o6oymo906ec174bvz3w18p8kbrv6v5zcxerlvc0na0srq0v9g5o6ejl4y43pl09t394m1we0epx49d5ix9mky20oty3o2eupsjcncgt',
                title: 'tem8mwwwwb6pb8z0jvg76dyu24y85lv6gi2000otsjnh4qclpfm9lzw6tf8q0n73jlp4uy5k2jh88k3uyn6ut184apuyhlct10uxzf0bwjnthumxs377byd0hlgnmk2tmxaj52cngc7z9t90s1qk7se6j3e3zghjbeqoi3bncsk9siv8j00486x2vpgqcelb8pvjkvqji83osw9dyewabvgaf3si5ks6tvm63u7znd7x2fhvd14xfgkpkmxwem4',
                description: 'Quasi voluptas commodi non ipsa neque alias laboriosam quia. Neque asperiores consectetur accusantium quia est omnis quia iste. Voluptas aut rerum est suscipit cupiditate laudantium nulla alias soluta.',
                excerpt: 'Mollitia adipisci iure et quidem qui animi eos et. Necessitatibus aliquam perspiciatis. Ab aut tempora earum perspiciatis provident.',
                name: '1htwsdy4sghsk8yciijntrjm6201465kizizjrqgjiw1mfvagvem8ndk1m1630w7qvjv5cqbxmdntdalco1ei2a7saxhpop4rnslxhosb3ta404s4qlh2tqg5mn0jnkgksu8g6hhngoc5pgcki3d1te2ry3wvqg1kevdu4sn00ro1tzi2nlp96la836yhip3pdw2m2xudhkjlf9a0kipa1se3f9t6u796j18jq3me2e9f02bh929jewburccx0g3',
                pathname: '4bkzs5zrq0x3mwelq50y7ii5vpygqspfkkmgrswrd6z1e4o8i1cbv61tp4qc4lveyag5vmnbnk9rz7ruen2tmrxwnfkowgsd48xxtta7u7krjoiso86188lcejawd58wtf1hq0iosiewzl7rllaflzdufbuhtub9exgm0mxtzejzsmb51x3fs5rewodmxcqo2zi65brynn7lyz8qscx472g8lqt0tqrnpw0zv4moq7w52z2ohbbgth8g5wcvzr9i89vd2tr6tcly7xwn61x8inmqx3sm5ini341rk7ly17r0wfevhe7cwu4tjeo8xi0s43kc33j10b0424spgfuggtd5u9g7ezmvwoguokghxd8g8znxu1gqq93xuhswuv3sx8ylranfio7wh9o53al8nishtp8elg6vtpunw4b7f498vdi1d2j9p2px4zlcl98k3iavs69tnfuaco9qnapp8dtepyi2szj8a7wsfht0nzbkse2k51qvyqdih02ztl28rcgvg9asnbfs7df7rprecimvb0e2mxkac6gswk2kw0pu6ipptpgl2sp91p5m0uai66fc110f2a1fjyml89cu50czkjww52vuzurasstpotclzb0n4vmi9sqc26gegn32qs0turax7h2kv2kypt4lacyrs0508zpm8g7snr0aonw2hyt6rd3y6kov599jg5bwu5sej1py7dr7ehj1ccwvls2gllnf1pqfbo2l8ik6ywcxj548xg2o7uselpnbljd39etpkz8ep5iy9ej158tmgnkw90fenc5z6pnrat7brwm1tfeui25odezh3abt6ay8nlpvchvkggr8h1p3wnroetj8305foyt0a686ibk1zakdueixrug91k4y1bqg74vbmbajnmdv5gspnjlx62iz48mb9u1pme9v7ra1f1bpq444lmgel7314mr55hw80l5hc1fung3utstjqv9ctjdk95n7ldsqpp59sxueonj9347gq6z6x5oil0i3ivf280nb',
                filename: 'p3ltrhn0c2yzcw4gnf6io914gkqt84ad2rw7pfjqfoeyi0sbijsjin7fnj49wpopn4j62xc686i1phw5a802e767ibics2x2p1nuya2wkxrn1hh0n7c56u2g3eleip8u6kbakww3phdmz08p26k8cu2y8jf2mhf9z536e5f7r4rvuu64e2ytf6p1dsqb9f5c68putbklyut053oncxxnn5gyy0cnn53pbaokpdfptm3e027zlgsxiea8l7m3mys',
                url: 'x3pyfni30tmsuhi1vzwsnz9adbjd5fqac58d25sxfvcw9lrsqj5m4z3ei3gksvr35sdlwey12uhn6l3z0muhis8lx5gglcnmqa13e6doq459i2g5a8l9226y9fmpq2pccmlwb5lsakr9jzr3hu7exxs873c46x3b9zer8i6ncoxos8x5x2o78ynve8p4ka2dvzwe9ihjcqeh0xj31vyffljxxm0ovwgju6umgqoovmr7ywk7n0a2rtnqsd4zy8oevsi5toz3242fjjhx3dhox7k4gaswb5l2w83rizf2evxi8tydz8dkza98x59j5n0b8hbruo0vdqh2lzjnv0wytuy72o63lifhrwif7h4arnzge5b8okmbis12fm4e8dp8olslrd27mwb6ugpvgfia77xjk1at1v6lx5pxf52l9sq0dwoejpugt5yy6t365h120va2owjlz7gjgnofdy0fmyzlfv85mnw7slo2p7kx3he1pwyxeslf42u16mrdb7zfgm2wc05vkbukwj5bwlil631l69vup3eo80bekaor0smqrbv30w4zgptqbrjm2ferlediltvohqb4hwvbwzvwz315q62r2c32pqvt4zn4e02glf6uwoaqnp4lg8bx5qsq2k49ul1e14niz7v8xokclcui3n26xcnzds2xagyr2znbaxg1pwdf5t8q5unp1kfv5y67xax90ms2uggtmuin8s8wqpjz9ie0rl1r28v3939he1rkdzw1ecutjyh5hzdtiolmet65jj1c2f99x2ismky30trbuzlddveuhzfft9j6jpidtdmwtfdfh3jgd49fjvqdlejyzbn36kpn88k29e4cfyo5xb6k3o3xykc1mgnthx27yjpcvnx3iwtic9blaj281wt2y2ciqbcj2l3ylypoegn1yr798q344gxcgr9yr347vxbnvos9pzxtkhm8q39vrna7pto2xkcki3w6ud29x63uwqrvy7qhs822gf815wycfpx3ypngmfd6h973',
                mime: 'i7zcs9cfph5yxtwq3ubnph3eexbrdj10f2a9e504ss6eyv947u',
                extension: 'v6ukydv9ungj6fcu2l2msazxel8ntn7co70g6k8jsletxe67ol',
                size: 7453930924,
                width: 958472,
                height: 576311,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '497s6fh778yh5tjwh09gzrw1kcx42vso8bie0d9i0g6kll6o34gn9j12b34bgnglx51io7q28xtdx773wdsfaenxzik5ow3od56vxd5xuf0gixvnlgemhdmk9zo6k1m079ks6kcsme2wdpqslg3s24skazeev3ricphv7bolzsj0rkutyashwwpgz3rd08d03qq5q4sdmwwtopi77xneuubpk3zy2sw00ka1508e9596ihxp6jzy4le5kqgm3dx',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'kufoxmvngdnc0pdfknbxgaxa96gze7fdu2dey5een4s4ffwi8a5p0vkbwuknc9xk4grvkzfl8b1',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 550805,
                alt: '4e483xq2fzzexbw6oggxr2d6v8wys9pzyzholve9qjhz5vye0jdcixxlmfejttmuepdm8y1txix7ewme0p95p9yca654t1jlb3q18xn7hjcuir5fqr7i8ijg2aprg31ea0ac479uje9am8g8x4faw1z55plvsevmqzk8enrh0jbt5lbda6c5dauksu6e7pi3sveroybj7ebxw3sqblekrf0cnogq962tkzxfdlxpgl6a08x85ccnoi2nykk4bvq',
                title: '7xmrlajc7p60q9mzir9ejqmjiao67binptq28fdfoddm1xcdpdc11bpwd788yd49st47leoqwu4wex7xtgcxgukhlnpdsfxprmkcqmupwi6n29kehac5sh9jhrjr3w9xldgiaykd0obpyzi7odyi2exf99s7oya1jiojv7w6pud51qfxboeo83abu8c0nhz23cgarspmjabvxal4fxi4sfhkrm6icsrn3vxa62t1eciqi36g3i104yxnf6pt9sr',
                description: 'Occaecati sed non vitae. Voluptates voluptatem eos magni et nihil quos ut ut recusandae. Non repudiandae rerum sit provident et voluptatem laboriosam tempore. Ut tempore exercitationem. Nobis quia incidunt id inventore. Voluptatibus earum eaque eos sequi laudantium vero.',
                excerpt: 'Tempore quasi quasi impedit iusto sit non qui. Sunt ut dolorum beatae. Asperiores id nostrum incidunt iste officiis porro dolorem. Minus quod voluptatem numquam voluptatibus dicta non consequatur est quam. Quod porro esse. Deserunt assumenda et dolorum explicabo recusandae iusto sit blanditiis.',
                name: '8cdoue6yigvplmtj2mlynbgszal5hczokp3b0y0br46nh62brn727a4qr5vuf5bzaaxhttlygthf0b8y1fu7ixl7pp2s1v1gaoq2j4fed6eyf7pmvfn49md09b2n2q4vw3ocs2hiqpgda772odaaw9x3gnwrr467iwxoxyp9dkcv7agk6rsqufkwb0wg8m4m29yy1muvuw83sdsqz0910g345bq308ncul8xwgkig0yrdr2bakvjqj7fia3wcc3',
                pathname: 'ju8yo7t70qybz8mjdl4xe6uo5evy16ni51q6gh2syeqjezkw3iovj0yv6a4uwsjxpj9o2ugyxlf601nnxfk5gzgz75mf70rg7ur83nty6ob1sahs0dnj0xr6ei48kwch9btkot0v2jg09jnwhkrqtrlttyutu9qxabnz28wku60i0v20oc5tvrt0jhbpist2j2uq9t8haef5t2ktdr3stwli5udmvlh48v3yaglxr2ua705swfkcgn43on1mh9td5a0sjrqfpkh6153al80fy7qricfka9rtj39q0lak1yfznldzjc4pjyxt5rx6lwj3c6p8ydfdbn82p7xxj7d7hqwp44rjxm33q5s7hkrratplgayrlkn3nkh5qxxhgi1nfy0safbizpz3i4751zskk3iff4hq2rs9p2twsvjzzxdhzif2dbd4a3xxsn5majyi2p8ms7bcyjao2iiq9uqvbpz46ncpi8mfb1gmcajvrgn9htbkfigokocokm1upoy6sidznushlccyqamfiirxm974lk4dr6ytq0bvjtdo3ro6ohegaf8qxlfw99l0lwx49f11mgexuh4gt2yw5aiodbgqayuiz1hd3dvzicy4e9igupj8tjfkf11x99dtq2f0wrb206jiemsolhysc7aj4eyejvnklsjti6ojge4vzzd8t34wzl0qbs891p761tb8mhpj78o9ljzdou8iwrbdlug3iuqo3aqyi9tbrggadevat78lg9npixzk42ao6rcdhbfnqqk0k9am97x1bz2u3h6ix4xg081mo6ytrrwzp9t24dyqedqk3p63prxtei6eoynwu0ac3x9ny0ehg1y14rwgbad7z8a7h0b4tu75izt2rjrqjtgtwfcobz4wk1vk0lfyrav7nfuytnkl2ez1nqt79uxuec5wx792tjq3dmjiqztnkmd379sux57iqh60md909qlj6sou3phlawbz8v5dvptnh9evof9eaofpqz1vlxp22f2qzia9h06gh69v9',
                filename: '39ghqzbjhgvh2puti8jrykmj7bga5tlfgtex6h9sjpewqt5440ysa11zd7i081odimws9c1z6543c14inkqt3y3de1ezodk78d2rjgvotmtrdbctths2nlwoi51125n2a22ep78irkyeif2ug18ib998p6o8d3gi27u5ugvzitfkblhqm49uesmbelfo3d7t3fro1kou3a8vzk9tuo4lwm8smk8w2e4tiyvho0vp2s0w8z2cnsj6igj9cjfnp9v',
                url: 'lwv2kswrec5214l9wlhbvvnifemj88l0p9j2v4bzeqi5ysf42mx61fex1puayy97v3wmo0n19i7fcxzy9nh4thfrmacaeojt8dpl9ghy3q2kcol2xhshw89xjtx67onn5ywbejrgecd5nworujrgsztqifgbv8zqpuy0k3h45tnhhk6oejg0osib64if2sd83iezzezb4ag37r6t3jwsf5a9appflu2tly30wzyesaxdzcxv4wl9zv1u4yhxxs2x44kb6m4jqz6qwg5d1i603i8qoyq9cax9k3na68awc1vv0w0b9qq6c3eqraochagb5fz9lu3ni6bz91wclj82vdicoq9shv3mu74yfoxafzfs5jrviucao0y2uw0zuht8w0sr1jb84trin1g8j95bdx97benv1mfeym3dcsiq6wso2otyndmaa4lgzvy6718po438b1dpx6wmfiza4b1fey6qsp2eyei5t79qzuh7ggek0orrg2a0r1esej16ne2hgcyeqq62lf5oha2gvayrtdpbmf4vlkktfl3ffe056amtzrzlx1lpoz60xp88fx65ygwwzip45qlu7ftsa045sa2urcpdwb0wka7aokhn1pjn7893jhasy5at5s3s13sb8hdt3uwt90b2sfhd5bt8l24h9n750zg3k0tq5or0eva4xqo4074pgbybyek0n59wkp811j1uy83qlzc02wb037ip83jehtmqmwb4gk9cqn00yo8bvosdn1nr87rkflg9659q76x3dkmu33sd0pjfnv5e3y1jn2c9gdjpbzal6g9n8ee8nvyx0p3jc3kfpdaw2qhcoypasf7xjqt22v6utaegwo2wfe3tfpwjy3ty3uov5ds6vz52573xje41snqvq550skm8ikvrpec7i68u1ovy5df87rwwoyigljgdfsei0p2vb3yiy5jej3jws5tnk8w7q3mlzh8hqxxk8r9awzxajfy5odwhk558uxk4doco7nyhujxebg6iakc8prza',
                mime: 'k5qv4l4dyhb1vxb4wueppuwmrmwq3fwdln32fs53xd22x5vnda',
                extension: 'uil5d61qzsm4qq4lhxmmgvgq4n0xhmax599r7q4yvxreuex4rt',
                size: 7035003194,
                width: 815055,
                height: 903274,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'o93gfajs65zuqaaxvvncjk6isx46m2neposyc5f17q6cf1ws1hvy1vtwby1dptd05ba8jas53qvrdcr4cf0cvgsxgutaca864u4cfzn0d8goktjd7imki17e1boud2ieluu6qpxskykpn09810yyysdyemwl6j7dm98pv0brptvbvwuwno7l8mejeobbnsmcowdu6ghhqwhybh4rojjnbip3vue2cyf7126yp1ojezvxsm9jwpv4vpxvncbpt7t',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '50fa3pm8qsk6qkdihtbb2hzfwnoam6cooim53dbgerosjwmlwdgfskxq4mmhkznkgq75m8z9xf0',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 187583,
                alt: '1ur5dj5wa1w7ojen51n9myyd59hzskrp4kc6g9moql2rj3po7hnoq1x61ugoxm3276zm1l8ympkhvstmqb8r7jdkuraepnz3vwr60i8izrcqvvd355xe0yv1kbqnrvm5w3wdnag1cr3wtpkrqc3jtzoyec0z31pcyiqpuujzzbghox4wobdvvhdf5tk45nqdh52v6afh43uqp771sdb5uakxkiz668uxrcim9udu0fk2c268ehk31zy01nv57c8',
                title: '6i1kqr3ngb45f4mk3vjymkiiot8o41jn9k29zy70csrixabdl1skg9pubtt5nlav1xogy6rawrngvsabuxl1xqfdba479h7sg14ke6v1i9c3hf9kv92j50j2tuilcek63flimrko24pbjojzhuykl7vn4ak7sc83xubwr1s7zpr07m5rapb1ae4cq498w3107j02ev53aa24higzgnlc4hwxqsfr8408qp78jln06ikoiivlyg52s2lamto9e42',
                description: 'Consequatur consequuntur adipisci ratione omnis. Dolores et et aperiam quam quas et perspiciatis. Rem et rerum assumenda voluptas quos. Necessitatibus ea exercitationem ad. Mollitia et suscipit laudantium aut. Et nam quia rem autem ad autem occaecati.',
                excerpt: 'Magnam rerum quos molestiae eum sint fugiat. Reiciendis fugit vel quia repellendus. Temporibus possimus qui quia. Qui officia architecto. Nostrum amet sit minus.',
                name: 'g4igciu0f4ny3b29nxuvnzat42hl6i06peirvby1bhcvp0i0qrl1plk08sbzm33tzzf97bouo1ay4nfehktysemx96qmkvx6guuxb3utya51neumjnenuewrlfuuto90bz54sowex0qt3rr618lsdi5qx44aorrimoq67oe5drmdb9frq9x0bd2vah4phvxwhvhj32mnr78zspo5av4hw6pc36i5o3kn72ddi117kjvem78g7jkldd2yffvbslj',
                pathname: 'tfczj44u8rbo5lafjxawf86htif5hd537x0qxr4jwq58b6ziincu292ivmorvwv01m69vknp11sgga6oxweplgk4fz1kvu1j8fvbrhk8dx0s6s08np9v3fhpt5aj0iifkiu0ikl2dgq8myuwuyj7mftomz5ibt7znwsrnn42e8y9h2iywbxxxvgopevi724nxq0d0piilc51yq61esxl1eqnx7ls7cc6dylbrwznac8ytc51rc2lx160ivzr5ox5u3z0li27917f0sua9ss6hybxtpfxb8p17nakhvf3dj1zvkigzt7exuzbw8ixd93nhihf68s1nvcnl77oixbzg39u4z7gws5rg7ko01locerzapdmqmlbrcv80v9djvbm1fq1o85orww6zf27vbc09h8hq1v8wf08p0yufg8c9b8yawed7hjmv587zkmkjng5jvgj03kumrqd7gra5t817gk3ybq470qdvh3hl6sqmugtjlaf74l3rswyyhi7cttyw2flc4dyjiyn3dcvoth1ocvsp44kbziueqjnyua4eociq12ounb9uc1feix29ttxshnrxaemeznyy62htd993l259to43olo7rw9wmcanlz90c18j2r2r7vovsldkbilgdmwpedk0hx49850i9y5qnfzu27uc76y8lihru0weaq11m6sny2rem8gi5l6xz7zsv53ov8ijucy522xxfkr5qj4s1gehb2eus2j5lmn5qmniy43mzh91jctcw5men9xzob0pj4j130wpnjy136p7ck9id9lu89f57tyql865x10cge2p6729k1570ir2d802e1s0l6vnbj9qlovj0bsp94ytf4b1m3c6rdtah4tchenpntvbbszjnddj7bjxrxkrmlyophi2bfew71rzj06kup6zbzsv1t8xnitcune1r8k2czqxxb7v3h7bfebewyr92in5y4tu54k2mn2mnrdk3szxkkl0lxs0o0bjhvdx4h2wjucj9653r995nv5we5o',
                filename: 'dfjtpbm50xcchp4q0giw4x7czm0lqx5zbbbnc27m4f2tem4lsw21zvpjjlmw8ud3kmecpxzs69c9xyt8rn5f6r660skzjlh0l5bthqzuq902u8nsycsrepp03iaggetv1ahpiyt04yltsfc0nncpfw85zq3izfja7dpbjpwbhnehnoj8y7tqkoxd2o3s8h5iztfbobdldkhggk3bpff2r5so3ot9qwv8hw5u5n6udjgnex353ole5cw53gs94cuv',
                url: 'xzm0xifpahkdbr8qq7cfrs5rnxlizup35l1th5uw53pm9luzysxlb2srrj4vmhu8zd9xhkrr5601n2mlhpzpszltf3iul3syzo4h0oz68dtje1x1p346kz0mzja61upc0h7bbblg0elk3ptrzdywdgq1vut8ep2785sc5cc2odvdl6fz71aluleboolzi2yoxqyzdwshhjtfbktfpovfgj4rzc7skyn1uhjjh2w1g705mihf4xmqnccnlrtqetn71fp3p40bavjmrmx0tubu879grt9wvwesn4fhz1m7mml8vvmtwq7ycmppm88pt9yj07fqr03rqeuv55kndlsi39cky01zgusod3nnafutcrlp0o7pwg1mvun1eusfdtgecvz9g4192cqecqtvdg1lqcpmcypz5yoejiqhpk4e9vgb6ijmv07bm4zi3p8kiou47dw4k4n86qc3r15u717jl9cm5h8prm5235z0fzukg6dc7fbllvthhmr9yx7cqv6menc0wj65eruloho52wt1pbrabrodb77hes7d4diy30fkw745hx5s7htvr7xrfu7p6pgtqsov0m9vwn8z5t9djb0emuucy52u1c3q7un1rsxu6l2v8anh9j0p9dkxaniwomfayp0arp52680389tr6gu7e5c4wfzxla29if5t4505wycwyaw2l559y8pvikyishn7aqd1tqkh04mhb9ibdqqq79fxcovx0xnxrhajhoiaf2l87yu0b3k4yrw0d489sffqbvaid4owwhf0tv5pdoumhtlaiwochvbq3av7lclxr4ei02xt188n0fb3454oz07bat6zn8wubb5tmpzisx0tp0h1xihxuuout6whtflizhu6kt7e85hxzgg1oga99499k9tydtrodv9zllw0emkr9uo8vxawx1cqtrdkwwgvwjc5w3qewquqk25jnk55z337dhxgqc8rhm1y7kk0lqbtarvy3ks1xebnix7n3x5gqqrojr7oawz7rtwdoj1q',
                mime: 'b2xtwshkorat8fw0i97h3yeg2zpgdrmp4juxgi58po0820e5jt',
                extension: 'xcczdo6q1dj2idd3xojf9r545ux8aftuf3rnvackkmid3vndq1',
                size: 3423070846,
                width: 833813,
                height: 913853,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '4v5z0snrw26q6hsy2er2l04mqanyonkyowixk10hdk14dcln7jj2ig565dd3a423ago175ffqlw26i12a6y54tqy2h2b6dp8m5kcrg6tsi9xpbuzgh05ehcbgarxmbstr8r3707qx21bnv1snwt5umja89shh6mpoqra8b3up2rl5mgr8oc0lsgpd6f5r6a9jx0qq480bqhvnexktk2cueqg1ldtpa6zj8ti5h3dkq6hor1yz1qzgp9x5bb053f',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'k3037gmdj5oxq36nd2aeo1z84jfql0wchkkm1is5xjs2kqt44bm3tv2j1661s14yklw4wwp6x66',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 507725,
                alt: '89nwfonilj1z9zwpjvgdscckbyhkv767txev1wl1h2ce6jzn5f9n9k0cewzvvm7zgjd2wq2z7gzfe939n1zte8peail2k9g03rkivni7a1fzmonm33zi7weq96pyixj63zlr2kxloez2u4x1q4op10sx7p286ujr3ps75ffzafwf6ywv2yubd9fbcgq1q12ym198td1nrkwfvprcsd5e6sm40p7ejjgpq2x0ce9hd0dk6y6r4u8r936q52cj3jb',
                title: 'ly6grdokfs38z5d3ut1m4h0nx6e54l7e3bcodwwjq7tmw1eeibrdjn778tcydgse89st0xqmp7wzblv1awto0jnpzshtl215xf9u8gwr05038g9bl1kcd5zt24byzgjcq02bndui16s2aq3q8iw8m8fgdm006yj1z1dejr0j26ys6wjeigp19l1oj77x4euifncqdalsfffrzd8bs73ry6ei49pqa0j41ntz1lw2nrjz7hiwsn6vd4ptm4vlrj1',
                description: 'Officia vel ipsum ea ut porro. Tempora et id cupiditate qui ut qui sit quibusdam qui. Incidunt aut rerum. Eaque reprehenderit ratione sit qui ullam aliquam iste nisi neque.',
                excerpt: 'Sed libero nulla ratione laboriosam necessitatibus qui. Perspiciatis debitis mollitia voluptatem et tempore totam tempora aspernatur vel. Et excepturi nostrum aliquid sint iusto incidunt accusantium. Rerum perspiciatis fugit error non.',
                name: '1vj6u2u2bzdaytfovz79r7ba8rqcvde7w6mjcnghbbr523wc8j6aosixqo2puw421n5acqg4jvsx7c9pcz86uv793h3pu3npau27903bgohwgng3iewrnauhqruhcrhjfetum40t8wcgz4drjuqeybccot93ijikf4rao1ev13cxi7bonharbdebn8xs0ll38pb1a0orpn04xmepb9pptpsltwn6yw1557hlxd8fl0m94892dmjm4ntizcf6j1x',
                pathname: '2ky936negwz11i99qkah309yrlnayyhlxmp592c9bjrtqvwb5z9900vzq1khti6mynpil0e2cayxx2pfy75j2xgbnscsg5iwl8ncsp9j6v4g6mul99tfzswdsok6ivwjdbfky5popddjn435it0ajr610ru04ahm32li40uullg0nalfll4dwsivkcq2qn4rynp74rafw24mz4mczqwc3nduvrk2pk7c478t2euyhew1ftgxz90fyuignq7mzdhloze3jna9vvgu3e6yfhii9qlr2mdulfp4duhy2n61s7s7aacetvzmu03gn51va0rbfybp26hwdwwgom2qi2n03iulw986ynxx975qz10kumj6br78uovvkpe76tbkw827vpt94ujitz73qnkz9fgb0agpt2ep3hn6cgcqyd8jupu3thwgbiwv68ev6sckinmocz0z4iivkiwrjtgrgt54tb42fkhy7l9tg8gf4b8lrvvbqsagoie4dzh33hg727exql2oer6viaastrc4ywfnj4wjgl2p74qay9ihms8eyjf2cc9gua7yn48kxbz19yqgcgyew73mprfju2kj5ab0thg7au96mn05mxcn0whxcvnvzas0c3w93qa23jara9f6m4jmbubw9zwbhd10ftpht8nlzth14qm7uqe1drs2pbrxo13cj8maf7035h0twcc2r8yn0ym30mxp9q0pb597aftm3cbnwnxevpecw90a143agsd2mgov3i5x5qbyiopj34b6p6mvgc9iiqondn799nfd2aef0py7uh6vzzclw80jewyspjx7cxss097t9i5t30qw2gebe0nsfa9oau6qiabekz5mymo1qavv3ilm46yqwcb2iv020z7p3xntso6pnxca641rmv60stmpxu6v95kwx7yzu3gjswqi52oog8k3avmqkkiuts4qs51l1s40m1bt2f23o9c41toys9pcj50ik7yli3s0joi3czqjk2c9l3dfvryaff3xrlit15h0',
                filename: 'cslk1miqpgcnx5go0tfb750mlvq1jbz70qboubw91243q99h6n0n43ifbnxede1qxykblacaakvsk7ar5occj3wd36zgughb8v3re7qt0w1um80p0j611bjcj1fb6i3ykesz2dnpys0sdvm389g8u2p7rin8ly0nwe2398fpri1zauupf2kd64voqatl3al3qni8k3i5az7rk619vmiiklxr2of8vqrhy33fcw3cm81uta7aqybkf1y6xlqboi1',
                url: 'kdfe942i61a606x3onsx8e8spvd31pmlyczw705pivrnr1nzke20jai6kuzb2kbcex8eqh25bphcihsjjfdc4dvkwcexqjpmju6xuikkyqp21lk48wkd19nqbsx96wrm4nezhpitenrd2pegw4ofqc64gwf5nk3mxqtqj7b9km19vn18h0ssaq18zp8pfg4iau9woeq202hn791tb0jrrs41mt7gj2n7x5lyoilbirl29jl7wd9i3hwrrvq4bplzly44nvqm4y81638oiw1vjljeu29ns27krak2n9xdtwcfrdghlc61vt58e8r070flhrd3g3mwg6gz3xpnx4hij27rz0t0fl8zjl9nnu9lz59mdxifyuf02uqpxrhyk7zpotz4c9w8fr8qy4c5q6fpbnkfcomrec2jf1a3vqrbjbgjlb2qo4szau6wlgr55y2sb9i06jqjnjebpzdnmgygt9e09ttljhd7970e4sydy2chkmfmylmj4rrvn6fsuth091xmodcgkn14v8q3thzofqgd9maxyi66fzth0cfe672bhed9sfny0jzv80zfw6ciktpnu3gtpcst88powo9awdqn6t84zs3844hwnr8xg1zglgl17czr3gglwt9z0y0g02xb2gha5y2l8xq4axizwph23pcszycof6c0t9eycnq33lp2ie418ry1ogjexladm3209nmb44ntjjbjlefsxmth0pm0iejymjw194zwfxrmtgoxqbiix504lihhp4zjo05npl94z2k5hr4tt1gbwgxidqrbg89jicad219lh4l5hta71s722pcfquwcqf903ah9mhkwcsqg1y3b45x4b029w1c9w4nurhd01hd5j1b4ljqum57ls3cowrtw5m06dtbgditb2whj9th9236wc3j1owgt4lw25mzv0d8qxekgcala6vvqclofnxr22nxhqogrp4jqsj6fox5895ixdo92xc7tu9brg1znzkdpisbrxai5jl3o5egof2vwclafa',
                mime: 'okr4ek1hs2zpnpx9c0c7u8wq77d1cufbiv8l83zkcsap72rl5k',
                extension: 'rukshn9jw9udue4xvfey5vhpsm9rmjp9w2uhqurotpo5gmmhna',
                size: 6099145435,
                width: 165132,
                height: 904378,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '1vnrppwis15e1ez4ohq7wv82nnc8iiotzhbn6bdr0nsrhoc3cigtvlvzf29nece3jsvrs4n760zibtlvhj5bei3r8fnd5pxlnvhufxfsotvdip9ut9f1iek8dbxbmpip0py0hwatdbc2a0eoqwz0rfxwmdemw3fwoa7y3njxzma5qohrig300tf1dqg3y2yt9j1iv7jfhbphkmmate1eywr2j8x1xcho2o5luzdlc9i6uslqjx9dvkzllejttak',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '6ikm1sds37aviok5n30cd31sc7nih0krkjtvsh644qvz8n5pucv4yiaf407iv0bavn79n0i40h4',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 434286,
                alt: 'dl0t4lkds1htroufblx3s04z5aw3ib2kpax6y3hht1796lpsaq4dxjr53lmay76oarqihn8svz0pzni0l8u3k2rp0pw4p1njdbyuje7qvtrvyt2z4g936nbnbgvhc1bcch8d9ai2ssqdpcsx0nk7e2ryb9ofqlutfab6svv65nijawl13gdzwxpcnfe27tgwmdbx4hm3nnfvt3g0hsebuc39g50ae8t7rtbpqi7nkj0aaclvfqarsbsagi979ud',
                title: 'klscdc0yyp5kt6y7m5hno6e8cgwt8wmxo1vb5uhw7y43th0sds2r8dgjk24og9xcqx9i8d12avxjtx2i9rif5dulivzmf1mr7pqakrgccfmj7sc5ulx3bz08ymi36ytilpkbkap0ds3hy3ph61ryej2e1nzjftxeylpr6muj27od5yyi383ip5bhv3qatrhrhrgy5akf1fm6zzt31ozz82791dbrxfgfaen6pcm87h1kx85v0ln36qiwxpir3m7',
                description: 'Voluptates quis deleniti repellat quis illo minus qui. Est cumque mollitia mollitia aut nemo. Dolores et fugiat laudantium. In quo vel ducimus culpa eligendi. Quaerat optio enim doloremque sint.',
                excerpt: 'Iusto numquam sed. Sed maiores ducimus laboriosam sit. Asperiores et quia quisquam omnis atque rem. Ipsum fugiat nemo rerum.',
                name: 'q47kqbmfhdquf8a16luqo6fi0ggtoxgu7xnl7czg68xs3fpvyf25gxpswdzdbakwx4ykqzhkfjd1e7e4og6t1tzrmladvfa0ty9n04nncsvz6ix7g9hl8eaexjw30bltupwhxhox2udpr4pdovthzk1eivas7e34qtunpxanzkr1xqp40qai8phlu8hq1usehh34305esr9cl4dssiajl8j17ohbe41xxz6jv7mq5y2ar66w8kimnctzrcy67bt',
                pathname: 'ab9sq0xms8oqg77lmkfio6v4r219sthupb5rlow8zpwbc7ctw0dzs8uq9lp1i79bx972bu7vfjnb8eegg14q4jnewr9eo13ilwocl2zcdrhhh0j1u9t89hnh0eubcm5rz8f46ao2lt9b5kdv9684ul0d3088ere5vxx7887szbyrbcm4plcb9plhaivr9n04izk8z72w5hpyugnlizjcxnn1px8uxejtx1ru2uln7377jiu46afcme2jz379scuvr1vs96i72ebs51tew95q541j6bta6mkjzl2z72qfjpodgwd1wtjtn36e3oza2iteuhmu0cztoukvvt95dm6hevxv8cyn3q4pygy4oikj0xmvtu5ok5wpvzhpwbzl9he7zhat1h5cwkewbypc05c5f7hv82cz0ta14zw9eb79kv2ame9t147zvl4y8w00gnlzr6jcc10bi7g4naxgwr325sw85dawrof8xjyyvc62p05ecepcurvs5iphs3lkmq8kp3ciokujz522iheiub7rwol8o6samj3iwuq163wvl7fwlo85xng0oui4uaq6u8mll8wutguiekexixz8zamn3niq8cc6u8460ttwhm1solzlpem46o8b6nvymkao8x9c1vtdey6k2q6xsewrs8621k9w7jj8da90fibx4j331yyw0gjpji3w3h5bnkd56g27lbrrt435w4kphoj5i80lhyzotea8y2lp3jkeft2sq411kl8k2kjxws37dtdhvo4gxzko2uxd8gvr5d7d6dpipogmsyhc6cv9jqig9j3ukhwckomr82f6l420okn7lknelzklg88xc7ipqjjqalb3lennwcin1tprdm9a7xvwngqhqs16i41sykwm847je6l32axmdhocztu0vwcyj50ko5epql8s53wqed1zegtrfh052mniot2gz94ra7i9jpdjczgp14gjgqg7zplpg7qxvufxjsql298itda73xyzykdyhmc0jn2ift502iw5vqes',
                filename: 'xqtnc1l4k81n4df97d2m4jp44p2tf3l5eawhe94djjf8322qas2wn0el1x0ovtbqs4k0ehz5bluwxsfycpqkce5lk61268apyz5h6xrjefvwx29nxvvxdc6evkj6i5vplzga4ismg6imwgrzynrpo10ncc2kc8jwdf0hcehvqdzriwuldaj1c0w8f86syec75xqlhwzjg2p3pfm1riff3kykqtva1qwky5qptj2dd69ldfzvuvgddvhheg9j1qy',
                url: 'ka5i9i5pplkrvt6zpxxhfpvdikjuwxio8o6y1evczebnsj4qaxfatr71s3zflw3fkh1vpdj461qy8z0e8opgornc7eh43j12ytnyv20xrin9pypx7xyy5vvfan704o7glbrssilb10y0s5818wuydrzdpne148uepcflyshgh1yrj7zbawjqklg7e65e306qcc3vxq7bdn012vb52lmrhpcpq6xegajmlsfo94yhp1pcrx88yenmjur7qzgtqb2na04z6937t8eot9bkluucq49mkmv8q42vblaa68k6ao9oa8w33vhgzme9x784n04qopo0yi2grnz5ypyrnhj52ytvds1j5jzww16h4h0txxf25serv9mshvol6a0herinu765d0jrqkam9x8tz722k08b3ta9iyq0l8925ymjoi45l9geb25oz4ysequ0pqr77v2h8b4d3v9n29th12wcwtsge4l8huz7wegsw6xid26wt1a70djbt81j6mcq29v1v6unnik118ttvbg2ql7m48qmsd1d7my3ejkcu3xh9umsq75hryq9dtbgr2934pmi1nn9ufjasvmjpnusf47hehxcdazq0x9p4stoox9e70yux7gz7ij7s2kt3uhqrlnt4iooatzqpj8c2opyot1bzzmk2g6egr8y4d580t6dcbn3alkzy7i0r8qs1ddc5gmhchlulv0v28152akleo6wdkptwbtznnm91zbtvrva4g6yba46i8cvpq5dy1lbjycxddul7y7kky18ln3k8a7uksktbqvgs2lbkpk7d2eovozd2ayot6haie9rm254waeasy4alb21xa8oe8vmbt61aet7feqhjfyzplnjfhp811tmt6gxqimb6m4zzmqtwywr14robqvbi5hrd0mijjwa2ab4so34c46jxtf63r0w07s4qsjzf46knjf96j5a9gjgbz35x5wfkvzluzoi12cynk72xcg4tng993o3sqqo08q7w1nomlo98dtusscq1mfx',
                mime: '2861iedrnrvhs5er4otv1b3d49pkqj2wryv6cjeawxx2731anoy',
                extension: '4izbsm92180g7ry8j5st6z2clz41swxzy8ys73rem1kamlhrsh',
                size: 6237035829,
                width: 879746,
                height: 962847,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'jz8ywdm5bevfe78nyxpb25dctbte1av9d67d1uyxrnmwte9myjt9g4bd82toqgt407m7yx0yml2xznro3hw2a0inldhj0ziuoisyu5r56yqio20j2ficmocrt6zwlal2jqvjh3jutgrlw7b6uyhmbt4scnkh1u0yl7x7gqf299n776jswwmgyzruq6affrur43f6atai2lii7xc6yt8uokca0t12xtwynfs64zznvvweww1bw80ez9buzuj763f',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '37yv6gujlsidmzsn9u0by8fcrhv7j7800ldjndysclxwml1b5a7qrrtnrmpkmlahqaowjcbmnw6',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 441676,
                alt: 'gsxs13qlpu6xc1uzy8zsdmdkbj82m4rljd6muamyqzn8q3v51j2m6y3sckwayqube34de7eoqt6kb6vcor1mlmb6joipkb5mxynv66j8t5o6njjt4ryeqwv1u9nrb7frs3a2a26kj6cdb2kq1qjw9rqhmk93biizrvam6o1m62mbc0ta2b5i4e905epq8zptnk1u6enx1gkazy7v2l5wr7qhtd8s4757ucx403pq1h4c448v75u6gv6erw7j4po',
                title: 'pl6509h0qq57qe2o23opwhtfyf2kf0riqkz6hwofkspbn791d1yhk8lzz83eb12xak37kop1dedp6ua40rot6hw16fsoxthlc0fb1eowey1ebnwkbtb7xyxzmcjsowyk0f20dogjk8wj1qo8vc7vgnoqkrfnvvy2p9ijbou2w0mfutetd9ikja9ti61uehe6g2u2khi1z48q6mznq0axhq4czgyljrqxcvwuvt2nojw7bjys86cjb3ndssl87hh',
                description: 'Reprehenderit perspiciatis fugit corporis qui laudantium totam nobis voluptatem. Debitis est consequatur voluptatum incidunt. Aspernatur enim soluta nihil ut et autem. Voluptatibus recusandae accusantium corrupti quasi sed ut sit. Consequuntur quo reprehenderit dicta debitis.',
                excerpt: 'Eaque non et qui est molestiae est nihil similique dolore. Necessitatibus omnis provident veritatis eaque impedit minima. Ut sunt omnis voluptates odio sit culpa. Explicabo eos sit.',
                name: 'watwdk574qq2odbmo8nbyqk9r0e5ltg6y8p3zu30gwzfhl9nm916zok3zxj18lhtx1suzddg0vzr4paguvzlailkfudt84k2juaqhxt5t9r43ffh8aqq3i1k5nldq40aaqvayq6deyl08ylc2ot8f1jha7vusks5u7gnzgpgidgy24ulsu8ommx0tamqrgzi987bzv96f69lkluvsojyb167bib6yapqoozolnt1gyf9b4i4dgtwj2zdj498vnq',
                pathname: '6e0txh51695ogi4ndqfpf6snm3ddfl5xql5hyc9l4n611j206ui8vesvkf0x9x41cz1zfyp2glf6zv1911ykhlxodzkgfcbiwph1pshd3e5qkcpd7qmqi75l5iqm9qnva0fc1ovgthbgy4yi3o6cd5p4gyv4df9lthtfum2lyy1bljjjdh634965hzr8plevqnu0ez69ccplk30isk3ep6qzju3zqkj2o10sgdx6uqe23lcw6zm73qe2f7wy3e7gu398cxt0xyq8x960l4fy91c4fe0rfg74t7i7kkrgeare0l39xct2v2sdfq98g6fcoht5jhbg6eu023quk04b6nfp3dt0oiy1k908q06oc6ykkcubzwu5nd9kyzgmk1nqeb5w41bhvxwu7k25ubbthoklxq3jo3khkv3i8yle3n43vvb73k6g42hdnmaj74jqg9jbtgn77lhre1hshiszhw9np1dznnmsc5jv2h3302xm1kk7e9s60nhr665k4s64drmx36fw9oofxkbmotis9zk28tei2bv7iqdl2s688qrfublxhm5ux4hgns1fa52omgyvu2ne8wjupbwxs33a4t8hcpltzqwes7gm0jyvnrfos79nnd6ntk89wiljosllw54rgwuv2blfpbtb2k3smxhv4ar44lfhecsoakris2upk353wy9n3xpwcqch5h3uo6gtde9tykow5tb1d1crde6qfbzq7bxwqx51ns6eskwagq5dqmh37267sb0zm4ego128vt35ctyvq2l36lu1p53izplyklcxrlt125dlqzkd0yfwgi7yxn7m3a1p24k7x4931u87jhxe85iy2j6tfeh1wtiwelqnzim2tn7oy0x6wtegg8bjkim4scr7cki7fu9yebf9y47sio27a2i6w1hdnatpbpuewscrtbhj70as4pob46his577bpt85glvhrfofju47hgrhac4xty5ghomit0ad6suka1quv1iqbwf756z14rtg5earvjv03sk',
                filename: '67rgxv06ib4m5gqvuz826zhgvnq6mbhd4u3jm8n9dx2l4ocfk8n8tjodncagaszma1i0uvvebo2jjuwcdkpc58f7qoqnquhw8bo839xr9ajv8r2lenmgf7adcpsp5eb3kacd4k7dy6gpljqzrmy8xc4iw6n9dusq7khl0z0350f34jt8ueky8y7glla2ptcvzjj7fxc6ilxlhbocsq6o5xq9ffaxstqdi5443xokj98zwch4337gmuh4ei23odk',
                url: 'unuqd6gy85repr37o8ox4b5ozqxb918k7axdg5w6pu3bpkvh66fdaim8bqr34b52jx1esy8xh1bzlumuh6us4k8nnt744g1gmt6e9yhxohvsmoxxk297dmbddutizv21egl65xueaoslklgl7e4ik2az2kkl37qwh3j44q8niorn3lrdnztnp82qejlgaixamhy1dk0eg1ymvqoehwsyp5a73ynpbwidbgq6p1o4ufcg2i0d8sf55mfri3ibzzguvv4w69jndmdywok1mq2olw9xmpexv594rfphhtp6lkcryyxlixsbxn7v7qivwh1vuh7por34wm4lnkwvskuf78a7og3m3n18mdsegz1s4qkkd185zkv6dz7fzxoro3zn79rdpk2a71n19y1nq2j7346d4xe7cxjyghg7qjsami0pd51068anp2e8kfj4uiv42pfyfxuggbfsvppfo0nluxzmfs65rwohp4q9udl76d4ez82oz141hm38xd6gkn4ures8z8akkh56yqkcwz9ovuacw03p9m418f9zgdmbh7dbl2hd8b3dpvxejml4wuk9l70j496d7if5m9ig1c5p3lo0vdptn1gndbklrxtgxo9yywlji7kazre54t48i6835yn3zc60psra2u521uupss8wqiht08fbhazv0mkt7ymb9o532mhaa2rxbn7jd5vesva0ogtxfd6fcr8osiqbqfft8uyyuun03tqpwqbqps5b796ussmiw4w712pf44sohg4c5eyibmuepsrkv54s55pia91nlkpezk3k5q1tl24x31udlsn51ubbepoqv6dwf0f3ma8h0reuf4a3v49wzpihbj769zh0dofvvrdjzvbgq7vkbz0nrzdxl1lf5uiln9ifn9bt1yff928khomk85w8ijnlz2skgz354o5hzx7g8ziburqrvuijrgcbwxu7fz6k26ddunejbibbrslvjj0qp98tjjpich5k54i1wvbgqs73ho9k7siikck2gdfl',
                mime: 'zim1550uncrjczpjd8aobkirped26068xuk21owduy4qgj6t1p',
                extension: 'vzlrgkiapdswywdhoipms1h3kbmwgo4mrj5gxfqxxgemp1sz9nh',
                size: 7826633219,
                width: 474800,
                height: 273397,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'plm2web7z9cgg62xakw38h8nhkniom42l886g931iyxzowbnoqdoszet333dqz0pawdwx0kwdbozgcq7haa0dwb8j3sh15ahcry1r7h8l0w5p3l5twip6vfghh0p4mhy78cytlpegp5kcec21kxkqtln0ot32u60voix5zatskkw8c94tp8xwa7bf90yvvxyhmirs3d70u1flh5ze55fl2jycmsqewfxvjtzi1ppv0mjr7t5oc9rlbmkl4yzkaz',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'st0zcyxi3ygi8q39yshe9r4rmux7n9g5m1sur7ii2lcisa70okdmn4wxsshhj4zthwqcwrzphrx',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 629839,
                alt: 'jlu3up6j3cmuez6h6ezcjuq4p6sppxxbpoadm27uhzosnfynloskkq1lwcp4kt8o5vm688yirg4od2atou1t0v6cyts1wdr5ybly7gpg3i1cl4qevwwi5bjkv0a2ul824cg20iz39jfepx22vndc2eydlfxk4qcdgzvlypiad2tdb8cuz2z7z9e2hglwhds3w6ag4tkxh6nv1l03jwzihpl23bsveimx0l8dhyrl1i95djentw7sz4yhrvotd1l',
                title: 'nlld6aqx02qdf972qpmyslzxmgueinoikzuzbfvzgdyjylsp3bijcyg4zmn1jdak3smcse1cxnw5cb9y4smw664a1xlssggr8w1xgkauqoagun1brj1g84xg2fcfeesfktvz6qz7fmthf0e0uaxkho2oh41m780s2ynwqtxn17ffez7e0y5h2mtb88v54uia4vmtheeqgt5iuc4mk3qhyke5ncjga9r0r51pucibjcic7hxkpxbwuu4snggc9k8',
                description: 'Assumenda nesciunt qui ut non in consectetur ducimus nesciunt. Praesentium iure qui qui vitae voluptatem et. Nihil nulla similique et.',
                excerpt: 'Natus explicabo amet voluptas. Eum adipisci quas voluptatem quia incidunt id quia. Est amet voluptates est.',
                name: 'vmkmet40zhl6eab8yl03udtldq6tn3w04qeo222v4yzpzyt1vnmsfs063fwrrmwrdf45iog0kle1sb3k7beut4rfo9ykanft3n2mqg8t24zinmnj85ecwqh2dtsfqzxje7756hn9gskg2sud5x5ubyla6bqtju4myyg8m5thpgzxp0bwe518rfyak11w6ct2463wbn6yykvtio7v7u2tnw6o7a84irpiiv4h720h62apfblzhojyg4nb834rumq',
                pathname: 'iekf6qe10zg97b8nqcjj1x40rh80y6lyv8wx6ioed9wcrj8i2qo3n8v7mjpovradss0gle65mrur19rbhlvz22cvvffx5jl6hxeku6rzw2frtyqup3ltirin16cigcs27k27ccjnptlyfsqwmc3rlwt2mk4x3lnjbi73pzonxde806ltno1je4crt733c7kkftcn5wj9vbp05ic7v10t16deu3i6gg3btaa5g0eh9n21f6ta0rky4jeens8vc6nh7p2sm8pr56xvbmbsrdl8pkues07f4b37c94nvw5ihwxkp29awho8trit6fdqxp7b6qjn35hg4w16z21pmq423qknymukppa020aufdcnnyump66gzav859bznvtav8fixy50tknsvxxcyulqn9f0xtwqy3ufe1o9d118c796tz4ohl2nq5fvq539904vu6taemlysb52bm4ptikhrmzn7d6ymqavv0otdcntsjyc8rk8q1ejohv2ux1j11ejtzcmj8xoeofrgo3akz9xctk5rhgvm2eekbkt2okdc9dly2z7co5iwtp5ziu982fap2ry313pxh5eso6a1z3a8yahvycrtavsrgossckv5rb0uacdlgtntwldahe2enkaensteoj0x23hg401ylr2p7hppol2pca20apwugjaoztlbf8qgr5derhp896zftw46xk3wqxgvxxb9b3j562wjcn8xoo9sb4ipgh6atgiivwcn934q77smkizficuu2pdsnoq1vqk62dac9ukrhhfec84km1etg7yr9dpolq8etrhog6wh198wsud41rmgjvyw9zgyolgmkof9bsg3dh4q927x6oyk4civp495zwaiicv22d4bkdaix3ycfnl1zvabl9n7vihdsgb9rzqbudx4pjy09mtkjzuatwykzovjtuzrzvj2vvccqp5b8z9obicwpllyd9hixqi234dpyvk2l18s64b5ku1d77khcx57tt0hiycvpae7opmcz735z9nyxot',
                filename: 'pe0csqovl2asbs0q7234pghrb3bgbhxa4om9q06ezuyax24fjatusgq1pbm3ccan4sd3dcyspvjyu18ba6sf4bb071dcg9wq6we9lzllpgi3dpxcyo7qrf598h71vo1hh1fkfomwnd01zbni8fhu5ruc3ptg1q9rv069kl8uiu9yvyjvtgmaurirrrm8rtpq467pdppe6990s3z9o6dero9tj5dy5eg0mp6zs6t0b2silt1569annrowans8ske',
                url: 'q80jgpykbd7e9ims9katzw37gdf9mvbnbsbxh6y5xfnbybr0tdj6afcrfh9utkgqw6ldy9pt2mncy1cgdcp2dlpbcx240vfd9s3okr4s4ed68cen7fu40623n0wxrrvbkstiblv2lr00qvf05sqa8iloso2l7dvtqolkubqznzhub18nxobtymvmam9so7xjfiesqpw4saljrfqj9e1svazj1c0wvuj4l4kgz8ih45kiy47l526vbc1j33cb8no8ctfyld6ghkt4r1xxaxdr4wvkx4yftndz1ucdft349h4sk7ds0bkp6rve4k797ncpo0j9ss5ydfksityauzcnvt17vdszsm5ywwwvfe2g4f5hxk5fofbnumgxlsszack5kxrochknljscto4rrpsyh4z4wvm2kzdd414wlx2onlgs6sqsg3qfr4c6j10ztx2foea2elcb1qic6wbteafmm9r2dkja4us85nh5tzx0w28ahsu3duo1c13w8ygvyp97z8nqjkjorx9iiu6ono8n6xccimiosjzfiarc4y4o8e1j6zbfw62b0kienoppco0pghz5ruwvu83w1xx8eo42ofp4ourikp2eqixyaga9kx0ytfb7k6fkaf8vort9ujcze103ftjvy2ogjmnw919xjrafc9vp9rcld3hwwu4qqy94sxl4oyikt9b0lyou3o1gyvty44o90ki5yg8rifgp7oq32mpqmfelvxxcbbg6ugnnsx3x2kosgznn4nzvr702j4b58dyr9zkb9jz5k86eacl2mb59rp3kw7vkv9rcmiz2y8moqueqam9k00jvk3styt08wcnmb6pt5l2iu51luk9uhuvysv28256ka927x7tf8z261q9vfyfd77m78586j42sgr2oubg2cbe5bs7t0oo6ahfn40x0a07qe3soqy7v8l3mg4t916bu03x65qzb75ypmexgsrsmpetbu9pjbp75vayh97kmsh2zzuh6y3mdw66s0nkffbocl3k7ghum',
                mime: '6211ypezsbtzeg499ttiqt99mltciqfkz98o32u2mbcq6o7cjt',
                extension: 'siv5udgg4kjpony4grj2yh9ddzc9lqeuuc1apm20k5c8uqb8f9',
                size: 23680083648,
                width: 349794,
                height: 474366,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'fo4bksm57d882aaaxffbu6ov9hyog82b54es3gfcawus8pbv5xlllj7z7zofj8oe5tcvlbdggodztbmualpx806up4niv2jhmk9etgfzho65lwecpw7d1owxgj6w4wzeescnec2w1hj6lrvb6ug45hechdtb387ys3b5nt7zymg27is2ylsy904rtlwhqfixna6utftjd3k6nkiit3azi5gbbv816v2v0m3qu2wd5id39nsigngzrle9mt1j595',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'gmzjv8qvsqi1xfvhhlitm3nsd15mppvyqging9vtr1ank1jsa2fqvpqay6offjshesx75wdwr5u',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 791868,
                alt: 'ybqi60kn60o99a1sa92x1fd2umswstj86a5hcxb3i5nab7bobykb4g08wiga6ei80bxq1ck67uuvufa2eotfnx36tq1mb62wqu784c8q31fl2ymsm5dc35mn1zkwllm3fk725z5vu6de9nlvi16htjctg6v4iwvmybvlufglk9h5rzrkdy6tvba7xm148n2chtqviune7zzx48wiyhbv4pflpsqcu3qsdffc0c5ixcdar9jm2cdjbl8vj1zsnxa',
                title: 'o1kbks11w4h7npzbaiu5nsxuim3zupy47d7tswtxdvkx5i0ni6c46h8gal2hluvfsljpibgni1jekrcr0djsj4vuwp5y8havaparwg7n6p4rsrvsberh7epsc3hnly5pasmrqacbhukrs6u50vq34ih4xmfyrosrcfuoinynnfp6h9s4rp6cnrmrw5rlo6wwyep3pk61ji7o68eingrb73ijwdm562nwrqf5q2elg91dinxbk5t4d6blmawfpfh',
                description: 'Commodi quae nisi cupiditate necessitatibus vel voluptatum. Officiis debitis quia. Voluptatibus voluptatem aut dolores. Ad totam temporibus blanditiis nihil ut eum quidem. Placeat nihil nihil nihil.',
                excerpt: 'Excepturi temporibus et harum. Ab sapiente aliquam dolorem explicabo explicabo qui explicabo dolores ducimus. Beatae repudiandae vel minima et quidem ea.',
                name: 'sir66e75l3ej79fof6qjbl4nvka3ctxkfejrwjrkfubywfl7yt5ln3udohtv1no1zxxoltqk8b4ku73hassqf3fdmcb1y706uhj5ilgnr0du15ogif6zkx7iqlrndsbxcgs0p4ge7m6c160svb5nr2toyu8gddihrihcqbrcudaynqck2mmwmk504kj4t305ix9jmt9fcyri1eyrk5rqj1d6qjw9gs5jl5wn1gbwuyovd5ornmf6ht875umabpq',
                pathname: '5rxs0ucne5bnfjxor42qu7lohqicx32njp9whl5opz4p73u4fhf7zsujc3wbx7ec9t2tq3te6yqvi0w171tita6kfvjvoyc1xmlnu4fr53sq8yk1hri30iutth6335v54syor2johroou64ldid1ch6i13nr6bhar4bzdstc3mruej1ki7xkv70rk96lf4ijtte9945r0mctdp86e7yj3001bq0hs4645yck0dm8h48ddy5pn0vh4xqpib8ct41a3vib08mhu4td1in282uhwrzap478bo1ha1cd512ppt1sh6nsnno8zqg8n7q2aajm5vjbw19hdvwucp479ny0t71ibyyeo6achazbh5m20uujstfzfpiemupz0afihvdz3f5nymtkdivtfr6jd7p91ts2x2d96u1fjnji62wv910tvs6mlqlx53dqsgktdumz6qt37245ch88jhgam5a0p1oj1tuirafw8gixbc3yd3rhcmxlk03pbqt4s0mdyn3u8qdevjrwisjgkn36k8je8gmyh4geaqopamr0onevnoyh4swb3a4lsp9x3i65qpmq9ao7w2f547tpmfcidds8ev72x9qd6u5u7jlyzlzjqpnk5g3rpf6akl1lskbdzydw38m79jmxctgnpycm6s1utme77qhffvj13ua4lobsdmu7rt0y9oy7uykjtfzkg3hn2k1g7b9ec2kl6yd3835r3b12hik0jl4nwk9pzwrb7ze7ireq0npir2d9qei89qo8cyga413d8rynmq4mz0querxagyp9h6f6phqyoli8vtgwaq3k1c26fcfuqr9p1ftf1f0t9pzzzmb99bsk4kiowi1pwkb3s5cgan6e31fd2w833fnebisx0ruv8t7f4ra3ko6syrlkmhub3cyrrkso32gwbq17d1d87gqrhpj0bawn4s0ynk6wq9kb04y2z682m4zi2j7vnwht30n4cum79walncvk5n1bl38f9yxsd3n18e38gez7g88z7yvkpc2u',
                filename: '1og8iw7jz7m89j3qlsp63l41gw543tf62o2o247mets5yb89hgy7lm4v7g1a8fdhe82cf0t7lmivm4q7vc3rje6cdpwd563ql4z04adc1qd9alcyb773btkg03g5w0lvico79kz2174a0umqwu7l8okamw4cnyuux1ciao5et3w86gvcg4xsv0qcxz1msz0qlfmldod6t78ses6xhlll3ok0g0iwebnukwg76sb7otdxvqv0yscwko8dinmiu9l',
                url: 'am9yxzies9w1sch5byyahwwlhlqb4x5nkmftnpgbzpefkucg6yu9gjj2qae6rhtugjc5nshhdprj4ix7jo2r66fmh59m73eqwrymxwv9qz653ai7czxxekybvc6skwn1ud50w16p06liciv4fgixy1ube410s9de37351xew3z0kxdlhf1g2s4t2v0s83zv2q6emlrsu1htytez0410t4gelpbrwjj4z18j9kgucxxr2bxwf9il3zvaiq1ijuigoe57e08882sc4of25p6bxmoj0rkk24ncqflw98k8u7u565x1c8whwzcgen7omo167pcw95xnfh5dmye2jqjshw0i6l97wnpjiwysmlxlmxuwvtwdg8s5xx4wk28xdihv3iw9fchpvain8qeresthzhze13om9pvdiecmytlmug8dsfftxdijc1fivwf9w63j9hchlqrmli2bny14k19a0r0dv2z62m4vm0tlgrqup0enyem51jss94dt7w3jhxos6a4qtgawty9z4ywzd3udbdjz32n3fuxg9t4217ynaa0klna55nv94csaol5z88xy9bggmkznzlpsobjfjne56yv2p9eb5ihkhn2odypjxyhavyskhhm29ma9k6vr3kwqzr11qhvl5c3t9dvo1eqqz3wvapvxev2mqy2i8ex9ndksknk4crui7vmwpq6uo8oro7hsraoia94kt2hsfgw6c8tcy5u5zhx1i1d5ir41xypqg5u43eyxdrti6qi1ja1itjeb4c39i01rnkof6jew90siqtrfr31gobjey0e17z8aa539woioho83ru8xny5aa8a4sal67c3v6ypg0b35msr4y9lqdyjbzqa2ioxmrgtyq063ttqw68sq70xi55rwxj59y196qc1fr7gi9y6srmvfsz6x7fee4vr7elaladlq9bgbxxqg6rf3j53fujfinjobd64xzil500g6tp89lhhvdw3te1gnl4l75nrrn5w9ykc2q0ksty5qwtxpsc2mg',
                mime: '1m1e213nvuesq4vmoodajx65290ouqxvt59rh3b7tmgyuqr8o5',
                extension: '2hzv5hys4xwuisfc104rkmhqr42a71310a8zpqhwg4uvzg80yy',
                size: 4264466109,
                width: 7249788,
                height: 399889,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'pvauax6omcklau097j768cvpelxxqhjlj6p9irlw2ud1xvt4h5a81m0foxopov4l5deja4v75m6x9b4f43sm0dc3huvd8jyl8utdmega4uhc8knpkh1i4bj175sg70c27qtdn9vnf8nr533jc5k2io9wwjnrf5p7ivogf6t24g6himugnqrir2uadwdd6gmtvffj7l8a92djmi548gpxhs0gvs6t9d1hwfehgzp4s13r8u4h63nqrhl1bgt9dkc',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '6nikgevn5i7plyd3v8eab0jhthfpsg68xstx1czw3vqkdc3tsei1kmq7x85nhf4rs61sz7lvk28',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 115904,
                alt: 'j9aurko3b6ybwxuit24mvpigmgzgehuz9fknw73pxjlh5sb471g41zlq355wo1eg4qfdapvv7yct6d0h0jxob1ctlenaj639hfjxp1sp00rm8q3ve929gh820ib3uoo04zqm892chuywpja9z1nc5h24ke72zpedpd41t34pt3x1zbpz4xfpwau8m76v2fu8td56exasjpfrawokec601e3y5u29m64t3zv51a94ndcxyx0s0h1d9izawep3en4',
                title: '85zn6x3hzoajk39p6y5v49kgf6dah91nfeccjxxevfhzr9vybaffmluflit1vdvqfb8imdz47lbjx2um2hegb6ijs9tjks7sqsshnoso53heombkiqtzk6fspif7tvyfhivtyt7a8tbjyzp6wyvkw4zq9vzgpdrcsrb834wnq7m693shpun6pedzr65972ryx9ttmpmjlfxg54dhgbuvmfyvqo487zs0pxj1huz9nyj0e26rdp1xu5qgb0fbp75',
                description: 'Aliquid nostrum dolores sed. Totam ab numquam dolorem modi eos. Qui exercitationem sed magnam. Et minima ut recusandae ab quaerat.',
                excerpt: 'Blanditiis voluptatem consequatur voluptatem voluptatem molestias harum aut soluta nemo. Consequatur dolores culpa nesciunt voluptatem. Ut dolorem asperiores eos. Doloribus minima eos quam.',
                name: 'kbgkwwx2gesqhhjpt0u54gfx70amf3n8f6odvu541to5zwedeyoi8r1x88ftni5qentgvcwa3gpftdo1jbkq8dp9c13y42nbvswd09rgmmv1gohcjxs3phjrn5ncndj70fi5ffpsboplfiwxz5phyz3vv45gm1w6co3ot52fbzsnjbi938oyqd63x2iu84gnv9vjsyfxnijifb84ozja4lcv6ace5s7lbytzgw9az7huzv5bmozawntl3g5m849',
                pathname: '2ywgjwztd0985cada0nkkjp25u6x2lhe4n9ttefhun9tpzkvmen16lqzngmu6lv8tb7rpttxkmweur6kokornbi1ee7e1ga7j8vfyrjxq3ffgyfmdetw87fcglkb2qu45yq56dk2i9rpbaj0ix01eocz6vcroz8uep5d58gzwk1lhr83qdulu2ew7qgt82gylz7w5l66vfcfevoj89oszdmnjcwni3qfznhuk0uf482vwk97chisewraxskwvbgvkha5u1ykpsynh1f7pnwjwefybcxicf034hdxu9hjozw0vr6smvmfvnno5je39ahjfqq6o4whma2e0kcto4gxejent3rh40k8zyjwkosnyfhhdpq54no25atnrlf5fep86ip0z1flj8i9ely6k9k18hhvkw3y8ol9ogra36nuuc5cjt02zzb9jnc9a87bnxa18st21wv12p94q0cmdn70np5lvtq34yxta99hlvsvmqd5kgzf1glljg9stzkpx2nogvezxb852t94q9qsxavgk3x2wlr1lmw6lp7ne96ilmzspv4puhx3feiams9dqb0uf3jdek0uuuncw4adi6lle5mx7v1zbzqc6yi174s27767jpdotd19f4718nohextgqy9u3385aq06gb6a8aelmp0a7nmrbx39cyk4v6ms6a1tvwu94ltev0xmf1hyyon0off316p2tpsgkphubv73rfrd3gmm13f2cbxd6avqwx612k3jogwkb7yjpokz2i7ylqfsjce3a0pfjgxygj05vphrz41h9te4ruelvk484ko9byte7kl0n7vvfktj67cnnu2fjm7cmwlxdwjzlqavn8ot3lqhvfyyjdcgy1rrh123wto4in3df0g60ue56a0yts2q61hk3yvr10n7nh5f94a80pdq2bvkrpd3bjvzvlbydvds4rx0207dp1bwjssgbrzfa5qje2wy4fzon3gerunx4xq0irs7llzd7rp2d9q6aiusfezm7u01eykmzfuq',
                filename: 't1iv7zl5i2lbl3jl405oljwmij29vcfhtnu61i5aj22yv3e0kd0fvpnb214ly7rk6t4prnnzqmcj2loh3qob3bk0yb4baa0zunxesjhytm3nhnsvpfqn4ewm97r94hr77ak1pdxjtwpk3cbkbcf2611vhef9zijx3cw1l4icfxjanzqvxx923km827n5f1lb2029qa76lievj0rxfr2izegdvbzlzmbfcyu79zkuipwl3uvvj29ow3g05q3dg7a',
                url: 'd1ye0c7caixpfjcmvmtrxqxvgjk3r5bjbe5x7e8gnp1za61qczd7epx88gtzkid21gnt3o56fr9jbo0e6jm2ncpi4lqjrtp31kmojigeweqy5ai3ngv18qiaczlzet0fjlsjbtaame1ctrs9pjf66p44pyemv9fpvoxs9xhdpdtns3vu19jzh3pz5aunmv94gbajqr43mbcvx1bppzgigdmkcs7ua4s7zd7o9g32alfii7vj2op6vv917h8tn0hxb325fxbxaao6dx5tyzabhkmt3qbvrbctriat0xeelzh9l5vqm5lzweaxrw6clgfuxp7e7qvngnpm7zetlaqugu5dblrq5ljn9x6tbsa66pjindts8uaqa3uo6kj0junzh6a50wdkiqop2vuh7zzqmtd7o4e37to2chfke3hw6p2ajkf0ley2vip0m1gb744twy6fm7ipfurjo8tq7gw6ksm9sr8mct3nbnm25ekryf9i847qxviy99q3v506k1rvq5sw3hrlqd5e8s046lodtqz1w5bwnw57d6i0zhmfu7yfkz9b3gny8ktoabkmn374of6e4bidkuha862jezpxg5wivs6t8fzmxyry0kw43owzfzlohqaeep02z5xgagak9zp1uzlg9gc5lyx1dff0wm2brwyzqm390mbz97q8nag8te9dggnvkf9zomlld73y0i5wuphivwp5jh4e8qh73iwjmopqvm848rmkd4de3wv148fv3hcd6i1gziiju0tkbjid3aer4c59b045im2w6u4z7ptk0pek7p26s3ewlespj169kdneovvvr4sxatr4yy1c0ipogn5ixvpgprny2l88fvr4m5qcpeiumh723x3vtzru7n3ca4d4b3cn9yqiottowgalv3fja54rz9nnp3z1vmxjtg6v6ko0txxrl2l9elfbyrv5mzttzojy71gtfqqw32c5wrvr9sqqdbgcmutet44qyk8mwnqxo1gic78sh2slxcmggoms1bwzhsex',
                mime: 'oh9fmj26c7t1k7gtnzlwf3ln40nfq476ss49kasyvpck721r29',
                extension: '1nm41s0qrruo1pnxmyi9iu6xa219i30xwa3o5vf7ld5i9u6veh',
                size: 5897311172,
                width: 690908,
                height: 9729026,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '9u33rq7ol31mksc92g17r5uginb8pbdqljxmoheq5bu6fm3qan6ielapiods40ml05abfl1dxvwmeqba1hs9zsachpc8du68u2o37oyhn7qyqo8pxwop55lmvthakmn8rk0t47w222yh7wc8abp4ouhwtdkiaebs6ntbn17jjhvbdqp8gckwsaur8uw7kdjn57n1sj04z7naw9jvparjnm6l83o1x4nh87rt13z4uidyvfquifbqmcxdcjmtewz',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'tt54khiutmjqsr1ke7swavdf1cdkuaqucv8beji5z6ogc9gj87u6fdxlb1jphf2v7a0gi7wad21',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 945248,
                alt: 'ep94tvl9xos9rgnhr8qitnw41g7rx09yltxiwhq5qrtjsuttbxkd809o52yrsquh93af5l0i75ktfz3ueixue73onmnl2wyng6yb4useio8opxvfegjbrnbgh2p7cxjpaxonxbcnqvwzcfcnsbsujrn5b3gm07zocv7tipgadutkkl1m8pr8b269pj165ddptyw3fvaninrldgxtk0sbwvybq5xp5aqq4wfm8399bd0v9u58870thxexc6v37cv',
                title: 'n9xvd3uk61tuiovp7tqaej73p27cg2hcq0e2pjabb7bziybjoczf4mgmz3cqflxplc4lf3z3wra2ezjuqmbevkpumqvr6yjk0bvw9idkv5l46m8gemo0tfw0a991cv4ecqxmusdzcsdq2s6lb1e3wsq7s14dvimy5oezee463qagq35wgui2vm5k1ercok7aa68p9n1hn7xtnkak6l2cgvi156tc3yhmbgrajekx46zelajdkmvmdjrkm6ueqc3',
                description: 'Voluptatem magnam illum exercitationem. Dolorem odio minus cumque laboriosam excepturi reiciendis sit laudantium earum. Sed debitis eum autem aperiam. Adipisci eos impedit ut et aliquid aspernatur unde a. In odit rem. Maiores ullam inventore.',
                excerpt: 'Consequatur accusamus consectetur expedita eum exercitationem. Voluptate odit dolorum tempore officiis quae aspernatur hic molestiae. Dolor saepe incidunt perferendis adipisci molestiae ducimus optio quo.',
                name: 'u4xi2e5g74xq6pqhixq3vyp8h9cn5yld82j16uqc6se71im6k02ebtqmu4m64ffdfb27tdpxpl6zm9f75r4roagxxcqtl1exc53x669gk870tnqenogr1taam2mc50sk54zqk50jf7yh2houp5vkhsmmdtke1775pkxwo4ybfxxdzo6misixaqfj5ohwc69hzchi4s95s8ykgrbu8s91cbmla3pmpg1tbuci2x2bfd2hy74mm709kpp1ru7vbmq',
                pathname: '1dj48d7fpz9y1iheuqfb7lur13ijfckvj24szyip8t6paibuwbl4phc6bev1u0qpyrxwesublkp2np7hjyonum4ltlhtz1afst3783bv5dsaox2oxuilp874ikmtzbf5puqwmeno91kjw1v6zy2hiesn1m1q1bgyzdiyjli95sbo5gudro3tdj96aua0tuph1j3xlddnxdtvimiks1hh1kuxn3j9tn6ohv9p9vvcs9wg30q736yx7ckw26t22lyagd19qf5lq4wtkqoy60216y9339642c1om90dvgrngalth51rtty3axj2uyi9mxqwkc1wt8gms26pbca7hij8ruu40m2ofpvw5ezla6p96j59ytfibltqkaig7knvzf53wgbtv8s41aawtw43m01ynfq6ygurhoo29klm9k9xpl4jwjmhya6sbd3bj9w7kvihsq8gy45qi1nh9wcpwyljeh4vrs6chnez2yo357bxzgxg8cnm8ds1cj0hrvdxvb7c8fv3nzt1ed08xrv6fkmj0n2wch9zgwvtvr5j2rhfzkp124nyaa20c775ayypwgtxu1aw9x1cut55plvr6v1s9nyr82c2rmjwtvn8kiifzkkcxjgrvmbq2hsjqeb89rwat0nx0z2trwn1ecv2zm0ljejjwsc9g995vw2ycluge49ddrcrg85x27n2ynke8gvz0yvrmq6719s5g9bx7sbjwuimgvgxuj6j556z5n0jl494hchk5dobb8sh25efhyhm7fhv4j68x81spguldbu9lt9krt0ue97zcmu0fwg6ll2vupln6ogju109c7p3jo0fcfu7x0el45o2bjqxmp6bnkzlte4j8m9rto89qhmk6xx166u9yqtr94onlvpwvjbov8q23dhzuy4gy5pv507gclx59fgbdgr51lc7954te87yjmw80bs0hj3pl3v1nedas493yd2svhtl3hhri9onbaoggtahnpq0bovitxxs9mzkmynw121chu10i5fbtndt',
                filename: 'c7hh6ve4xr49xnlq847he1792sejxcww26ldzn94tw6lfnipe24e1yjbj6roa8v63h1mgj4rib69bxy0sj41kjyijo6c8t4vuoeacq8fyb573rd7s9ov34398tmc17jsgqf7r08tkszcg3o7w17ahnrt5t0l8bg7upntsd028758ey0hjb81k6xvbuh50zhy3gcdjlq3gt6wcqycj1fgaq9eds4ywi0f0cotpnbo84r91uoyruvvxnpwf941luk',
                url: 'eowvu6bjaqzh6xdbzapijansnkx84czrp4zm75wzcra79keu583czleil2624adfzl80u633t2uqibhya015jlu4xeefdtavcy4l9kyvyr0gdkdf2v32y0wemoohm1c6qpwerpzbrpib2txjh4n4iapjzp1uz9uvxp96zoi0ciq52f64l2wzexzx7rk27jcl354yxj1yecrnv6zpe5rw18cp6seait2nd92p8lwjcmk64o88qz219zocuck49t9lct9bcbjmtfejpppocdzp5wqma1c2ar56na9e9gk2hdgdgxiq3anjmbsoszs5jjxe861wa0an8b962e4qg2rwb4fkvaak5tq5c4hm39jb9pd4z1q3vo8z2oi4csmjudxttawerl5t2smvvmnt2ilfqi6ybp8m5yppzd55li5q4gr5nq2243ftqeib2206vq170hsx40ozzflnza9ninq7cweer50qp0ji8gvw9duvjkbtk5zahyhc5lfhclz2qjlioxsx0m3l8i9kc6kudo6dn9jlwt5xjfmt3nfj2mh8ag1d82svfrpneobz0qxk67413vdunmfmea6l4db5uzgecwrjytew1ovdx8s1djzosn6mc43c2tt0wdxoy8lz2wmkpfzro13k45qcqni1qor4x7vb5f4nivrqj697rif44qvo1u699q0ny9ads92jls5irzmh1z04rruduyvw1ukmsfqgi8oc5icl0v19jr55x7f527vmt8ep7bp92zqcha9qv5p9oabjlif9lyl67s4wbsyr055tcz233oi1pcwiclqow7n38k12ynl66fx7k8xcas5stfrrp7snggff8ctdihzrq0skibqydn63lhfdf65ya7e92ii0k8ozm6q82m1r1rmdphyforlpcy6hsc8vutyddpgmdkjnrkx1yzw92g4554hkne7d2gz2bqp3jdijgdqtmpqcph3q1d79x0uam5487fr2idi16t43dd9zw7qlqlu0jfpnf86ogpmnlwig',
                mime: 'otb1nw39no73gefd1rhdspgv6fx0cj2ln0uf22qak5sp3pq3fu',
                extension: 'aljzd2adu5xj7hhuvbxqdtt7swdqyz3fc6afwui3mwpzx8dddo',
                size: 5160332017,
                width: 828073,
                height: 332714,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: '09576shdxd3ns1zcm63qnh5ulwzicbjfrfq3k23w7brad4r4a20t24mkrt89jz1muqdqwebigza1prpdnx5hpwi53crxyi4v5yin9f7abqrpqcskqpkonh7te04b8lqs8mm5m1475a3ngkuuis2a0hfhjhf1e328wrfgdy7i3eu1vrycy7tmp6e99t5lk3qwc255zs2yfhggyixmq7sdujqqi3hqqd55s9ievxtephfdlz6vjqklo0vju8sdtm5y',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '9jkzruyyul0t0wi6lxomxmou7gipswjm570p8zy11oxjn76bysd83lycouwxnu93boxyi3w5i57',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 439630,
                alt: '8qvvby6tayl7gjvx4mr9l7faubfmpibpyoypoiwzni4jnscdjf3mdu78w898iyuk1fi4r1awoznd4aqgh63h805tlfmmhzeh1n2tbjj0tsxurduj675lrngzkcvnxr6ebsng695uhxihpfxxnqkenwp1r98rvod7h8xcb6dn37llan7uj2qqneysstjz70rhtysla9bprbhretc7bhyriphbooxwjzi75onnemgqfstuzixa1kq3q5t64g78wx5',
                title: 'r30n7z3t8rlvpja8blqyirz3327dehb382tdkbx6giesr9e09hgx3i5lqlzlszkv7sq2qqxr0iv3tm07g6ilkzkp76i0sj91c3egz0mszd3yystih8fdg9hc9kpn4v9td4kfiow6styokkq7ddd4trxfc1o19uv44fjra9c2zm3uku2v1w25t6m2yl5v0r2r4msle7hj4bhljzkwk1p55ed3m2no773p6u7zb3ppdox0ohy5q7kp49b6iu7d1hq',
                description: 'Dicta enim distinctio aut aliquid quod sint inventore sed. Dolores omnis eaque non odit ut autem eius similique. Quisquam optio ex odio officiis. Facere sint nisi exercitationem enim similique veniam impedit omnis.',
                excerpt: 'Nihil provident vero. Veniam unde quas dolores praesentium suscipit neque corporis non rerum. Tempora numquam commodi esse placeat vel est voluptatem. Et exercitationem sapiente eum. Quibusdam voluptas optio ab explicabo. Neque aut est omnis eos aut nulla vel distinctio sit.',
                name: 'hs5r15bje00mu9k6lz6f4v7482k0mqdq0yhe4jo2wp5e3jlob39of6mqhuk3ffnrnyupmmpxtyv54gbpzy1t0paxuhy1w565kmotgz5ulgq76pz49n3w1ssj50835i83favheo1s6os0d95bujvehb9p60cbc2im7lr1sb0emk11kdvdmbkrpmhnyl48i1x7iuscxu5snsy7pgplxubx0hj9cavdoueu1qjn63wu96ls2zbf8lxf7dw7coe0cz7',
                pathname: 'judlv6496wnl1qcbzn5ww8mqh3s855q92ajem84tqcwhzeydmzr4pmtgqxwyl634bfxgps9p93jm5tdtqn2t70n8f946mi2xz2wjrd0m7cjx8rynsfopi5pqt5rzvkzxtjeh74jfi78wukcpa8pm45ihn1y7fpgm4uk6hptf691mklb5cmm8svk4gqao80abfr8nbn8i1yhuixuom30aaixxk2bqw9mv72nptdsxcklcdqk8kbo5idfz7ebahl9ini4shoaei14luwf4998fuctf2v6dmcjw92pft0qnoj8hvoy5dnbfb8dn7dnn4n69o9ysuo9faddamotd1ccp2k1w58preouimxfl6xv54z8813ye8wfsgdct0ks2gkc2j318ikzewsbh7x57uqib272rmqqtvtrrk2kulp5e1hv1vyjavj5hulhutwh2deh3hpho387hljatxtnd745ylsnmco1ltez83upcmkw0yj4gr3zswh32zwojm7jtdrj60i2clvuwcszvov7e0q2bhu39jnxdb4vvpj45u0e7ft757lj1m2rj2tnvnxb9l33ksn7qq7hkif6p5hfni4acsi2in82h1dhy5qxhv3xazxt07xqifk883i3k4tf4owtekaqan7im7rvaek5eiaabe4hzf193ake40ags6rpyf9brdj0emmzrpy6xkcr3a0vymyj25z9o969ne0fqg1ajzdfjwnbzytf1p55ucjn9p84vzy8xzqiegseqtnr7bomsj217onizcuwkz55godyqej463027pkl4zsqtm3ykpgz64lw7h5lbthkoja6flntxfai677ktodvwg6omuhaxs7u4ktirrzir581uao5r7sthlkz2uoy4erixzsn1pbr89i11otrkgmly4i8omr1hlbyud5zjw9tvob82l6pswqp7u5s3bzcsu4qw66xny25i3fwmphx3xzlzc4l4dqx3dmtddlq0tew1t6wx132n59rifzj8k38lue9ix6cv5v91',
                filename: 'jb10k2dwc0g4u8ewo5mlcr9f10b2e9zt5pd7u3rm6tweek7g8uujyw1qnoh48r7hfzdwhi15456w60q0j562yfvtlqksmyn7u45jc1kdjj8jspisk2x7kj7on1nx8zixa7b126io0z60h8suu8s135bmse9yps99llbbtf4mo18qbo6x22yz39iudbi79fh95ejlkwya68ruy7p8ch539z610r8bjhme2xsrh1udkt8knrnea05cdm7osqz5res',
                url: 'kjb3ho7p424r7h0478yvreosst4vo1m73wi5a93czjn52t7j85djbl5kzqiayg0waq9c0asqogj6m84rb1yjdx8hgw3wevkiw6ug8lf40xisgwpf2qwpgw6riv0yaaiz9tyelz10fhemu9rlcejhvmyizofg2sq91k7oifspqqlhxuk0denf7wzjpj3io08iv9ldkrpkrx4yo27g2yagu5v3mgfdutci5dgsei629jncklkgl5gjcnymzgt719z50tfef3rsrd0ebprbraup1fakc1ok53obhmad7datqlanquh908i91o19fyfoqah6q1ztpqhroxxypgxrfua8wevcux36poi76m8r8zylqhw2ij89dkbglp0v9tppx9tsdioooi3rzz6p7po7nll3gu4ulchfqmtqz26tq6lytf341u83cozy2gls6lxv92nihpwqnsyj1abxwdv3wpg413548tuv44uekyxi4fp7rfaqfofvxagtmbfmpv988f2umf2j9u355nyux5cz3fswltter2dyslnoguffrdao7jsd4lcj7rhn9xnfsojoqbir2akr3aonbfipw6muv063oqhx9qmwflzaspbxg1scj3xclt8aplod67omxnlyqw415dfdzykpmaclens73a5f31cyagfo3j2porrakitmeus9xvew76dmv3kvblf5k1nncryllubwy085u56xbl5bd2nlmk0lwn83lq8vefxhxgi0a1owjp93p4xt2brmrkq88u5j926tyt1q0z1q3srjrjqvzrv1utxqv5qd6vmo1gkndt03jgkxwpn6yc7li5hk0m7h8f9610qwqs88853meuyolh9gt0vqfoxf9qrhv771fnm5jlqiodgko7iwb05u7xc82flhsyfj235ukfb6o33qce3g7uwztl1n361h4i50hwpz0ky6hcbwvsh7mcrrj36f66oph96e0dmvxouf4fs1wal6e2oupg6su9o0k04eoqt2f69d5l0cojun13cs',
                mime: 'ocmwx80o5zu6gr6x1itrbx5671h4duzo3cp3bc1kpwm8tkza58',
                extension: '6232kkll1ng2p97d7twbcqz2fth9pn1umsqgh0yx7lrh9yw60l',
                size: -9,
                width: 254018,
                height: 848609,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'oesrqfxdmx6cqijaeu33lwc8raha2awzn3m39jd69n4vrvydoxcb63huoo99oni2ylo38npv7bug44q9yyiyete8s2a7xnige6r812wbm654to9oqwf05olj91p2opjgpabkyz92xo4ovrugzy0yhkgovjw4rxboz8e2gpksy6n5ajlhrfpwerkyqv21hwnbfj5aox5r3qqjazainfukk2yirh9984z8sllp5czug6jd2noy72alp8zx78b3n2s',
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
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: '9puz10opquv69mn8zrdbah7vmtsksxowfklmujkl7cqe1tvzt083rmvlv004cl2dpc9ym01pivq',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 636829,
                alt: 'wblyo6mslnatxnyhwz8rp3ylf3ajhtdu0whs3ns6vxj93ybd3pxuuv6nqtup1lzuj6982h5px7rgwi6798brybzothjdvxfvxtr04jimfyagpscz2trrrz5f89ijbv18ds0i0cf0wvpukt6n2gzng9ui77vzcjjxcrctoley3w5xe13xg9a1jm04mb9gbv6oj8vudpsdla2nr6d2ar18a91xsppnc97o5q5rcq4vrnncvuf0ybcpv94yc63yezk',
                title: 'su3kk1f8zm2e95v3sn8hjolyxsfzr241yorvjwdvs5xv0sa50ci5cs1hmi84tas2hnvaca09t7c465mrklolpeee3mo9nnwy2zwm1368wninruhc6c9ykods72ip04xjs1xknrc0xh2piz3zsni48kz9b4syq28h3uybaeezcp7tnbwapqgjxegk4qqixmeeidxxl4qxcxhk6fwjvvglinj3otegx435sfqloa8f0n74xtqe2u2vm3uf0nzzg0x',
                description: 'Ipsam assumenda optio. Ratione illum ullam laudantium placeat eligendi at corrupti rerum. Laborum repellat dolorem iste quaerat. Et ipsa dolor in sit placeat quas quas voluptas.',
                excerpt: 'Autem vero debitis et qui sapiente. Error assumenda error aut molestiae. Dolor quia debitis ut sit vero possimus consequuntur aut. Provident aspernatur nobis modi a aut possimus. Quos recusandae reprehenderit voluptatibus exercitationem qui qui amet sapiente.',
                name: 'bhcwuqmfi8q358m8a6ai3rdx3golrw3uxg0del2xg0a2no9vgxm5i42krw3v0a2xwr4vfau0vmpw0ybn2tw17xb8hss0afgtb5c9etzxrmdrquza3nifwxixnivt6lwt8ljqzhi3pff614btcrf2pe3qch6od4fd6xi2w4eipserlhsadb1posvga5rwjb2xxzpuf4b4e1o0f6iocffkd1iebrkumcdyelo66zln1ssacgox26rtywck1asquhw',
                pathname: '2tyhpbdxkbt49cjusqnfaogbug0q9kqbllaegiognqo319dd3k6yvu0y9h4hsab1ib8sye8tntzxliq0h4ti6nk9vhnj7qp5j3sidxeluc1ddsb1wzzjmmipkdfn193pftsja7l6teyhkedsdmnqjp97avzqqy28twkig27bqo2lu1q9d5cttvzc0u9lav4iohijcpfj0o44zm64e8pfcxw14df73e2mlhuayx84zba9kc45mclsprb7dk625nxtvkyeeczbxst7hwvl9vn664u4f0r3rhqpbzd4fwu650s490tu2ol4jvkddefitlrjre1dyfactt6t3aqqcwix3p2401x6o3zkkzgms91o6qadaeguaflhbcrhphvrxdo5xdcxmja291us6ajz4skc7fbjz2scf26yc6ebi3pl3k9oa71s76wwvl7vch5x9zhdeje7q7wcz7ts3lzhhaezy7kzhvn6vvwnzo9rtjbyx5sgwa3plsc1mf1zcel28ftw1v1wzckd2144pya59fc0yggu8h3ucu38l5z3ky8vapdi61qgda8qlqhfa7lto1m6mkdfaoi041kjj0yt7803oth68zld0f0nh4bni5bhicjhr28ub43nrnbnmu3b4uzc0jnktoahkj332ldr96e6tli6drv66tncxyw996k94j0h8d6emyuh7casrp62oldby9fs29aoovqanfeulwqmhkg6f0izfyd9uwmf4hijv91e4oj75zp0wjswyfzwkzdb9fan4shvbc89z3mfa0iwj1f6qykaeaj7ls6hcgu5h6qo7lubs5tep79zvjiuqshdflkmcb8amhow7x6m5zattb4uz5x6bzxihbn5jgzt2mc0m9t5e3g5c8pzlh8obqjwqn36qaiczfy2ijewgiua90pa2xovnwy15sgg0j9mp0fu4hckut2iptoodvcahxryox00v9px71ubd05y72dtzb6qdxhw3cml7ubaa0codd5ind7buzdvtwetj218aawe',
                filename: '1bwu9q9x9ho3qw77dhyoo570n2qp9ucki24v4j1sk1x2sx2bdbgl1wj8hn4yl9om8zx1ltunsnvh21c21tlo2bzlg71gfwitsxr9a0c2m5bxt1z0qlw3r5rzl8aom314c25h8ky7v64gftbhq9qms0lizback47y4412u23yksp875yomfunennfgheck94zolciwdtxst01nfl0370q9odbji7f0irivjmpor7j9rd50ok2qqo4fvqikqhzzuo',
                url: 'lw7a9621j1ukg6iprb0u7r4telyc7fbhza5khwh1uk2dvrpw3rrmfwjbqosupoo1vehc70crey4q8ai02xmi0qx3dvwqosb6ketc3x42co2ff6nfv1i3jy7c9k881o66u5mr7hfn5e71cq8le1zupexuts9k4j483qzsn4mlfxc7ean9dh70qfbh6u4eytz33j69xb0yp66ux09uhukfgd2leha1uayglq1vgrvlvn7z3q8vfd25bzzw0hgr35bgo61h2kyg8sjp61hr62qdfoz028zpq2eyyoa23ijbkjchfzc10gqvcf5pfq8em9b2shqk8l30phddjhq3pkton6t46l21xr8sywu5umjarmauo4h8ixtpzbtvhd7tr3iovm5l605msb4e3olfnj6jdbqkln6osaydw6n856bh95s0n6481zlcs0virhwjuu42kntcf8v0lh4t7mu6kmesw6fol0xokzfde7yldbv9ymro6r7hhky2szeelbv18i6vrtcvnirck18wiuuquuuxdcyaxrpgn7666d53qssxf0z0pu8njbbhazqy4h6253tlpc0c0mdd1mt5fegnhw12avlf4l0sqzzfb8bipxvyuguk393mx4w5rn420nmx9oa161q8lim5x9gxkibzpjs4l5qrmwitw5fhronon17ruw7lmt5lu631a7zplj9hpsqye6umb18jgox94cxbzn0an005cpdcevzs8qgu724tfov66bbp6tkl5mgmvxg90am446e001daz8q5isbkqwkcm6dg7o45ybgr79huzyzfaz0n4h2ylxs0ebipzu6yotujthjkjv416ni05q90uhpxnnpx8hiw100ohbrey05r7eitllt70wpndv8n5aht47m1raue15xtugtbrfckyqy5uphx1q6ha2vft2spm1kk8om25zvfoc2zgkz26cw2a2ino4vtnptluw1n861lscggdchx8eg8t307w8dmp7yzd2g33kjs901t5nzmv6ooze9f',
                mime: '5pnogdr9jvy4t5cjueyrqj8cz090m5evio3h4th1zsasllvdwy',
                extension: 'tp8mpgxmu5wcou4vrtq50vn2jotf5nscso1kv774trd31sk1p1',
                size: 8504241035,
                width: 569615,
                height: 540179,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'r7ol1iedr5osevteup6ayz3ygp2m419fopdveonwr689156l7yb1i10hra68duoigntljj43s57miix20n9lpytvxq8opgewz0ds3fdl6qs22hrsvzlgtjzxp9ue2dg8xdiqxhy5fa1wcaya4ub3zhgp7nh72vzbv2yxs8ccg4r65xguw4e6qe86qcywktlxykn4hx1tdme29yfouczkcz9agzrykk8gcruocp0el57lz5arq0bju6dcr6pe7e3',
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
                        id: '3f4b3a99-b5f5-462b-94bc-3ce822943242'
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
                        id: '1d241a39-c37f-4419-b67c-1fac4237a054'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1d241a39-c37f-4419-b67c-1fac4237a054'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/8546e0d8-4e67-49a2-b190-c9275c4e5f43')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/1d241a39-c37f-4419-b67c-1fac4237a054')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d241a39-c37f-4419-b67c-1fac4237a054'));
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
                
                id: '400613cb-d2ed-417c-8b25-ed94ae4766e5',
                commonId: 'f2a5c6a7-5977-429a-aba5-0d086528953e',
                langId: '3259b109-8d4b-442b-9fda-ee24bac7dc3d',
                attachableModel: '1dv6aiv2xyc4vlfbnh07e2s0tfzp9k8yh0lbxls85za26me3ag26zwlq2vze9200ico3l7fbgv8',
                attachableId: '15e171a9-c4a4-4400-b676-78befb6ccbb8',
                familyId: '93521fc9-7240-4d77-a51e-c7b2666eea3d',
                sort: 610643,
                alt: 'wbmgm8xkvcg18gtq57kbsv734s0xjmolr1gnqaodchl0ws7mu3lqj0m58ptvgoz1qwjku5u1w0ykociqc5endanv8w8vc6cbb0ismge9n7jc3a0d2o2w1rpczlbexmjon32wuiqdddnuumis4gkj8ifxbo8j7et95lpanydvqr5t9h89gvhsy9lwk7tp7vdr8nixssy0imn5fw9fxeqv73anmvn6qz5ma4g311h984kevqq3inomezm9tx0e3lx',
                title: 'u75ry6nqoe6sea9tjike5ez59tpio5247ehlcc4vbag64t71wpkipvb1jnycud191so5lg50rovybn7whn8o3z32gdgiks95h59xrkvfuwsbzyokmdb1uyzjbxrufu67fazh4y84td54r912nfo9nb0mam1uscdct9ppco160buoks1q28pw4z4k8yuptygyoxluq0sy93xc8jc6z9czozbssx0uxss3dz886r1ucnvl4p2ng1xvf6coqip8c98',
                description: 'Libero perspiciatis nobis. Incidunt vitae odit qui voluptas. Et aut rem corrupti possimus quo porro consequatur velit. Vitae adipisci qui deleniti et est culpa est quod. Ipsam aut modi nihil inventore velit commodi quibusdam similique. In minima totam.',
                excerpt: 'Velit dolor voluptatem. Voluptatem sint quisquam ipsum ab incidunt. Officiis ea voluptas ducimus voluptatem blanditiis cumque fugit aut voluptates. Ut nihil laboriosam debitis molestiae ea ducimus possimus dolores vero. Laudantium ducimus inventore. Quidem in cupiditate sit a est quos quo est vero.',
                name: 'j8gfjmqb720vdwta3ou04p8jmsc877vzk1afm7pyb0sh1khjy1lx9u1nfg3lsrgludgk1a9cjjtx6ft3uk4ndobjamsuarb393c6ofh87lllkrom7xryx0c44v07nvzaw50gj6qjvr1qvvln8peikmzs3iv522htn1etm7qh7i9fw30p34gnye88jaalawl9yctcdip0z6yn8o26ly4y99cnubamhrokxg98vlagom4w1kchgnieq4n6vd1n7ht',
                pathname: 'c9cfhri0e6phb3c88590kglywtdzi962zc77aorqvx0j4dt3as3tdwp63e8jgjumecmb5zmr2xyda3v1aq6sb0b7yl2zql7yet8t9j83y7s4s5wvlhyh95gyjv1n8gjdim5g1wj5rtts7ja8dxxjf48bnyomijkvvat4g449gp3sk0cqjw9lwmai2gl32icgyd93slbfpig7eny954msft0g87r4j5e047s991dfp1dqbvhpqacvwnffc34w6eetdti4gk1xmcafjjzx2hv5hy74m00f04en2pqjs0ioeb6e1vivlse7m9cf3nvkz8vkz6zayppkef3kmbwzovqsadcqrc49gk8u9b3s7v1i4trra71rsy9h073qmx411xokuxve1iuj7veo49pj1emtl2vfrgo117gis9phex3bxrdlfo22yozx3zxfuwr8aw6v7mg4ev0dlh7eavxkwa86363w1b3ooc1r4h7m4pmb713qxieu4n8p3v6vffyij6jifumedpko0t5edcv9usrxiw59r54xd7cq2xx87jewmbn0sk2oiofuyjexdef8xqpzej874g02yjl1xi120d2x9oyyz9329p12wft2dht9o04qzbpgt1oahudebdhec8zr1fpp6l2h5vzi20vvznrh24q41pk791lf4av0j1brz8w9ge9ohn1b164530crn8ejepftonnveurjay71ecfkwt00rkdyh6kexc1o6xw62d569itm7aswf8z5w85zh03thutoc9fevyxce5psfbg5np6zt944lo21oh14v7dyp7mk532vhmpbiiaak749bvgnvmnwvbb17qac66n2nns6o5ru2vste4l01zfny7vjq1llnj74nmq3ktowv26vhyd6g59dhsbb0ktcbc1zoar4mcir931zleja9iz755tzedcr82tra1mxhhn2mejm23rz33cng11tjgid1h19bsue6ghz1cix9h76k6nfifqqkdszjj55x27n76nvl53p1pp4',
                filename: 'o5qg1jfjg4v5yklaqkjwyy6rgefk5ppja1c8s37h7bu1e9b4tcvcsdlitpkqzobjmimxlvak1h1te1yjxtka9wwaocawfeeira36qqd81e52ay3yzc3up8p0vvlmp8vq1v9no6j8458k1qjrnh82cypkdhwhm805wggq76r5yi57o9zujs0nqkfcvxizx1zgvgk88f0atevuwhbte5oug5imp897508pixq545zic5tkkt05b6rjzdh6jdrq828',
                url: '667helyx56zyaong6egs3oiytt3jy02emma85x0uh4mmexh8hxsjzy43nlskpu6rv92es4rwaqalf0ra5zscqsabp2dndsqorxbft8h8kq2rqsegtq93hbnfrt170kgk1229pnc8vi79r0mozmufz2pzc28n8lpv0wccac6jstrzar7uywb2nbmde9vltdedcdjw3jftpofsanebxbipiqgds4sfw1kd31utp78ug8kvzlyky76eljtztykchnfdr29tow9frqrf5sf7hop887bh6t6hk4sdeg4mqoaxz6bafpjwur5fqzo6165n5fwt73p2j70dtvolm8gl1x2605l36htc9go91j2alz6prz5cw2y4x5rmgopfruoh79jufu3naq2zz92l9bxddhek4lobozx3rwjvk1ockg6xnzoury9rfbdrltoa0ih1glsm0128hxfvgnnyuucy5ypb4in9bol2hmlu23dah1x7m4wpd8w0avxvoh98cizzrlzhf9db3dbn4z7dt1vb9klcryoroihcfipbkbrjnkqj6v1bpa6c3s9vxfm8mb1fis2q6rc154rmu59h2j60xxdad2ouswtuvs0333915quley7zp49i503xbe5my7y8hv0kx0smm2q1je1otrqfdhziw7by7y0yg9a6y2l2hg4twrn8rvdqcjrxbkyydk33lgbi54b2ycj9fgwafpxnpjhgadk3f1mpxk19ry356tanx6cdb1aukedgc7azwb8r3g8jh6557pa5wf3p3d90rmsksdmjl5kcco3ea7nbq6ozz2b9bvtmftymi101xrw2pwirohzw8nqtjkliglokur68o7vinzcntme5w7a0jy3gtqb9ut3l0ofpconhuldpxgyut2t38w6sb21nuk0y7cir5d0rg6qmkil40yyzhoisymjmzici3085qmulzgblq9uijcz0ed8bcwb0vttafa02a7vgz7o32qjivp827biseuxcnjdfws7k1d4cdcc1ynwy',
                mime: '7u3imr47rtb5yn8kr7tf8v13rppg4iv2lmp2lko857qpc7elm0',
                extension: 'zel5oi8hip18nigrit2rkxqaba6sgb46kmh3hpxxgt9b1ed8vj',
                size: 5733099430,
                width: 476231,
                height: 233744,
                libraryId: '81e36202-5ef9-4a30-bb95-dc8582ae1d57',
                libraryFilename: 'w68r2t4zk6tqlil8rhhgyhg13hn9ldhwdzg3400zrtjngm8qjofuz9j7xlbfojfonh0k1bj8ntna5x8c0bxhm4vevmyb1rqoo9rfrhvp5ie01b3h1q0m40skqdu56rddzzivi3k3lj5l2qqlud3si0ukujsmyhcafgdhaw69ma3dwsipm9njq8s5whsov3b2lngie33jbfsa2kvlzza2x1z9akvcndsw306zn5e4osy83j1jmuhxjb3k9s77xcj',
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
                
                id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                attachableModel: 'llqjzj5rke54gfd0i0scuzse2ltlfrx8k9zh6rwbslqpq8dtdfqhgvcg4rlifuxezqp65ill50c',
                attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                sort: 212651,
                alt: 'j5ztoo5dq0qqpk9bqae4puv1qckfhkqselb4qa475jf926bznbcy5kfmb89wvl6mkqhzotc82c2zktzyc09zs7am72yggoowoqog4bml0vu6np33f8fa7ebakidlbflopuk47hkfo546z46no45t68p0lxd95qyxkuhsu0ilrad7me6reizd7w2pqpcnw3rd08r3fu3znv8076u2c60tdti57y6prip2wn1gs1bdd40c8cbyjuqj1s5z0dj0r2r',
                title: 'w9uzv8wn7gyzfobaae7t42eb5993frpyttlw48awsebyq6bblsl0v8rxdmdx9b970l39zubfb6f7wmk26z2u2x2o6zuax4059010usgo9a4hkztryktego2tqng070y4j0od05n1wx20uuahopwvtbby5901aum7kenxcbsar0cfgycbua1th1vmpgsexgnn51fepj59tp31u0a1e1g8qb7fa9git3nulm84b02owivh6beh6tehlg336mj7cw5',
                description: 'Esse tempora facere cumque et aperiam vel ut. Accusantium magni voluptas quae temporibus eligendi. Omnis sed dolores similique soluta sed placeat recusandae.',
                excerpt: 'Ex beatae illo eaque voluptatem in earum. Velit ut qui debitis harum est iure dolores sint. Quaerat velit expedita officia nam non. Vel qui id voluptates omnis facilis. Aliquid reprehenderit culpa cumque debitis est culpa occaecati. Nam nihil et consequatur libero.',
                name: 'cs8embzi3o9aej3rruzsy5i37v1c58zsi019yqvko5kztyxk1ovylkt2ltu0v0jewqzfm5fwn2w3gmeontd24rcqpr7v7tp81pug5bam27krqwdlyw15dsn519nqn1sagvzzekb8vjjiiltatdfc4kqlrdiw4dlrij98we6s4xt3bll663np1wjvgwah41tleqb84bbjv9gnjzlsbvwj4jb0uiqkr5xeoy3ut0zsbgw3f0qbafzjo7f5mvnnnpp',
                pathname: 'kibxoczv3hn6gt0tfqznu4cglo703wa7c01gsphz1sdwbvtu0d33vzszsxie0v1eu562hzelwrillknpulshcm6m6kkb7mu3tdm0o9knrapboao97xgqc690i0hshie7cbga5sfrvlp0wls74hgypaofglb1vtporrh6u0bpiliwsx55eqiv9swnvobp1injfnauo10fw1o61gbqe7cry3d109pw084kcydu7rf77h8o40iw7zjhn2wqraobwq8y2vtpoo0er1ksdqfnyohqcotwz76axscerrs1ja98j8t6j46he87tt9cpt0cjuin2yq3molkm5caigpxxdo2mi8xlci80vnc6na6hnyjhk6xe80q6ifaxxxmxhnzhxvn23wis8qi8rt00in0xiruwyr3tbns5gs16v76mrj4fgn77xv8og7rlzx2lnqjcyyg1dlmkap6xjnt5v7smazhim1tus42sso5hr061rtoon1cbhw9mpnfjn0nsyv5it6omd35g92rv34k2rchgu6n98fwc1krtul77a9puywevrutrobcee5fhu1f4hwleud7st5ljckpgzvm5uuhusxysypzidtruyvcpbwcqze3i1q3tisc0pjr3i7nmk511mrgtx1r825udn3k2w1urh0wv3blkr1ql5jiwcpiuxnqxxoo2n0yw3r9r5umazdw3hphobksp6kpda79lh2623txu0qdqkkl7uvm5nm8xjj9tyyv5k1y01nb1zd636w7wtm2qva6hcyzk9swshwr9t3wogee40ctg37x2h562xfy2kqu5xbjfx8ablxta582urlqflrlarlvjuog7xgu2pga7f7frm7s5ovtxzxrjngjye1vxx34aj1qdmszihdvbd0oeg90cvbidq7irtf2sdj879mm92ddh6yn0erk9tmg19omono2y6c9hjxxzh3ciwih1cqxd7yh7fkwzey7lt5khf6cdrus27ldrmqfcfzafi702rd5eg0r2559y2wchy666',
                filename: 'ddehbx29zlmc82gwyq9bly31qfo6a0vzsd6840ize2ujw5bdohlsrsclgxj5lhrdrspd5zewej678ovnflwua4h88cu2d4pfwdbe4c0lj2rzu93icbl9yzd86dy6b6lhiv106ic3m1hjvr9x7wbhi68zpxmwli2174hvmsc90breonx0h8v3tgqmo31n64i7thktz7rjjxxtou0jf5l462425gsyscp7hsh03qcyvyzx14qksa2e57cj7es3qvb',
                url: 'ml90p8rha70ehvz91ev3qbng094pasdn8r29jp8zjjvlsow8v134pngksa60d0dva2an9imr2ncc4owyp1gc7dn1uuug1ekbey1rm97nxmsm5sqtzbe5hztqxk4tlpvb4298h037w7ku1n0ig3ndq1ky3x1cmsfpp6pbiohuez0zi8398jfxkaibxtvpbrnmwxkw7xes24cm8d3ndwjrfppv7oj5oxl554k0w4djntpn11jdva16xl6gds51mws7q4pbewzdlumo3mxwxrnbljr7z8nwno45etww7l2yp6gh69uk4mzmtd9gnpjedsvscxja6dhmbv53hn80tbu7nvfr1a4zro96epqbx3ydujbyf4ohog6mlvd6nh4znmrin316jypk3mo1w1fx89yem9os3770fp9nfhbh1dcx8ke7ej503dp3wmisxxlunrobw4auaj19gdr1wl58jnsd6vaf8q3zxijwa8dpyj0y6mkq4ersmtwuzrh1z3ewosioluyajjtemlws3ien9dyzjhk9x2f1qzxibqttsm3hmz9r2aeigalw36u2zy0eaggvvp84ioxac2d82rpc4d0d8mq44e3tijf5z9ak2vjh69yh5oo6bviwsqh3lcgxsab8ujdx4cuunjgqf42q0j1lea4pyx2uipz8pj131un3b5pxr4is22k38v34o1ifjvwn9vn1xr2kcnnsm3mpqb0pvuppy3usuewxdh9tgf6f8k4clfa67h48coibuk281savqplbw5yqjmlrgnm6n66fz4pcyui6e3u5xud2o3ivxj9ig9700ugj2j4ax8s7a5y0ikk7vto6vpaj5vqkbeavxxzx1494silw6xpzxx1j7n41800g0c9t1d4lnxngs9toe5v5nv5pb7ahrdugi7yns3asfc96qyn9vw5jutryytdcifs9ne38t54n2tfxgcd7wd3efi9cuthsdcsuo1d1nu1i51pbb2k8q4tkfonj26xrl44w9dgdwbxjbhcyzwty',
                mime: 'a9f8a40wh8r3s6g0i3uxvleec799aekvmqpzx0kbmdax7zy434',
                extension: '8lv4n6qo4c4sxszrgndta1sy7quhtg2umy1h1kezawbmpw3fh9',
                size: 1860328325,
                width: 383935,
                height: 135415,
                libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                libraryFilename: 'k4yc87tqiwvpztrrjnc5jtb1eyeyt6on6jfi8h4srmpz5fkkkdgiz45jdrs7zcj7btkj3z37ed8ntw9e15lcyfrg7cvkkgl6i2vkzifmtw54nca99786vkuqkavml0hop8v4b85cw3263r7xhtlk6yodagx7faf1di6kx1dpkqastkc6imo8fzqfuab1sf3hq0gl818epr2xmeneeykokr9ju73k1fl0svt56bai0r95gop16a831xp7gh7n9z1',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d241a39-c37f-4419-b67c-1fac4237a054'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/9abe203a-d8f4-457f-9420-d9865c5bccb0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/1d241a39-c37f-4419-b67c-1fac4237a054')
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
                        id: '88acee27-80e1-427d-9d8a-7770097b3dac',
                        commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                        langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                        attachableModel: '57gfhkjq6hnutikkoqc0elhirj88qkt0a7uohm958zq61n2ssq71wd6i45igj3gjmg0xqsdfugj',
                        attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                        familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                        sort: 196834,
                        alt: 'zlpyi0ef0a52em47foowerj131loncyqdz4r464jdsw7m603bffebuf2jhj9qwwsukdjkiywp6ocqiy8s3mmfabql40yhy9duren8ry0vwbggf3100m32y5b0fpqq8uq83zcbzz771xr34pnc8maxlyt3pyocajeet7emwkxtiyek6185m7ttt03cppv86ughmkm8sursy2q8szp81xoi3zsswge9owmof6vpcewzl3rpsa0esc314mcwwcurbi',
                        title: 'fehuq0mjoptrwszsdlgcn0b56cmv9j808fbu9cd2ewz270z0ps9pwq9421gsponjzpkwl2q02gt1p3vitrp65bklm751vik2wd34kgu09xks6k60krp9uq6l2d975k1gospg50xxmduwz8tn3furb97rbyjuhtydzp039pqflarumx2paeq8xs75cz0vwly3nhu24bkqag3ffqgv5yslauw3b0d8a7vispclymjnrmzav28ln8unnhvaf8wzkqp',
                        description: 'Numquam libero cupiditate tempora expedita voluptatum. Animi exercitationem autem sit est sit tenetur dignissimos. Aliquam nemo perferendis hic tempora voluptas dolorem error id. Et quia qui. Ipsa ducimus corrupti sapiente rerum ducimus. Asperiores consectetur quibusdam dolorum.',
                        excerpt: 'Maxime in quo totam autem id. Eos officia nemo autem non perferendis maxime. Aut et voluptatem rerum fuga. Rerum velit atque blanditiis voluptate qui voluptas assumenda vitae. Laudantium excepturi eius ut animi reprehenderit error soluta sit soluta. Non aut voluptatem et aperiam animi quas.',
                        name: '8jd0tvw396d9335gr8f11l88xxfd08f9bv3vr7mt25th5d8bs3yjwprapp7c3ezr5hi2kwwz09y33xak1eb7kbhe8amb0ho8g164ijtcs05wx7r50z6wakuhyfzrwxbr8dclhhi84emas97vswojec7ijz357msodsil31cwhi8y7sooo7okmjbt9m2kybqy4hddomoyqj6j6wasy4erorvsgs74t8w242g9fg02c950u7pkxw6m68684q7sbez',
                        pathname: 'ab3nhdjx6hj0n1tx3ll5z4omajterm5nxkz8n6ag6nonk3jafheglr9kotmvacofngluxdmngbfygvaoj4y3kr5h02685dfdhozaedgn9yop4ujxrukn8fmuhzgkhc69cj8o2p33pijxjesh9zewm5urln4n1cu6d2qa0ncemkc8nn0x7913b337ngsfqvixkfxfzkxxq038b4t5vy1v1lgit2h6ho32ufpxdmsxyl4svslqanthnhstmixht2z7iwliy77e7hcwwn07mymcp605xpkm8fjjloq5hxr2cbxtw7qdak6782nhlvaj26jkr65ejga5we0u16fpu77i67cpasocky0kvhgvsb47mxkl4usyk16njcn0h9dkqwuo2suzz2anucrti2boj9icjkqboes7oat9hbk3bdbtlist04no162m85y0rlyrzbmu5jf4406j37vdv266wktu17t905728iws8ggvwb22bow495v32wsbk0xa3mmagvidtx3t50p7ll91el99yty6pkzftrq2uzo0niqaux4np5vgadhndilt4pb5bibwtmut2rtkhvf9qi6c4v6qo7qf52t5hzz6lf7eroqpzst209u677yb2jcn09c8rm2c3uoca9sjljhprtlr53bfh86nkkap8tglbleu193byhzv93hthiuksly4slomv6q5bji9mzdgy0zgpknwh9svdytzizf1s0dpa76b88w6f016s6c4xy75z2zkoh5pc5djr0rnmt9iujb89qlgsklt3g3byg4sm664scfxpgvpcu31hwwkpedaqfrywg2bbms6irbonm25d3p2zpnefy2x8xk1mxz7xjudum5p3ubn61ayltz21ek45r9iu8g50s13p5x4j8x52s1fxbweru6nwj8bkf2nrc7yegog0hhppuqr5pwy8a4ki2fsz3962hcd9z1j2z476sf202vaggvtq6z5cf1hwmpbdhpqqxialom3t0je0snnmpaclg810ug0lm96',
                        filename: '4vsg2zt1vqswbmgeo2cliiagihy22poq2c0kjw4d0ywfnjg9ddn7f8j90ilrxgxyuym8bso4skfsfxopnfhsny0a5jusz05mybppxwq7bha9yig8gofemdkpozknl82v1ubatnydfceo83n78xbd9c3x8e9nbbc18ls5eey1lib14m69ki0brsilu2zw5kuazai23lfqn1fjwzn783x98imvik6uphowp9l6fgy4qix501jap3ul24af0ypxmr3',
                        url: 'mb8m3emf9puj47wfdspraajrfd6f5rvipjc7v5wokegh74roqdp0jit43jw0teawuvximh8z3cgf5ezljeu2fqaewqji2uzmjioj6ygw0z8caymbzqr380omguk7fmjmiahve8ense2njroxsirczs543l70jnxowv6tfs9ah9v0pjtsb76ubof7kcq8agd8ataq6lt1dbaueqqpfyv9ur0ke19c2xxxgovymjf8jku3ft4m3olaazj78q4f2sa4wxhswo63htzda05w48kmeuzaplmi1lmt1p7h2rnum57kx4rg2woazfw2r01dgicwhg7gjzvbshcdopqfhhofy7btdxllflur3nfqpxb5wq1f0340van9gy6mbeo163yobc84yp3e1fhlx4560mdcp0iiwsv71sbyhcsxud7ab7psq0xdjml69ofe5y8orzvb3zxwzfq9ajlirxwua70sffkinyo88omqzuy9qqvrb7ayyeifts5rnzylviwugcbhx3jss700zzha7oq8mdfqdlkbvnyaeyuieec1y05m881nz2zxtoh8a4icf0ymqplhvuc9cccb23qup8bzjb4pv6j052owbkez31ladu5qh0wandxxwl7tczvqjtkj5md4z3wwf52vrp514ulfm5fim6ss1jn9ser10w205d2exvom70rzcddkoy2x050730jux9xbuzzz93kle2x119ktgf3nxv1vrd5pqf2j405n1489bjjqnzxfxzeebst2ca3vd3croizrb5md0qrl34loo8utup3i0kne7duz5xlyoau6jb1w3xstxtg0cqelkwocu9keq9kgte6yx43p4yt0ysmg4d92vwomkra7q9b1eipx995s8t21gl6vpk57eynp1il85zbyhlug98vnhq9wov83gobybq6a4qfa8bvhi2qe177ma77z0ehi7csfrkubz5b1wb2lvtknoisdc9ckl75xd034qp0qgubre9vqv1snhgy2rrei5ft9n6s1hqc7',
                        mime: 'dayxzrref6q8g2y1i59upekrh3r20lmj39gtoifs59p9i0w888',
                        extension: 'ubnk6k5sx8b9by0h84u68dlmc5oac9uoqh5g28wg8qp07vu5r6',
                        size: 4796567595,
                        width: 373257,
                        height: 949371,
                        libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                        libraryFilename: 'dk840kk828fad7rtq6on2nvq6qqna3wqflumhs2dy6twkz9gt4wumfz8p3t38xk9u0yxjz36e6sgr1hyn2ophx6apdu8x7lrrx6etkhvxp3ujw6u8jy1pgcymqpcsjydymlfufn1yfqovjvpzddyvrsa0q3mhwqyzt3czlx8wfymd25bjfpw8838daelg7jh6pkwp4htgcjy6duvps3ew5cmnvbvgh64tv4lp4034m1skckkgxr1poczyb5d5v9',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '88acee27-80e1-427d-9d8a-7770097b3dac');
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
                            id: '3f1e2a41-6cb6-476c-bac7-b782db16c54e'
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
                            id: '1d241a39-c37f-4419-b67c-1fac4237a054'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('1d241a39-c37f-4419-b67c-1fac4237a054');
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
                    id: '62a842ec-ddd9-424d-be82-b1de9d934870'
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
                    id: '1d241a39-c37f-4419-b67c-1fac4237a054'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('1d241a39-c37f-4419-b67c-1fac4237a054');
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
                        
                        id: 'b8b5adcf-6ada-4bec-89b7-2af613f502c4',
                        commonId: '2ea76f3d-9a30-47c0-a797-51ebffa6ad5e',
                        langId: '55a7d97a-c15d-44c0-b3fc-a4e36f3b212c',
                        attachableModel: 'e5kjrtd8ynf11upkop97tynpzwb20a7bbrtcde77vcudeg2tvrpts8f7ppbnk3sy7ifdrqia8nj',
                        attachableId: '26870eca-525b-4ca5-873e-81d470d15fdb',
                        familyId: '8795b714-cbf0-4f3c-b47d-6fab5e756e25',
                        sort: 336743,
                        alt: 'fgducbr4vc9mjxzypqwl7z9z9krukntkw5iylpz4s30ltv5z7yhgnnlr0u0xnf0gp3ltm7xtgeddohars4kz23zqpwyhw3y521o4pnf4ni3txe342y1cyizp7opgn0h6b8i9c8slk1z4gawqqz05d799d5sr4qxki2df9e9umckcbjneiarh066vzz0m5oosqugrb5msec6olh0aw3856k3tuyyj3xfvih3ohyy8l74515szjaf3mi8slwyl09d',
                        title: 'acopqgs76x56sa9gutjx9jvgheyq5jt3w85g4npmb0cmkkpzm28okylpfe9kv5saunn1v3wf8n2v717sd2qxwjkc699mj6nz7dsojdiqo1yshsa8akwaevvk38vgd3vo41yuibnw97lhcu3a3tvxuenigio070ifn3vzxn0pv97djku9ofoh54s36tkxonmlqvqf44mvoeaku7aaxghynlj647icgox1ttz0b6b2ieic5iyax4y1bm1ohdv5pih',
                        description: 'At tempore ipsum ut explicabo repellat repellat. Deserunt nihil incidunt. Et possimus qui.',
                        excerpt: 'Explicabo magnam quia officiis. Eum aspernatur voluptatem error numquam omnis totam deserunt debitis qui. Non illum impedit harum doloremque voluptatem voluptas non ut. Labore vero commodi est ut.',
                        name: '054x8oagbtvxgmkyz2mtoqjzn02e4mxd9ygrtpkgia2j81eq9oxm03q2tba20050bjeofp6eqvzzc5p07i6g5ifwouyt25okv6i4gqkomdm869pym9ujkrbptaai4gzxaas7gqvguwxjkscact9gq1ntt41xnugo3iypvdr10rciou0j3d0h6wol8mr9lo33zc00rhuycz0gayfqb2bw13fbny7xgef5qmis68qyotyhxerf5do841qbgidxdjp',
                        pathname: 'yfn503xy2xcvb4kyntphm7359fngabif2xmd0gcby94m68uspguo77fgx9a5ocu2vrf4aynt6homwk8mkrrdtdwq4rtdu88tclqq9gkzvf99t8urg8yaxgcra9hefj9carhxar4lleh6crc6t5sgotn2xt54n0aeoswxxduysnyag9zkkdimkdnyd3sa5tyvrgbp8h3pl66rgxv2womqzz85ybq7wn63bmzggc91mfrvl67j9hz99qzsslx5udey6nzpous1mo9s1dyih0rhzwak1xmlwxpbn7oz0j3h8d82q7anw4lkbkgbww33r035tazoq8m4z1ny8uhsiofgfid5rnj5hnh3nlvf7egc01w4vz09092vcsdcq63b0hcvcz1a5mq2xv1ecfjmtyvecv2bg3h8raluqkop1wu7csf6o5ahvxh04gkm67zkbm3kcbpf72z8ftgx08yq6xegc1z1p2ddkoyi850ytvi8j7gb6lxhkjw7qnykyoqya2ix84k4j9t7ilme7v5nnxpgcfwzua0vt7mtvj4nrwd4eivusjry45yu1ftq4uhg42nbrw8tq989tupjzid9xok87pf5iwque8ayhs0ijp6lxzkeoy9fmgqg4bmkypw27s31vz76yfqv8slwwb5wv3z5py2ip3281gd9u8wshh98zdxagmgib9c3bcbv63g9styy4yhjewwt9i1dhfm66o23a59lp95nt8emqe2js26tjmvwl6nnx9dan5f51bk7jf28vu3epzt7w2d465e3fw2ylf5ywnftxwwevo7aaursfrezot1u3ckh2mtj4rx9b9px9svavnarxiv6r5vhkn97awyq5ff5l7qljoj6ozbwzfqmg5twc7uz2z2k7a52en1r52cmo4poz6wxqfgcin05f7zkof25uhx8q7c6qajhepmb0epxbat0uz6a51tudia0erz3gtrtaeoa9nylw9gwgc4wahpmqvjx7ez3w6e3zpxnsudqznborxqwssk28ihf',
                        filename: '7rvi76xc6kjzxhwxpknaki7livoyvywukmgopbr62zafeu1wznlsgv70r324y6grscbpuxo0q8rxgp5or7lbpx8vwpytgxg24xruqsd46tihfotye5q2vqnflq7lrz0bq9l5jqqhlrpnnhn8hhnah6t5nan5b7oh4x015qemg3th39wymnpuf6ro37sneaz2xhjkda9r94zwx8xqmtiq4iunr4rtfs40zfpk77k73lepsyanjx0nv96ddg8gn4f',
                        url: 'ne4dw9fues2ntq1j6aa5chcojyctzneo6dzdslxa0x1e59s51ixcoqivqijfyk4cvoelc74zpfs0uitq8ujlj5eg4z741ux7lruw4d4p4jgv2cl3day2u9cd213mtjobsscakiw2owcz6sqjr6fv25ceij9w09jilhiyhujehc1matdxr05okanpyp724lfp3wvub845gaurr82oqu9yz2v5ynxucig8rkik83tegsvcznrnt7s6ror2xdjkulxoxez2mr7d32sfaod74vedqmy1ltt3tsksvd8s1sx6df3dkp4mh9cv15hkvtvqp71quso93jcg1w5nvdqner1sazirf768e68kxhpb438ckv6z2xhhtmace2e3yyg29cvhgw0ka0zk73376gslel51fbxbzmbebn913y521m907ol8dh676dchtlfyxg88ihids2wuhq7i2evs8gzsrym9irwsxjyduqclcwcbgv7girsxdy11dtni2iboqom9ai9gt36ca1yvgrsfu3kq50mtoq8dc1l8znov8cmpiisk3zglrlh6uwv5gh0ehzk9vv2f4ng6fdkc1zmg94j6r2ho0eoku4m2wodzgehh9i0ek7j18zas7vrsr0u2lzi7k3abbh2fj7x6y2ww34bt2im26yllxv7qv26adug1cy5e9pitiqqi7qgkt9ftydvis7km63freu5nlgb3srkh5xu0nfxr727k1jtr4y6gm21lyna2txw85j8lm9ikc2peon5a9wqjsge8bz9twrv71zeiblxpu35wyn98pyiscx5bsgvb7i4vo65sh699xqj3g8bpk5q11pa2i9jc3kiom93xa45uq795k32jcye4he4xsei7kdojn7t5zjlh7gre7l67h6zshio2skjast9riiw5cajb7cjvx630m7uvgwqgtuwua8t6q141uezxh6it4ibjginu9is12t8zbhutnxvmk125iq30cv658b1cvm61wcxzu4gro3hjp9ou57d1cu08',
                        mime: '05ns2xa2krgmi4inx91tje95brypivc6j2gccpetyyaojas27h',
                        extension: 'hhmimg2ljd7fd18abrxv6jngpjhn52elfc98m5by0j8fxhz152',
                        size: 3423024970,
                        width: 933287,
                        height: 751242,
                        libraryId: 'b1e764b7-7260-42f3-99b7-f6d2e9d01977',
                        libraryFilename: '98694tvtjzptx5t1lwxihpq8u7iuac6cmu7rgziw929umkeeix6s7fot33cf1uzj8dkda3spycchwr6qdg292jwukv90y3twgwa608xfacm2ukpffcq7na9bwxxjdqemmq1qf5phbgsj25h04tbrwq26pmn9zunqb3k13ynriv023d19jza76sexpgck9wkpwsr61neanb117w95gvswvssd67salf15zzlwjab7mlx5aqxodx7k94oixknkn02',
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
                        
                        id: '1d241a39-c37f-4419-b67c-1fac4237a054',
                        commonId: '35ad7961-84f6-4723-afbd-4e1b18ac38fc',
                        langId: '73bda8d4-ccca-4c3d-8f04-dd5b31c036fc',
                        attachableModel: 'h0i307yr6d3tp704y7csbvxxn0cvtc3ciqhj6zfj9mfhkpawfmzvd5kj600p1prcl6nj7uv38bw',
                        attachableId: '0f6daed1-7b68-44f7-b254-fa84bca03cdd',
                        familyId: '2b5b3a2d-0e88-42fa-9572-66fb3c65a083',
                        sort: 692654,
                        alt: '8u2u3i9f6nxqituqskxivnfzwmfxl661ybatcxtiyzvuracpwuhija9z1kwehna1yd0a3kl3je636zt6m0sbkqtgoavszvq9edm7575uwnskl90jlkyy0jzcpkg3gwbx30t5mrc9q0vnk7epts56llsisr1tmx44j0isxawrprimdm7zqio9vnh17cj274vi29ipyyd3z6ijjrc576sjl7run5t4vvzeejl1elza9ozv1bdq2jhzwmlqyf8kbts',
                        title: '65yak0bmld4zqudnjy9vvytrj98n2t89g8t7chc2ivryu5m4f0motbuavsioplnz2a83myxrf4e2gflsl8aaslyt54w7xhf2inrd45lv2l87mm6kaaba56xtkb9o9t6lixdbv76u4o3aes9eydkqczibewqnisxyg3ax9ma58wbtzcshlmupqm1jbhjui999t4by73mdcxb3ctlt66aupcybemwq1rg8r8783m67mof2o2a1egzsygu7qphfo49',
                        description: 'Neque dolor consequatur atque eum incidunt voluptates omnis tenetur voluptatem. Saepe et tempora ab architecto quos voluptas voluptate cum velit. Aliquid autem similique aut quia quae.',
                        excerpt: 'Dignissimos eos magni voluptatem. Sunt qui adipisci. Provident magni possimus minima voluptate voluptatem ut aliquam et perferendis. Placeat nemo hic modi et pariatur nulla laborum praesentium non.',
                        name: 'lwpf1ppv3do5foxncbauj03todh7gps1z8mc309t5holqens0714t9sndfv986ls466p5a6pa0kqxypuy375mrvvlu5nexbyvzxnpvysehc4m1lg6w7ff6bc5gu0erdtvus5d3slqq9mly01i7orusyv4e8tropp6k5hogq9nk3jm8ydvv40h00mxxscqq88dzl3h5guer5i4a5bski6z66nqmi7w4hgb87i01oay8sw5ernyw0zie5bfy9duth',
                        pathname: 'qnov5ac2t3ytq3ljqcp1d3iseuh0376735yx8pm2aalltbptwtotywmag9cdd08ctxe8pgr1037kr1wh1ikv0fw9eqvspuobe2xqiqixvn6kdv0u918ow90vs1vvofp0rwnei7t0ufvhmui8ir0f540qbnhiul9rk4j02azh4t1t99w0ep4qoe8lm5atrh4c42g0eqhanp27q0vnj5k1byl9n0q31iqbegvhzp25zyotkleykfeki4xv75cv69m6g5xneg1qse7dj9stxgkcn4aa33n2zkyknbaxj6rpxtk9yze6z7pnzp162097rxkl5ushuk12b044jcknqey3oztyog7nqwbti9l758ohz9djx1atjxhp0vmeb3qc0zipmg02csjcvn0iahtntjsz4r9w3msix0mreq0ko4s8mfbi2ihszktvtz9bxmcdk8hvztz9r8vy36dvvz4lsz5hp4wutet3bvlk39mvzlnufracv0464p0nksqdo0hu2ofm2fohu0fooo1vwhh5jkljc05dx9tgc4vsl9jfqdwkhfvwwuz9ghsdp5alvrpqw1iv0y70hu6072wj0oyd2t2vw6pkaurdv4wkdt8ln12bgg3qfsnzathmwyn2suvkpftwaddalpsl7jehhd4966s7g1u8698i5yk3rueo8mt6w3c22qqsvfcy49p041vdshicxil573kjf49k0g18p03llp5kp16r7sub9te0hvfuvpod9vq22b2tak3x1dwsjn8drvl08elw0zm72fjagvnmfuid2lgm6y0cw4jhlq38x3o3x2cvbongtm8up43rrnsgsr70t5mpbozz362au26yqd0sn8p7iaunncno7bo8rh7kgemdrggpiww9gs1pesh1tklqpd64d5sugw4ykfqslms83w7i8sl74k3ngrd8afn29thjzn3thhaoew2giw9sp9s0w3o34g9e8j3zpqanp8kyo3wic4iohw274kaeixogbdkz07f9fkdj6cizz5bm',
                        filename: 'njrr5ttnsortp7zzhjky9p6dmtcjbdymeb5yvl423ro8ftsvb9ifzumoou6hzdaobf07vf75gitvcvyi2twjhq7socguxlvwth0tnovnxe36metreeqra1ar587xu5kobnjl387rntuc7d9hes2q70wdl7m5mgi0ccxbrfsqd2vbvwnkgq3ul52x9k0xrx2703cebc59nze00y1gbkks0vhn9ddwqyulcd04op92bncew52oy741ie3g90jw0vk',
                        url: '3hrrx9yaliexiulu3pj0q3bknse2rz61ksbxnp7d2du3w9s17rw0ney0fd8h6wfycs2h9mhq96lkbtis7u47my7yvfntipzzz6xq3ov18jtcahxwur422wbj00p71jx4b1chu8be4r0kyvgpiuxjksfrlf67wdz6eeibngdok3cjped3zmzzx3xfgfc2irvtl02veu3j88r792g5a7roi3rzm9kdlsf2xarfo5r5x843qpt8apwzo0q09ung84jyapcffsrdgk80f2tc2wc86imyxqnwn6sz7kr2m6aufzwppqarl4dd09umogv1tg8mb0ereuzv90shxqt9o4olnimzsx47eafmazuvhu3jlzgipyp50c7suyjxfnumb27nefmo7ioqf2eabjmxtu0cltqammz2cshqoorh1cooeb22hj863vv72vd1bc7vay31sjbsdtqcsf9iz2y7bwuxgq1g5idfps7on7uebvyb0dwesw91r5u10byrd5gc68g5baoz03r0ugi51a6txq4titefoiedz9qn0sa1iyulfkg4d7jiqdahymofadohrh8r3miedziczfg81742wth3pjtgr35u27j3ga0pi74y8dd4x5tkar8u37ke0z9p0wb0st4qz5ks0yo6h8a99tily6pvp00pegxw8z2nowqgixjxxlq7u0iab03x7ud0zsk8dothlkfbyeavw9ktp5ra5ch3lx5s4i52oh8yp5ltvd7ll5wln4gv1qw5etyb6zh31rpyxashrrj8gp4k9dfd1dcyerh7ina0o60zlm1q0ufis3335b0hpd9pc05v9gwq2pep9q6dtvy5vlnhftecbcxsoxlzk1jgo0d8zguv4l80rh2c3y3dd5xjkyanz2wc7pc2jv8ta7r1yn9hvw60utqyddhvehk412jy67qjneuvu1e0izo58imyl1a9mlbxl4uix4eif3hxuxbudhy616maug8619ye7wq8x3zmrwm8xpxoyum15ed9gp0o5e4b',
                        mime: '86zh5xfp1zb3667gq6oxv8mqa40hki8z9harjebp515u8n3wqx',
                        extension: 'ake70i9hvz4le6fzdvsqdf6v7eeqh9nwa0syq8dbv93obkdi0v',
                        size: 5784330893,
                        width: 810722,
                        height: 362923,
                        libraryId: '4488ff67-2506-4ca4-98d2-056d27afc91b',
                        libraryFilename: 'wdgkoewgrsxnivgg8uymhu5o5f84ia18dugtp83r60qh64967jsaxmmv8ia3pcrhudy60en35vvzvhi9ny3mfepzil1kp2qp5d7cjw2uf59nfyvq2t2wth2kh30izrs82jfm8z9qsl080wei447mltu5bol1jer9kdl39akq4mp211oip3cmkc2alj4r5lf26ldoo1tj89gg68j3u7fmtwstxih05x9qjmnkmn215q2gazgm3o861gl4kmdll4g',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('1d241a39-c37f-4419-b67c-1fac4237a054');
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
                    id: 'e887ade1-8f22-42e9-be50-860a1ae7a522'
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
                    id: '1d241a39-c37f-4419-b67c-1fac4237a054'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('1d241a39-c37f-4419-b67c-1fac4237a054');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});