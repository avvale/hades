import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'ht3p5tiz6uvcqkw9s1jioqglqi73opbeq0vedx8i0h76gqcqkb',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '7l4r9v4ftq8zigtp179m',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'zeoo99wgkgukzki3zbxl5xf2t07qp6yo42l6i1z5h8m1ejnnw9q0bew4bofmwio8r3qbhj1lptz22x7zonxk8yg5toocnq3985u6cmhxsisk9m8q3pz2vfifodshi6q7lepq8wp54l3261w5w20ca43slybh223yz1bhlqbko4wmsjw9a3hlagsuizukgq2gltwsgvm69syd9eddp20l68is86ikr7192crteweg2n5rj4femezk6fnjfbfzx3v',
                name: '2be5gdbj4s5oilkgr11cmtgs4pw85bo9cf116e2muy9rcfn0t7zva433fn3ldobskqsyaoppdim7mqwxr1pttayzwxrbaux7vyxtmzxknc8f1oi3xh1rpxb23lkwbp8ttjby609vgafjz9g625kp5gng9lol1ztqsx1sa62xyrmvdb06pf83ljg8kw322dyxlwfjgvo2p6dnjhyu2buc5269gx25jw9btw3amk5ailzpmnebn8f7pn78qjzd1kb',
                surname: 'd0oj5qsb0ci9ozadd0kqlruoejoqk4krx7olb5cwcg7pgegkrhtdc4m2euun5i06hsmarqe3htnvg46164oqi3g57yyuly026lhfaqpjezyddwrsidhj27q53fz2fmtikazmv9f2i7d6i896kair9rrpdatxov2d81bd8w42sui511ctqitmxs3v4t7njrbzvgipdgv2b41tsumxg473agyuls9msekyr3343j97fbbeo2m8x75hhzfh7sz6cze',
                email: 'vy5bce1dv6c22gsq2lofsu3jnstju8veadrkebhlgyd9arbuhiiqh42dhypr5vz5iz5a3e6v0qt96bsuigxpnt5912uer5cnhqd84ogcm1q5u3jfndtk9i8f',
                mobile: 'wo0d9z9i3nnk4g0mkpamdpcjan864dkpanip6ehv6u7inzgtp7we9xag04w3',
                area: 'l7slhgmvpc6embewkztakqtft2546hgoslyt3pujuvsjixh632hsz8qgkkvs6yl80aijjtj8rzl8bl2zvl200zht5y0vqg3067y3qbqprw6xeplklmbzj66h8qjrm0mbywq836guou5iclpb0jimofl50v2uh9nmudwnb2s258um0yucmw6sybwtn7fqil8uwebvya2sa2j2xyj2w3095fpvd9g06dli4q58amk8r9cdo49qtanrsthmbc2ethn',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '4bdctdtsa552xnb5n4772xbre0sktdrt2sdbr4kaq7yawsbadd',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'nmrs0n2ikobebcksilyl',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'iu7t0c61feyoz4s3cumjlc7ov6kn0x171juvzxrbyhsxzpruy7zb2jnkesnn12rugv56zel300ta9k78kd673xga6sfxr47eoj4bx7oop5zxsm0omp0fj89plgxibhyfwivp5zu5wus9elcy1ubj50430qx4kqrzfxy2gokh75c0by8e5dwdxtluz6bqahqal62tgjlup0hb9ml86y7akslnxplrxomsiyfdxcozu0k7w8xsvp6ko6dxggdgtzd',
                name: 'clmotxzndzdls3ppj3s6k1wm0hchiffyj64f4b4o5ft88wuonh30jt7026ahqbkma6fmhgr8eprs5y50k3yp4iiyl8r68347htul8qhsuzqvdb919dlxjqbbiopr0y9zx766largz0st7c7p0y27oaui7irc4quvadllsckk1n4wz4bjgwqm6m2p1zxyjv4k4knfkkvk5u6eg8xisx73bpmj9krczowwcw4z1lh5nd47jywexf2mhpzcar4t39d',
                surname: 'z5xzd7mh4f6dfycdug6l8ryz4kbs2og711lemdo5qvgruyy4xtjuwy786qexzj7b90hze4a6e8g2gxo793cebzkhmximbk45vaoc2weh4uqy52vm4m960gc50zt5zb0t2tjcl42b0f9zfr5ek3qu0k76s8wqqsjgtxca0cft5bwluqvdhrb3sgo5qbvrdwoptbemdgkmeljpocigz7s2wl6i8koh9tzta7j9grvmu49z04t8dv26g7khnbr4jk3',
                email: 'tg66yebn29bzofokshvfgikytkycglkqnk2ya2dyay09zdud6szwf3cx4t4f4savdvpikpkbwddqujejb8fbski4v8cdmvmfdbzdqvd6qyymtftoj15t546q',
                mobile: 'gfz19ih6q5a4jeojizsgojks7f71mb99agbiji63tzlnnmmjqrp58u6xqojz',
                area: '73wi1cxu41l1bgnpniebe2vk724v8n89jljru5xdfwgjxu85ac9uxwqy9d2yukuhu48tcam8d6auudvoq7mc4d58jbvkl2vzd0kgdd7ci64n5g939eb2i9um0gma4szzzucns99hu5vidxx3dnjm1l2o6ht1xshpnusb1a8hf3ttrvwhbaloxn7am997yuh39ecef6ryxkim1nbgkmyjxoz8nlxmizexdreu3llvxqrlasn981jvckr1ss9mq3o',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: null,
                tenantCode: '94hkp9ltxg8w0gib6k32g1swfjcjvohon54i48vn2prcrv1wo9',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'pfsjlnvs7yw2tjb7133g',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'j4esqm5rww8rq8k3ftlpxsrqpg4g9b9srj3jp171b9h7zzhxp24tod7jc4o4qwg2grkfednf7k17b8jb5l5rmbzdhc0q8x3e1b7ap59k36u7mizuger3jfl3cqc0mjglvazofqj7izbyjmsv5kmgtli6gk73aumsf7a71qk0m3yrlkwisr9jb8kn0609mrqdr1yejkm56oo4805k0v0mpbytke7qm1g7r891wr5fle2jzcjua2ykh06hh35f19s',
                name: 'x1m5btl6qi9b5rghrypdlm249mtyvbvfk4ufjmauudos3chihl8mz3i4egpresy99ggvbtmf31nyyjicyont5e9wt4zfh1h0q8joxeum4ben2wb4cba4hu0a1ftrehhwgrjfg9nutmsoivf1uxkq7y5hb8i8gdy7k37yrh9id4k7swcui3i0fsnfsj6ccgzni5m2wi4mjmluwr3ezzafbq7y116eldsfu2drezd6z77dzsrf8hnxvs0omhzhk9p',
                surname: 'eb1iiffz7w4ssv286onvrcd2o9h34hvxsdkopzbmw3dmfukvbec7cvu3tif1yvfkdts8yys19w1d9wsdbvw1xv9gjaimn7436nmzwc2xrpb352cyhxzn8u7gkg0ivylbuffyrs12k9qoltp91b19xrill79jd8f1e2cns6bgv5m6fq8fil7g8e13iyaht61ip9h9n06hp9julq6k0y786apa5jpw02us0rodejzhx8magufqunfnek3h938ue12',
                email: 'u8umw9q0z2hpmx90u37zay60lz2hlxg3bbfzaok6hyby7oaxlezwyrr6ac6m6lxitf6hziqkqj7e827hxx3at6upz7j8w4k2sh69jhwo4vpwzvyvxgwyjc3n',
                mobile: '22rkn2fn1tqwcfjuxkaxh6e2b356vxsbzx7buf722cbbeckxldbjrkw55vxl',
                area: '1ah8qfzpv4uqwgocjvkow7nzpc8cch449fgpei24r4jublsydr55h73axzptcagct308z5agzck7tn8kq2htb1at4yvqrwomjz6nrc94yaltciurps4x4flpndsx6wywtabtp7b0ul9vcua4fg0geseh3bbahokmcs3q4slzz58wyb9rgo4an1hsy6fenfnrffxb4ovnoscrqptp1xn7vmmes9b5ze3v6drkt7fr1ihrx6c8m2pet4q003xqow4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                
                tenantCode: '2eiq9al4a0qa9yv6cocj9pol2h8xjh8g9jjdd8kg936fnmhzr6',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'clgt7bw4wmhhzpt7kits',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'r2yljnwxws0bvgzxy25aq864u4sny2s58vpaoq7xg61atntiyl6i62kdk5nnblyytamy4nj8uaj7hu3zpzx6zhi7pxpvsys4l5nvof6q2ndwyimj98qezt24ois21z52js6i469y4451jwlf0aebx3qy43jshiwvg412fz3apoad8ijlbd18ra14q292w8kua4tlvlsw3887b7fb4dri1jfyaxzsb199vvhs8lqephonv1dhepff2bd5y3nsvek',
                name: 'zpjonggssqjg94quigoq3azwn4vh11dhynt4fhbpi4t8xzkj4624679anl15w2usdyvvfhc75bx9paan7q7bitlcrl1rwyupzbgkzr98t3lgfcx7d4df0k4wzshipoad1gxipjz2uy6fvmwxtd0a2fgpe9zgnvqr0o3ttsx1nnhj59zcht7pm8tyj2r4yiyup9l26iwcdvgxofvl676uelsuj3th68uq4vxricph2wnqi5fftr6g853qbkfyx86',
                surname: '42e8ggnnhy54xk49qewmhc6ljhizgv8u1rvi2xwa3ptdurz8um33rserowflk5n1g8j7bk3dvfiam5iru4r6r2e247tzijeq90o6dmm1yyksae3g6dgh0biutrrhz9k5k5kxnco2fvkzm06j4r5lb6yhv8amtxrotd4mb8xupw4u6slsw18rqri8vetlxd3rowfz9r7onb1f09zkm8eoy7vw4bsdmkeo3xx3551t9b6txhi747octtb3d2u4hnw',
                email: 'lehyj4s17j3419o0q3rxcqp5v6mu37z3y1onxbz54be7zoa1d8plfj379z83rqdoycnjo0g8rpwdkp9kg568ddw7kahx9d5g5mfbsb11x2tnm6fjk3sw58d3',
                mobile: 'ecuqwfgf4iartsaphc9br1lboru0ucuc48e2wl8cg6o4hjpqr2dmvyos7jx8',
                area: 'hysn6wu7ok5gdkcv8uuq99hpmreuvxxj5rl7w2xz75204re50hnzo0oesmy27mdg42t0ia5onkui72d2ewd80fxoaz8aoyrpnhb244nizc927lnhjav4vxfmqauws01061p6rmv2yyrf5zrvn1kxwqi9amg649rc6ejt4zhxqxhy4jkalasekuumhz58japmzv7tcwrk89zgen3p9xnwp0szrygg8couamqjcsvhhrne3cgcjs44d6wt2bmuqtr',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: null,
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'zvrvz7m4ibytt5o60pak',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '324kc2p8kd05ecxda7cwv8r6ze1xmxxcedxfov7lxu2xv6c2a1cd4t2is7noriwwb2w6iws8xla443pf0hkbedxcrp5hc96mt5cim0syp9tb44p86yp7um4tg0meu248xmbkrvmuk16fm7p0agjhtn60340o5th9r1flruglhcheapic7pvy4zb7963kguhgqw21u7cbk0kvu9nlsrees7lpywtems6n0wo6avkty6bh9aj4nttpc3qutz5ypir',
                name: 'wleg496spq3l3yd5y50z99f1t7idkwyt3opv8gcpw1mcio7btryrtd17dvqwtidevpznabw4zzxp3w4u50norut83mg1vcy2s9gr9a27kye8p34esro9qd1115d6saa1srvaj591qu1av2lzyhltygo4vkz9wzt2n7vnm6lyv6gf75dz54qy96ukweswov2i0ywuhtg9k3qhfbwzqoksru3sf8gnrc5cu9t2vubi7iycr1lhbcxt7let4a1zs5v',
                surname: 'cqnv1vsy8embnub8m5bo2pemlnxe7ewxmtrvz4acqinyik9njfnot70jtqcgl8ijguo9dixjyuob8rjlthbcm32df895m60ogkritovhzqge23kjnoknluguw7nx0jefweib9ij636ukv41dfqz0jvnz3qov1qqmemcvyin9apg38mtf9csj1rorwy9frs22ext5tct0wt7ferzv00bnxq49xys8z35bo8n29yk6ktptw3j8hb9w97gzhuw0yov',
                email: '8f8vz58cnvjzh5bcppfsi7ui32zlkczqhco6cmqxzv2iaj6mhkqa3thu3s1svw873pvftv9s4i33t9l08db4svcgayl4ylniuukay36t95wglnkg8y28ijgy',
                mobile: 'tbq0bvjilao7l5nji5x1xte55knf053j7yeszhv337xvkdhpbpxi7kyc8oay',
                area: 'ziiujcwx9or915mk09ucl7d4mkg8j2cot9yj1xe6gqjxhele7w4h32694cigki9ohnvv7sygdq0169ppv4llrl6ttw8kt2qk4sutpjq1030bszjfhgdw6gd7n5wo3ifhot2y05yt72wv5t2nx3dax9ycep9kqm6rgifzi44kb4dmxzywfh35hintayb3crw5zd82u1j8sivc60awojq2j15wyiabv6ks11369ll2iap6itb7afblk3id2tuwcyz',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'hmirmhiq0nn33q9m27iw',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'v8f5szbnuaujyczc0rryv2ipaevao3jphnqjqjniffhfvh46xue3u83dx9v85mk3w1h3bj0gku9bks4wwq8c33py85l8yh0vx9cf4bt93u513opvoo4imvesubciy9rr8199g35q395ohywk4mgthlo073x40lh257f9uxhg8z8zirgdxo71x2b6x9e2kz8z2qgkx13d8wxa8e8yz4omo1fcdbnj2667kxd0mmx9nupwywq7ue18ms27oz0fatd',
                name: '7jswjrvtx7a0mj6dlnvbqsqlkdt3fyxjzugnpf2rziv3b98s1axvvq2y6bwu18b3hp91wybe4ioivqudjqdgmh7rfogelkhc5rbzr7spj85xezc1mz702ygt1eialqbblcirjt6d5ahdtvyts656k04utc32251g2t8r6stjeu5ag5cf50gid88ypzunz7u00nvlaqqjhitifmnwvwg2aky74dqy3g4brooqaqknhg139vhbqnybd5g1u2yohiu',
                surname: '8b9bezwnwu8h561dxo5p5khexq91931zlkudwvphs0yxufmx1bnpbejxtl68or1i3k4fxvp115w046crpmdafvzyzms34zronqs1jukunvssw5f9kte0s8ln0s9rl91q8hn1s1m0u4qr9x71d3s8w240c1syw4ycgz1wydo5o1wv09h8vy7uwriild6v1by4q3tjw7l7z8i10pcfac4o6huuncqjxhzm09nf0g765tzhynoq26pb874u1sxnuqa',
                email: 'ckfmahvfi0yo0xya5bxasoi47pdlhp8d926a2677yaoazg1msov76taaiezluzmgu5k1y2s2mhdk3b5nb7kk1jmia0y3pxgu216k2q1nbcyodihf7n45apme',
                mobile: '82obsb1l786rco3yuq2lubex9t884524560h6ude23x27itj2ltsazsy425g',
                area: '3rc8wgyr4jzadgbhqfttnu0sk8o5lb520w6d3f7zs4y27shz3jwx0ylhgkakxgmxtrfhfgyeplhbe3kfvly8o9da0ignbm826siso3bo4o2o6z1nv1myjfl0jp1vkvmpfxw29nudgfiocc8kcbjp4w0jzjebuxcp53va4k4wf8r5nerxsexhvxzt1ehb97g9mzyj7zbxbm2w81c17oxx2xjypum6j088udoyv4y78mk2h5niknl92fddd86s0d4',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '0z7yp5jnyvq45320zu4e7fn3pj0x9twcg3dpkoe0v9v7erxgw1',
                systemId: null,
                systemName: '9y5rqobt18luy171b9lu',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'om4ss44zvv1qtpixylrama8vv62wg9qg1nbeidkbgjal8tlfy6hjvdxox3knd3w539cl1d605rhb60p7l5ka08zcm1tsgnsc1nku5oung3xh99pmy9ptkxcc82ydx0iw0p5amd96sc487mxl6pd77ufxy6wec5pqbj08zdfddho71mfp9w9bdtz16ncg42l98mwqf0fwi2998xt7gh645ddcpu5b17b0r4k412genx81xinb1rgvycpc8a1wppx',
                name: 'aj2b7l66hgjgtc6komcqdi8dzx0gvhj0tc3so4ru5bb5kt65zln0hvn8jbmccpu5u3ffoqvksp5lmt1n86f1qh8m76xw9vlhrkqwmcswm1bezg9kftmou0jgp9w5qmch56spptmunm0j2d7ot9cmjt0o3nyc87d168d10f01iykcgdiy2mq5pqfl61u3jeo96dtsdjomcgicf7o0icc6vn84l5y55fsw79v1vaiwaz530z3ceyov7k0oa6aqn92',
                surname: '9os3j2jgo5qrrphu27psse74sisasrzjowskfosn5pqersf4a9q116eg7igs9ggo1c6qw8s2r863euqymh400mhuhnb8zqjqbz434mle9yz1k1192yptfm8vcfq88xwe2nlx6fdp8km8cpwq9rxhd0hdhxajijr57f1pg4p0bvtrtg3lxy6wvhwsme6my83x6c0xln7dhx55gk4365kjul9jkh8fyrkovjuxukl56qrwkx98efdyjpmuvhoq3w3',
                email: 'ichqqrvro41te066aqlvc466ygkxdqc330z0makegg4hu6pnfxnvnzadbrr0c5uon2eyw0qzlkhnxbfkwln165uccbvsy7fpzotwkta62hov21neqgsbhg0a',
                mobile: 'veoqwy67t8zz88h5ziugr7ijt893odkoztwjkbexgzzpmggymin64rfp8imf',
                area: 'gry5iyfxtdlx3z450ye3m1dql1umhpa37z8qkboq14ecp8b4evxbf6yvpsnxk1kzvoj0203kqpih49mx8ow4c1rystczoluf3duk8znqf3qujfucz4usevhap8lkpgbph0h9uvdsjt6k5d3nu2z6knt74f7nrh33elvocmu8tngeez6k186slfnxg1n2m5r19hg7hjrwexb93mez3zae0dq0j5daamq4mf8fd4vjd1ttg8gnchp1sstvzjhu72h',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'jqk0e3d3arlqcm3qonhnvrl3c4gcdx946fshr3a74zllq4io17',
                
                systemName: '4ak8g1uq8q2hyv36si0y',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ueehmj8oxgfj4d7cic1ar564isyw69ii30rlgu5iiz7lwuy0s6vxuehvzqd6iewsug3ilyoqgvw1lbghfnlmakkn5zvuojajh13gc4f2tj2vn7swoccylsrlrmu18ygxz2yvuuyz46toikegnxxgqh72qmj8z3b9xo41lwkvhxxzbzepnzmeqq4fy5vdu2i8amrhm9jjp99hcmlruvmqiuybkymrllplu6snrklk9efr742sax4ju4fw7al3whc',
                name: '2vipkj09udoui91wj7tjcj9sx29kho3bmg9wpt62mx6csy1chd85k7sej24pcxeyl5swd6jlhu57uij5e851bfsd6qo0uhm855hhjghjkwp0evwsq5b772rgexyvlgq24o9968hgx52yj6q1ksx831rb8j5pgwjtcuxinum5i17qmr82qp8rqjdv8w2hs5ub58p8djyyhcmg1ah3yvcgv6foo22eys59uu1ppw03aaj2ca3gms20wckeqqmz5vg',
                surname: 'f0w9xpgkn1r2xykygnd585p9juwwemk19yrgmz0jdyil9smq36hnxhlheq34tsxsjid6kchm6y584enyy9q8rj4h4qpodzkzxh23k7hgbjyy9grn6lckg8dtwue8nvplp89jdfh5o20co9siaurqfqicb3x9n08j3wuf3in8sihp1mdl38ol6bjako315pad1ctggii9bthhe1n00kgv1696t64kdyms5hhii07992vql6k40c8erct54iwauab',
                email: '3mkh1kbmijnp3eer1oaqyflb0c9aoyog6n4fcc17ltmkc1c9njq9f3n4csda8v7qa55n56ugjb6w1bc4wjj70k40l19zj8gyrlg8lta41t7pdwnp0m8qkxa6',
                mobile: 'ja1td999acnhax6x6z4mxfw2zgw350jmbojrim15goa9xyocucr03vaq4ed5',
                area: 'bof8kkw5p91w6e3h509ciosrpq6j01ropp60w3ymi98vdokvhdnytgamig7phijt7ptxgorgo6iuk2sxw8k7pmqf49d6a6m5zwomm8g6z7ko72dtpjmcwql8fg35baql4wmq6qlsrrelw8ui8cnbn4vyg3n5ymgqrdayb4qiitmj1wzjpo5si08h7n4hl0ox9ggnbyy67sub6b6goykrvt1djtg6ya42mqz0m3i8lsfd3s7ue5pvdscb1rx2mcn',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'sg5g0ao213fxev8z3tydzzixkq10cz8kgsv6vdx8nv0v6zmwim',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: null,
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'lmkejvmo19dig62xzv1m02fu6jrfjm014lgx2glm6qb36njde6no5gx3neb1kuu910l5y2rs62oab2bq8sgtth1qp745rr724d3q50ldjvjbq1vktlq58kevo3bk0sqzrdawnsscgq8he7b6k6gnud3hs1qiwoirj5aw1hvtjw2gyik968r7lm32c52d3vx17mctue34mwaay9mv49zv2wira9balswb5q6rpi8f451klcd9wontpa19lvd8hev',
                name: '0yxkh6or8mu2h1zxyby0uvd8jeww5sln5o6vvhlwnv7ppkxnske82p6cgmhsg30ls78dut1x06xctekk68wo2z4cfqo94s3qp8z1jhhifh968argzw8ukii0f32hslvvenotgw0z08fx4i8i84run96eqiz9uskx799y8i6vjgjjpvkfq4xd8imc7kwm0cs2t6cdmhuf2m5wra4wgiyqixr8cjm5u5jkgfggv2djpjy0valtepp9hi2q4mwzeh0',
                surname: 'a3txuoeay4e1ylp7nkde06dw7gsi2adxcsfb8hs668nfsxpmlnzqlysobnmp20dw1gh6bl2h6bwew91xv296d15knut2hlnmjtqirx5em08py83qtz7yea08asvcjwoifuuojv3jvts9rvvsgxjkbsh1loa212103pnbgw0q9i4fwvjj64ltrbrso5fs8q2d0veafcmkqyey9w0e5ierll3zehjfubnwn9lyhaq1l3bbghp8tknyxtu5lio6b82',
                email: 'aewxj9fxztnwqnybmwrii37na657edfruzvbggx91vr8t18fmugadla4m7u7d8mt2g9of0vb8wbzx65dedx64jpyrtqe4fd1tlkly4rbqav0jzc5lrc3nnbk',
                mobile: '7icbtutorf16at2la3r0cuuv7iysjiuvnviaorp4kjg28tcvrt1ej9a83d7j',
                area: '5h0vs730nl40kan59ljmb4lg0gihjpd6hw35fnmrazlw1rjmhqc5bkw5crsk8cb3d0ou6narz3j5zj9bfbd8gz0agv9gaoy93aqfsyca4a2hlpwm81rzla2lj5kvpjp0uzqdytdpkt4oanpwy7j61vc4towj66wy9a7z1kh1f5cy8v9nk3ehtds9yoypdyapzkyv4sefc7vmbwb1iac8riipoggpj8u8c64fccin6qmn8kokz3vuidxhb9a3s5k',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'ra4bclpv3gl049uqncpfbhqdgbkz5sm5yui9fpbhc0sypw7umc',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ls9gic5g98ysem6uu6xxeodg3h7558rlq1i75pp5z4ohs1uwpk1rluus86iyn9lnnpv0t2nhstz4aruhk9jwjzgvonvsnjg6z7br2ey9xg3l9a9i370da4upg9mxls4a61wehzny5j900c6z2k3skda3er59aavdlrhqh9ohxbnfbqb4wvvtp9moynq5c46h6tqs7h01h6hckbzscba2jqoawbpu30oqrssca1tmm4jwyvoqbknstfa0e1fcdtg',
                name: '7849j1z3qsz420xtxrov1xjzybc6zxnvv5ca5dk6xm6eqdf6lnyy6hm086ndrancwhv0tngfzza9cnvr09e94ddd0rizxykb52352yrx4r2tlft181z320lvj59opoq01o86g0aso46owhwa0tf6s17u8k6y70xzvd2svuxv8kv8vvhodetvpafp319w93tunf2ioe6amvm4ebwgmniirzvvxzftk2ernvwz3jyvwljqchz2fafg2wtkrp9e28z',
                surname: '34biytwcvd57mf7frvj57vnxz6h2rdy4jbrghn258p3698m0tngu63dsm3h179mphxzkdf9ah4tjgvfoxwncvgvd7mg4yyokchtw31ioha7vuynzc9s6avg7e9c9kmqpekkqzfxu17rtwclpv9ckm0lrhgy3w1tb8cgaos0obgajdxt34ph69x06qq0y07n6vto17ciplnz3t13qgw734245fpqdotqqab2m3omcojw16qloy55sdoyeosf937v',
                email: 'oca5wflqgoytwqol9u9fkxhz7vt25vd9jmt0dbgcx45kzyh81f1ryvei0v6x2g9p8uwihm38dmyl7s1yayqzll0ll0vq5482urs6xg39k5fzc1iz182th4c7',
                mobile: 'ip8jtybnb0uo4wn7tsqe9fw1km9ab2hwln6kp6ki0cqif9jisxzn2zonakvq',
                area: '1hd5lerps4g6m1z9cjt4c56ddydkksra92orm7nx8wo8kabatd4yifsuw0t9eux7n08syltxrllz9y4c8hrwqf3u98oy41gxiuxmi9wjwlp8lwcut4ilvvnri0zwwj37h33llew3p1rtxoev5a41eysah9u9sw3a3q37fupzu3bxdthvntv96fn0ca25if9jfvsjtdrnxjngh5tyks0wlei4257bn8oqd7kdikf0kwh2tcanitsenx76vk7awj0',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'ck7gnv63ktbf4tk6vch8n14zwnagchkwh0h4nkajcb6armn6jk',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'kezipfh7ozhvywovxbq7',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'trluj8r4zqjllngx2acgy59acm000pm0x6pmmplqfhdehtew7x28s6gk3zmibximclzw48ii7bt3bffv8tl6ekkduagjrcbhym18c2wo39ai1e6b1gbihwwg4a6kteov4y7c59y63nkigpgeoxzf8vlgqig2z1cn8o5snl2ctemy8wx0oqwi3p6p99in0645a21y0ki2le3g644sjm6vnz6h5ok87l5m13ktixag8ejg758532djrkci33wiz9b',
                name: null,
                surname: 'lf9p8um9jjkkp5u6eaayfmna562sr6c9fobm28y1o592e7gg0zlo8s8vwpn87biuddeoepmh6fwyn7dbbcivcd6ajbp89h8qwrexnx8qm2dh7a9d1rd19cpza2o77ruo8dmqbg9yyntt35oqqiaddfizd5frstbyepw8eq6811nbiyavzzbjmu4ttymzwjfw3zax8y4njbpiw1hs49lrr49mo1hh8as9msjnzk4uhe51b93fv0l3l8nlvwmb92c',
                email: 'bnrgt9ewl8ubmly571g8p9aotc83md3z4pmuwiuurjlxw6ph57mqpow9wmjydpe8h41afzm6ve85j05mjcpbdxdqf468xa947rqgvcncshbq6excfttpmfom',
                mobile: 'c2dgippi2zyfbawnsftryzjofpklqbc7jgpfgcnon2rdmpir9vr9vhd42vzs',
                area: 'pd2wrgdl0xgt6hga7c3m7ux8ivuqcyu0oc4mltsskbwkogppra1h6j58xmespf4eflbxvnudh9i932z35xsm8i9vpi3bhue6913ow8wmbgnrl20a0phq4p1yhgfb19i4su74cj2jk1vjfrw291k0ixpumakveecln6db1m856bs0eyplz3alc1ex3pwzl7oy37dy6no3bgu5bvcyat005ka8ffjbu7lsq5i1n8yjzhbdjsgawx4g7h11ur5sfjo',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '06y1fm3xq0xxy3me1g36lwzgfd1m2y6ezukaf4038hkwjgetz6',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '1mqf39s02g5cw432njle',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'kxzncazidvojuw68ooej7ivtklh8pwxn39bpdbix29cqnsywae5de6zwxyfm1scvkwqjl0cm46r5z78xa0nf0axm6p1qfi9p10nmjupapujhj33wv8r7xliwlyyizdmkry093xlufdclw6s1ymfqtrh9fr2xo4jqh808b60l58upi143n0d857okq172lreulxqzxuq2eli59fg8ombs74kk9eqy4duwrfxxfrrws9bforw95rlx9sgf0hnmcyb',
                
                surname: 'sq43ifkhv9m7r6doxk0bsl37z7f3u0n14ik2ci1iwbtppsgg2p1i47cias5zps8lecwgyfqcksrw9fkieuvex2puzvm1x8jzr3eyymc1sn203fpye2qjbyps2nnxirc3dn7a9407r5dauaauqvimsydnd5lxvdyallww585w1rv7beqmml9d64fwv4y4isols67lk1pa5qvj16vhvj3zhhq3udn2cs4m4iv2h1bralbfd26ow14ticoxzge3x8r',
                email: 'p2zr89bc50zyiuk0r4lnvbq1jotsfy7yklzh2t4fcfsw3b4efsnjmvrp8h8j8j9k2a9gqsonw668ly8kyfp58y96vwksp926aqhkgnicyt8k2rds5f1t3vas',
                mobile: '4nqbqf6oc6xeqbjb9vorff5wse8kozl04x7wxd3q3e3tzrs8kai8ni3msv49',
                area: 'ljcgumguq6bita310sg22c9232p86dwh2bslye4uz6cztr32mpg2ht7nhfo7kb6nybw6begzbrawkjyy2aejg2fipg9frdg3jtqbdk9sm0yxi57fawhm5w8c339qidbwd3k6qujbxssdwsma4fvk1mgwilnc1pfc92l6crm9blyz654bt6ssy5emigix0n7cz8ug2n1ufgn2srzb8a6jlydly2mc6o4orb1e0nndyzfs7mgatxf0qglicirmqjk',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 's4p70rh3jrzrnxpivq9dd0blfny3xcstazfo05bhxw4nfdbi3k',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'o7uw6p3y1zaao0vy786d',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '47xz4aygzr7lk1zmjlpazdfyv7zcww6iua4lwb56hlwt7ekqkyeijj4j2sbswbccznn63deo81eiitey2fuu5kytkohqubcp9hx3tivrk108eg3gqiesdae03zawrzlzxvhbqtni272ai81t5s92z0359c9eht8okhrzytz1t0j9qy5to1knex0ko1s2zcf3mgwx7vhvvyqnsof6shuy1bltla7zl34g60nhkk3x4xjtrpqccz3ql3j8diliv4u',
                name: 'uaag6z5z3nycc283c2t7p3zy7rfsbj1f9vrpc1zy0k8zn2nm1zpl5iu0vtxpbvie6uaa5foyruf2knuux1040xqjcjzdb1i56yyq4q8zrd7azovd745128oeo3lmfc56lhuw72ykf9raumbn1tnf42th6nonn7si6kflc569pp8hh474b4jg13f6tyjq2hxd7bheth7rx73lvdtkwnmkhc6ymywb0uf6l97sgp503nfj5oxjkrty0d7tbea546l',
                surname: 'yi6wgy0o3c5nyfhj2ro8suwovxkpdy6m87ajvjqnsv2856v2mw0q5xj9fla33g7tdtxwgsu166l4chpqndyjgcjd763up6m1ai7brmi67pma4kg6axqzcffobi8fzkm5v2xayaq6khycwsooql4kwo2ng3zu2q1dc2eoy0rc12rih01gm5i8yx6oygdpx6vr4tugs8o9sge9woepshtn7iitowuwbfryez8dhu8uzshyc3ghevsrjfhp28jinqd',
                email: null,
                mobile: 'uvjlaqnno9dnxtkdaac2bqerepdb0ks25h5cm4pvf694hpdf5dykdhhsvlae',
                area: 'c2bx12fbaqzianizrn3iisdivildl8bftpje6ymhzzqs4zwfuyo5epwmdrr06au2qgay8a04dwc1q5famkpaqqo54pqc479b8uqbqv6kbj45dsk4mz7psm0av45mnw5bovdwofhwfyw22653t8c27gfjja9eyh3du38ryjcp6z3cgfccu001lw7cet30ceidza7cdcgf599k5udlxachyykaphtqpkjgse3exlj7ha054fhwpcmlsytdv3rg6p5',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'l2pn5vfh0cccteh4lovkmk7oxs2akym5ne8pa5t7vgv75ijggw',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'o5r93pb4ti8clg0dbpld',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'mquznx34ntql91rrj32uiecdj6wzzaxr4zfzxbh26f51z7bfpaa62uujise4aapr0sv1g2k2z5iobv7rmj1ehq63mn3wu40q1az4zzyg7285lvs59yrch0ipyuoyh31o6uhfnzyi4d61z0q8jghy5ilcrn0gur93dcf0hcuanmd5zfq971ggx3fenc1pyvi263pvve61cegl08ql23l7go1peeo6o2xbpvovgioaurck7bphe7x2t0qxkhekdrv',
                name: '2schpt14nvxygt04na24j697kkbeou91oea6cwb2ojuyv8m81ns196hg45i4tdlyev3aszsd53lbdkpqabhjgiqzezxn7so5ne0o7ciygyxluovl73gttpos7orrgkyqlyk7cfd0k8ycs9xzhdf7johq7shuovb5f51qxehy9bhk6w8fs00tr88h61rrkw1p53g6sftg9pfanxf6gb1rmmz8bhcz0heuc5zczhsjeg7rqft4dxbd4euiuwdn53j',
                surname: 'qrqtp24fbtlynkv8imnfdyri1wptl7j9bjoqonc02nex9pwpaiu3g4qspyd5ndnsgy42dl6q28hzia576bwvuasqd2xzce2sdt1akhedew1tdsu6c6qrcwckt8bos70649k10thrxc9ko8nernygmonsu7h1vogo869z2hlpinwwlv20rpz350rj4u36wg04b8peq96dyitvdc4bygush6a8ny2znm9p6pqae9a40mory7ekqn5a6r3zu1we3oj',
                
                mobile: '8ov60e7f0sj2f3nvuj0amw89g3hrv87nc1sg3sxfr4sw3iin5csnixyvx0pz',
                area: 'tx8w8y8mmck36mjha8q9b3nnmgt6f86899lfpdt75yhe3cymmkk7yh5n7ump3dznyq5ux2jlkvwq4yzwrjmvmludczsoc3rcfvvrkxgiaeoxlyl9kyrpovfdicto5fu3yui4fu69am2e3364kldtzygy2jkci45d7r5aqjldfrdtwxdefpx0m3gkk8kti1mr3loap0n6joi6k1nppem4qqogk6hufut5ltcr8mp1e5kp1j1ixz3td1dhn44yrm3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'nvkeqhvv3phbj42zdu8n1x0bd3vwseh8g5vw9obv1zmtqw5orn',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'sgd91x6mr7z3zs4pwmm6',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '5q6yshrjrutqhd3gd0msrfxionkv0kvezha4iqampx84f52r0egxg38f7b6vg2jyj697232ef0kudumacr15je1hafmybm6v0ficd1jziyyn1beibz506la2kbdgkjiqczjksu1lxbq5p3759gr29fyccnn55nqmuvk307ccbtjgpnsp7k3oezftzcm395ckq4zzoc5zldc93zry6d78n56k7m1lx8guegyagju6nxbc6vyqhlmzqxflmrg57w8',
                name: 'yho04b15ouhnl3i5e1pl4cmpo9zkva2v6ron9xksxhug0ygwkca02bahmmcregn120cxhqxpgjy8gi6te4gb8g8tqrcgjh56hyjakivy4fvhvt5uxd23vafcx6khcf8lsgkxymr68h7ssv0atlbw3xzg31ja3vsv4ey1jab5rgbgbnyrqv0qpyyrch5d39pb1bsv06ltlnn5vcq081osatadnfejl8pl7dvysole6fxtlknt2hgaa22hrkccnkf',
                surname: '6d2wz128kghukukolgd5ynsiyrjsx4a3p7xhbjikspepavb11m4g52f40reo047i31wm7iy12kz1thegll0jjsyr02mvtmnpgwqtyrzskci3w6bmv4txv8ijsgoi630f6xhi98auwlrhg0bdao0jpce41uv5jd1fanhh5kiwod3ttmk1bgxvtsf46gxdxaxm4b5uop2x2ocic7awzyqvedbt9wmjk6vrzdfm5xb2z1du3eyt185yvdneotd8cxu',
                email: 'jwg6kmrmhwtlk5ff4itwxo0ydt57rh9rg54i2katoizgckegv8ovcx47boo1fxbmwsx1f6o16zpm7sglqqfahptwiv8bu52ui456n2n2gaquqc3wv9spd53g',
                mobile: '3olnzkdo67kltsr0pkfld2urprxjptm3643hhzb9wyavt7cerezuak0qcyww',
                area: '3s9uehkzjp0o33r4228kj4zhmus7q1qkcclgcjern9d57vqrxpei39sohgunf2vy6jsi14pfn4swo4a1yg49uvzm8daxp0wujydp2vt79cpvdfmei6fg5x9u62elduucyijn5ru6plllolsz44veb3xpyfpjti87k29ltrfhy2yaet48px3gtthclkgba9j0z2q87mxuxdq5wdvrk2chwkkiua22ysxfdlbivlrboyjt0rbqn8hsbbklpts5u5x',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'oq5ppocrn14rt3p5y5qdwvu2h2ou98esdjfgnx3ll0xfdn1376',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'dhyhqi5bu6av9atbg6lk',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'lnezc674y7y8ezbou4be6iwfvbq5x23z2b32odrfxw8z7k4veyfov0rov12xn1rdzwybzzix78xe7g5n13h75fmug2ry5gy7b6gvi8vwypxayevlgx2oz81fmzxbyf2n2hp70yqhh7ykycaisyk1ev1c8n5spfty6muial6vng2wo7n0j1lgv6nbvojs2i6fn28jgm68ytlubcqqofk8l5s2vs27xj8uin7k9m1zw56bjrr89bjiruzkvi897br',
                name: 'laxyl2vhl78l2kdj6atxkmumfe592729pztk3sc5m09vx5nz0nhyz17p73aifbesomsfnr8e6nrmnyp3lsmqizwckwblohbrmw38kxe9j8448ofaoiqlognwxli9cqx2rsqgevjti8xj60jxo0xi154d04tnmp1ux4sn9mhhp1g5yzd5wjm6gvirzomcmzggpow207mvmrxpw7ynm3zwt5k36e845j10cxerpvd6ig02i5favoihjhnjprurmtb',
                surname: 'kqlncolydvdz1yi9ujhbn3erocki5jnrw6p5wz0vgirl1dgw61pzv8snty82df7x1z6h9zj3w45lpn9lvuom75lmo64zk0xf50igrixij6miy115l4ydnplvzwd92navn9ln75vfokhb7s7srffuvq7jx9jtddl0gj3mikz45jb7uxdo8wi0gbhf2u5fqnd8xt1hcoczkxebjiagk94zu6nrwnz3cn3qwymu1l74j6lksmewhya9zuy1whe9quc',
                email: 'r9973xcrsuicvv5j4ntk1a4ck5tae2otd14sc83ejry8ph1w4hrdjp8m7ac664ohejuarb9rm5iw9oeika81jbm2zaslbkndkftj9h3ykoor72bz1qvlypy7',
                mobile: 'fwikiu6v8t0rohap3rtxehuve3hmi4syg5179fny1as4kqcji4ooleizav4w',
                area: '3n0qlzcbjyeot37j4j2p2p91lye430uw5gnqlshlgav3rxi850xt2ofqsvejodxi1ofx1us2uq15lge4rohrcsng8xumv2zxkq91w87ud1bldpr9ftnnvepciqayh037htmlcqcp44ll5pxp561wsf1tvcn6xm1emahhhguwrw1bqbv6dch1af1n793e6h797fy3xqlj9w3jkifb8z0fmjxlwxew89rt5eyflyzldu3obthdjlgk74blhy0yuhw',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '7qvjq5735rezo4aoju4fbilfdzvcaj4iaj563hfhontkfl3spu',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'pkbx0bgbt0jl6l4fv4fh',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'aixp67vl56s1t4k26moek92xurixhuhq08qn0qvcu7z6tgbczvvsutoygya7inzcpblmpvkfko8vs73bdfooxqgbif3p6rnl0rf0we5p969l4nxkm04ctw0yxr4y8m99jg7w52vezbrcy0zk3fdtrm5z81p5lx5hs0uvw7lsg5wgnztjz1kqzchdbwmbwt7nh7tzo0en1s722w0oqbmlq75mqmqf9iu4eoq8pnjav0rz1rvd4mo6l148jzfnk6z',
                name: 'thqermfzy3whdf1ylrtkc820r82tf37r30q5mujbe4ur1qh8wwpxjq6z6s09l5h2qerfn0gnzi18ycsd9jf2d0xx1d0gv8cqkbuukbbygty4hsy9x06ls1njdwpznjmggsy4oce200c0q3plfmxda54diwttlb7jpo8n8mtk0uv0cmbhfu3ele8y2u7iug6rnl9potjyvz9fa30209fonpij8byi1thbjvjsj995s4j6amvd0igqp3xbfchwowv',
                surname: 'fai71u9qqux3qsdq4ojh1mvsyeskhqahnylfhxbjfb0vnuc8ztalsjvjbchojd5lmd2q0fuqsmpjvjw39vyexpmgi29eds2ijynh8d5l2fb3k1pn9dnx595jmdoe0ybh1d2ugw3iajgwumaw9aaazs6gj1iqr9lebbcw3xqussv0ho2yel6pe7i45ss53954i8vr693dffug7jrtu4o1c19yxg2sh3w28o1iske41tze8epbnilfnz04bfmpeir',
                email: 'tgji9u7z1eedxniiylp6lqbfaa5rt4xgoi76jp7czj97lf8wqvxcz65fce280t489o0s8ewz3qntcl78kjsbisnqhmhee7ytod4qy2s5iq1mrt6o9f9xlxzb',
                mobile: 'wgnpleaggp8q5hom6jcfecg4thn61n56prxvxryur5vxyvab0bhx0zs6z9i4',
                area: 'jtokb9jgogjgxz9iba7ac8a6mqyev2g40gea2anlceq22rxs5skxhi8iepxc3ydluuljxn5xq0g8j8dnqf2x7i2cbreqqx3r53u68w1qxali6hmypbwgz0wq68772yycrnmzdelh1p4kwczlxc0fu4q8krkeq2k59m506fm671hrk7mj1pnd100p9wubwaj33lnzdzf0v77aurxfapkshkarqfpwdafky5pf9ei06wdwf28l5t988s323zwr2va',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'xqtul7obot1huy07sa1iqsw85u8n7afworlw67olexmot7ixf2',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'xljrzhwge2e6r8bwbu86',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'kjld9rjirgcw7xqjz4ggfag7i9h19rscpxfo0ymjqmzfgame3k0y6qtl8zrqasei9me5gfuh6atbmbft238v22gi0e7buo2bqzcpj070an7k7o999arsi14pfwx156pjs3e8ex8yk26khu7nq06u5qz10e6ce2zwb06ofa51apfz44j7kr7blmdt9d1pisa37c7vtmnwmjxstplsur06e8dsjljaaezaijnvjl5va7ayoj9hpybovc1b4nymt07',
                name: 'pnapu9rfk3lh21xwj8r71bl1vqn9s4cuc6f6lbgs2sh8grugefczpe0rs0ymm8enmg25sf5df3eakmh7hiq8mxmoktddjqgvo7az3y12nv8d9js4odwoo0gp86y32lqlr9gnspuxcskh95dxxkt8qhziyyka5qc5rjfwizbv4pqa8ihdy8vmddvw2e6me58rx23e8207tj7dnufu1pfgq7z2i7qzju1r51u9mvqdp6bfqy4e4mgbfdlr7rs9k8c',
                surname: 'e938tsaok7ibfbkuse9gn8t7qkkjr68ujzaxbg7aihkoifuceoc9aa4osnm1zjgrqjibbxou9etu9i5n0amo9covi6wwm8xtfpec4yj2d7b556faawvqt1kbsv9vdzadhhbuohxmjoyg0si7ir3sw2119wuyy7sqg5nv9iqzifljzkvzyodbculwwtspl2mjpdap31jnhwjpyefvabw3yroawj34yo53wnx29vipcok8cqil3o7hltobxofkyv6',
                email: 'fepzs90snitivgybcf9lf690k89upfciumi6pap50hqibn4jz3t5zdhg5m7ha9lc0dpo6oc57hr6ijxifvkk4q8b4okcr1crqkwn9upvy41e6q775bagaxel',
                mobile: 'xntvz88c4d278ottwoojb406i8ixqelxnzcq1izp9yyfhncqfz424jnnhm3y',
                area: '41rsuefywpk7yuvxanwm8z3cb5f2b31rom3ucgv06n3zfmbe9vbp3871haruy90pc01p9a5bew6wgj4r6t8rvsr4ndrrw3fkdmsb3bm11y94dfcrhuham5k4r1zphd5m6z7qoveco92gf0ajf5cp1odd9mj1yz3onygxh52osmor9mslh1wg5spgt9or8vmxujckg1rmkcbleph6mlot5m4l7cmvlx3sdwlq9vacnpfjbtiy3nrfe4vavmkovei',
                hasConsentEmail: false,
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 't16q2gp4rjx9kv45dfav9jhjbfsqphtk0tjfduv4cc7ihg4t2l',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '2on3lmwcwyhddkrx1t1s',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ph5dz3bghxsm6e2zf5hlg2ymp5bbq6ylgcc384hc7rnmj8u1mocrs6ohmtlwgxj60p0b37k1zi0r4brmf2n5frlwstru963ws7olxfwb773zphvkwbyonytc3385gi4n8uf4xntsot0a5oaztufjdjcyx8nit8noa06k6avyryigz4f24x81v0irfighqljekmjbugdgpg7amsi6h4oj6damc9scxhhc7w7rveo9brpt1jfami64xk7yhkrqne6',
                name: 'id6beuehe65rday6acboybt5un6jeq1asodnn4gmkuwfllhed0lbolrzzoihqfznyc810mv825iq7qddlnlbljmd5wqf7sqnndyyxqcy5c7nhj6b9rn6qq9zonzlunksb6cipjajfm84h74q7iop6zjsrejtozbg9fbltu0of5krnu64gnfjp1u68opft5dvtir63t60io709abp82k7i9ugtjfstmilsi4n18mkpx65dmklqvu3h055azk6vaw',
                surname: '39s8tukp1ehr6n6d4pqfyam97pw3cit6zxnq0xrxpa1wbtuh11cvq45p5v23zc1oqhd5b8575m7445qnz7cc7d9qs1ysrnucsq9n4ax1hl490fxf6szobv2qh2xhofhjtcohm3mfoio634a6tpnzf44tdnixtth24h656kk6o48p18zd37y3cwbbvtcnqw9o8o9zk3inwk2w1abyyhd9f1dhmbagufdel3rgpfc6eqpeyidjupbtzh2qljcvk8h',
                email: '2kjqvl8jzwwavw1l4lw0h4xcf92755rfdef7bcum1c9wfrd33wey9uvw0iyc3ey3eici3hqvipblg5n9k04788ey4ejjjt4vago0c39yenxvs2dl0wrg9k8l',
                mobile: 'r8zvoacjeit7m57kp0g5kmn2qq6gehie8mlsei8azcaxogwxttbb5v3ekyv9',
                area: 'jd2l1kkmh6nya29jlp6vov2so16iosk5c4nlne2cqz774kqkwssx7mpeljnlshea1e8bxnndr8rq2etot6ej52itn0i3c7pa2n45kzl31s5rhyl2wautbuq0b0geksp9mws64jyz3e52v00xgcg49zgfoi4pkv4skp5jknhkt2sccylxu4q8j3ga1mem8yei6ry2yjjddyvbh81hgz6hvg8iixi2p38w1t3j7qzfmc07j3jmklmeamagbsxwrbb',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '6swrk1dhpgib35ici885ikt27zndaup6ugpreff20jq71hx5sr',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'p4fwly7deqrlwtnov52g',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '315jyrm1cagj2465um6nua9mkwzmasoued6gylfhigmqqh1ucm8p7u12r86cxz1c719msjr5izsp8i5u1abzgg26uzlpilx6l362joha8gu5urbyp68aq9ty0e0hg33afwpqfaj2lk7tkxwwo79sjkapo9vkgm7spp80kgl9wnuh7g8zc71svj9ecf5ovunnq8uby5u918gkjv1twtajrjjagjnb8g2vfg716dzsp1vqkg8xmd7he8v2xn78i3r',
                name: 'zsi979gohnjchv44ftx97kamkkxzyvxu29ut5ia5jm51a2uwhw5m5cgck6c13rn43efd244eube6w79mx8a0altmdixmxgjjjfy1nv8q4zodcxo2lw9v4ehif13lwgrpjf3bn47ynyh2rhrwi9gkdmdg9n2r1hgchretwpf8co8wakuj0hbxz6huhub2jjhx9v2qx206gh3aieacucj90uvg10y2iciw3sx6n5uznpmqcj0mc5aarqdknu0f2gr',
                surname: '7yej5tzdvf33z4pfgbqo4pkb9hsk0ehvsdoqfv3pyb3vyujued2tawpanekfaytl28e61nyanc65u90hl731wbjxklypnm1pzyv6q5n9jvewz4fygaz2x2a50nlesjyah2p5jv0z24a4dhsdrpt6el7v1e04700ogcy3rek4ki6p03l5fg5lbrp2q82d1abme4h4niyvf6wi4f3m2ct9nj3tqovk41r3bera4mbh1i69alnt0ej1my66pw5kmdl',
                email: 'bz5926yd7aeu8edgq5zlgbkwhwqazadbzgnbv31lw44qbyflo0yiif2ntsjtyyyjq5xwj4c91eqxq0d6qbiw5oosb045w8gls0slisv3t0trju3pnd72iia1',
                mobile: '49y5e21r7c4k3x487omvs2ck30d6n8dr9jr374oxi2b6s3n2jpknap8jhjyf',
                area: 'khwyirouxpmvb17p2w5yjue0gurwuaioy6tiycjdisngbs2x1qnwq8tafc2nqv2ircne5bqqjkq7ov9z55nd1wooudgvrf7ndllcek5ooolgdqq4h28pkeej32g1r9a2dvpt7fsmgks2vh274oj7vfsofrg05h13pqo9eu4fwz0x3ejomibfu35pubsc98norekxnq861fhckiiev2jf0vl33zffxn7m8q4qjz2p3s1d24w2q4hw27071r7lkq7',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'zu7i5d2u1kn5dh5brho9m98r8sixplrw226f1',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: '3w71r2rbh69c0yfgdcq1ypbsa9tx7a71qjqfv0p10b83gmfzws',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'bg4wzm2hg9nw7wg66hhf',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ai7789vgti510swho869dwew51hxnl13bhvhpy8jhx4tbrzyi2gcy51r0mbrxp99dtvtr6ua58t6hu4py6y61ml6ppcugs44bpxy87c8knvprm39pqthggc9hvpg8puy1fyj94jozh9lvttvmvs3lssl6otytgvjnzimdfgscmc7fyh0ohz5clihtd1lx1axv5hlt3zbom0yrn0r14wvolc1osjep55p54n3g6qtnl7zhym5eozgdfv9oq8y3z6',
                name: 'o42fjoybcbopbcj1gltvbh9zexhf40r47p4usz7y9dtpiuw5haktmf7m7kz2xn0n2yhhw2opynqrt696s26kt40ubuhkezmdxmsy6sbmg860jstehrfpdvy0pwujl51tgyb3eivkrr46of2bs67urdhf1e1k3sjhgau29mrvqgr4ipf7363paxcety4mx64lni7zs4diodqde2ib0od50wrqtplu8es1307blqb3eaaw9zobo82182p3a2hauvd',
                surname: '26pk30jq11vcyph2t90atmqycgvfxhvtdc6purwrfgg7djmyqabpzgaroved4qaik1ax0himrzush2v8o7mngddktk5a2vyzj5pfe8r1ctkknj2jb1kchaeqcuyfnkhzmz6gm3s6tnoooeazqi0owzbewp9oc1jbjp2jk0jc3o3iqslpl2jrwwkd223u8dej7o0vkrhzmdb6500n5ecbrs91wkn1cbrpc1cy5rqz67cwz84v6tpxgpkkqiyo8qu',
                email: 'tbd9ea4vpktvtrpmvcnzwsdbgqyy37htgczg43z2ds1k0h23bkwe0qmdphogpoxuf081rnljcm9ukgdcavj30pnyxwnfjjimrigun5b711ni52t516z3pl6f',
                mobile: 'xj5cc51i8yx7d5mjy8umkas7pofnt87tg3p3uqqscelp6a7boey2q13gwnoa',
                area: '9kplt54r71k6461acredc3256s74n922ii3jkex2crqxl1tdgp9vey9c8o3u2vdfhisfkyv1w68qiv9mspi5k551750q45o4hfvxabacjdf6sue64zz08epxx3vecxzf33i1ji210oxoalce4cirpp8lnrn4nvjtztqnlblvxt1r45v0sf40webgo29f65q4yhpe1c6gp9sm0mioks0cer3mu1gffthpd7lp646r317xf4nb8k504bhi8lca2c1',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'ckv2yph2m72m2ffuzm02gv5jebxeigt4j0kka',
                tenantCode: 'mbdbxjqtrc4jiw7etfm4ve5evyihe3y6v94m1105hsge5a5gkq',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'x5jtcy016uxbid6bawzw',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '7nieu3g2k5bosrn6w91miur8krlj21yrly37xplxnw84watp721w4ox6epshca9l2v2pc953lvvsecsxvw0w18asi7el4ix7wlipjbb7gl897bwb122qu94xwj0uo3zsm0h45gug33wh11pr1fcc33wirnnfr5vf0enetd4nebuo82uxbb0xu8faa59h1jgqa1phw84sv7q5jjtuau40njz7xstc19b1te888rdfhq0p7gbaofq2zwj9cgzlzpi',
                name: 'mvrj30e14vsxbxxqnbszi86sifrjx5tlvtds2li9xwk59o38wd7vdwnbsmsgo7zxizaeka3o6fhq6ke1pofp69fcx4c1gc4iaynkl6wbqb0wxhc0z838v435mbarjy1twcvimsv0gv8gbp4erht8ecmtycwi2xeb39j20l2q1aufoy6x4p7t2s563fl065dbnzff13iimve394q18fowks82luph58lgkz7uaebp2p1t0rs8rmu5yp5nhtrjgeg',
                surname: 'hwfry954p0ohvz2vv80xnke4i7d6svjk7ei2fecyjwr8vv05seeuzg76st16fex021rbsuvqgbda38f5lmj23n2vunhl6s5hgj6ynsq0vqz19hrppc71ok3t7ucq9kgql80lhouzq5ovi8exsx2nflfa92ok3iq1br78vata7apj6xzeag4mawfaj5io8wj1e1i7dlls2i0ui70qscod9u7mm2poncooq46xj7dyn0ivhj11cj7tuxss1231dj6',
                email: 't5plbi018ho1j76rwcnmtxfw3h56c611yftzx3xb23r8dh44nawdzi63fdmg02th2bl8mv29hfqsczwewmnv9l7v470wgw5mtlgwbwtdig5slt1a2ptomw74',
                mobile: 'sixxo18asy3amiuh8iwi4yhkl16yg6y5zjraccmgyw7w2mg6ira07cygawlx',
                area: 'cqutccef63zfdud9ee1lh03t8eoc9z6hnv0lbs3z7b2h64gl5uvupkrvefr8jv22ljah9jgwlywszt1zf24bkbc1nbou65d59oodzwcvv8z0dd10r97j9xshk41xywqroo5ngokrpymu02xcrwvpcefegx1aktm4aeky87zz9uqdhnajptomj101u9j3ku8y62th1j15kf87eh0td9em84brbucuceyo34jtmr3c6t1ehhw8zsse27phcto3wig',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'j93ozjqldr38tdjgcqkrgj38q2hzcfkno15nky1mugjm9cl0wl',
                systemId: 'lquk1ri496scakoho03mguoiqy3wtz3py8xv5',
                systemName: 'zfnrv0p1nz7wiaj5xop0',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'qhy9fmn7t71jz96yn7fdzeqm68bo9h5d66v2gqx5z1lhey19mp9ucoxr0tjut10ybv60ipry3fbepmo7vntvgjh67rjmavlg56wuq5mrzsb5enkxy6x1k74p2jxnudhip70r0govzodigqgc5ftv9t2h8n3mq1pt31sxfsypm5s185e3uqiyp6acfqyo6avqygcwlq9l1of396q7jkicmlcdynwratid4ulfdufcvqjez4jnrt2ggq3laj2k363',
                name: 'jkcp31jywt9psaq8dr4gzndf6nlxmf6dj8zt5beq9xc0bqo2fv32747f0izayxc863eve9wediiggl9sfe6up353tqtui106d73fl4exgm4cy6dl6mkf6h39kli4fvgnbvjkrzvk7xdzrnqsb3yyaaclmfd8k0qz8a53mm932drc6acvg14mzpzcrofojwpn5k98a3ocvu83rhhwwcmwlj6gq7ehh50ndfxqhnawfq22jla6uy4k265acqwvkzt',
                surname: 'rcxnt1dm5l3r7uaugv0ck6s3796tioid44xcx8j1qzzrohwlt60fxvorql9i5obze4xjxbeuyz8kkzgg3580pw9yvsy3khyfyahf5xov7l9sztw1kwe09j6qm1s3lvxx1utgg992n5f1pkfqskfopuvg6flqzfbueaya56bon27n0ix1dopsv7h5fyry1g6kk9yoq0rnqfn1i24rl39nlg2tecaov628gxaueujl630uj2p987dp7vjdon59zxa',
                email: '6h3x6y95wxpzyf1gybc3jn5ch5swrutv5kv6ruoamabrt8q6gkv6hzzw88jchpdt47g2mv3i7tiw50smcx3piiubghwqi9v7upw6mcg3ii7x2ccsua6zxu5m',
                mobile: 'e83molcfxwo5l4wux2dt30qdvqggkdc1p9cym1i2f6a5xuo602845fw89x0m',
                area: '1eesbhwrlo29b3jw82nn6l2uyabuz1k496uzugpcoj68h0oz1b7q9ii6rj6zemb4932ey7t1un2g0rjws7l4gw3wbt16fzjjc7n9sfoenzphpkr2e5l39fey8oaawnjvpj2wxkqphkaa3047i3h9wu9po8xj2bnnxum8lm9fdaezyrrm9glo2kyvxedv2axz0qz3otj5rpp1pz6q0qxkzq4a3vlseflx1hzcj45wpvtjymmggoe6x008jxjissb',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'tvb9ftrvvc3aec6zkh54la1gxvnzna5v7l9ixdiy0jpw8eckth',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '6x9njt0vsy82mltorwdw',
                roleId: 'fsc7bmjwnpfxytnb72vg1kkll6f2j8oxfj2yh',
                roleName: 'bqr5wv9kz41fv337afllxpvgntjsi2ds6wqe7ruo6f4nktm8przv1t6ktyi3c556wqhk10mhi0tk5dc1kghk5i133o5fxhlm2rpbos767yo6idinkps0yecmefnxo10hfvcah5lwseiquta61vaul4vs7z7lhxebkabetyee4szk3s6guiln1dt6htrhjyfdke5zotwk3spwt597h4f4u5l0f9fbbjfscntj99kme0pqj0csz1wf2vzg8ipth0f',
                name: '8csj9f6nkyfsuhz0xtxiruodqjqcwjno8d9tuar01owj090zu3yzg9t9ri5tk3nm6795939817m2tv1pi0twsay2amiey8lmb610sovwdw4vlej8flsvtnb60bzfmocc117fjlup53ygy8df7o6yd0kmt57xhd6nqx2fvw2wncpxvnba60z3d7ur84yfuxds2pr6gxfwgld2cm2gg1h8fmr9tqoqgfzgrnl4huzfdbpu6jcbs94sapqqk7p25g8',
                surname: 'gse04ckt8kkvkg346c5hdsfzg7ytabpm84ewy7ovi7y2dqcrdovhffk5v4cohwcx9ftkp334c6g3ag5pe6dvntm52jen3l2flfd6lswiakeazpcbsfsbu49ldqyhbdc4kwna1uo4hjc38f5ylyzt80s5pfj2mj1ywf8pqincglikrvfttpjqp5cl5aqklo0t6jfgyg7zs4z56dn5lyan6o15owbuo7kygqjmhvghk8b5e12kpna402r5cbqqwt0',
                email: 'ppl6hrzhhoxg8j0f1n711k29zrd0ho35i1gf6jug4w6qgnvzt3q1pidbyrk4l991bw4vsu7k3kpgbhlon4cwvhxshhy8xdls011uhcnn7vgp3pmr5q0gnkkr',
                mobile: '5dxouybpick7m82d8vvp3b37fr8b5aushpqpdevrlxtiv2omvjvzxai6wbl7',
                area: '75sfvgc4xmv77drzi22bnhasie3h16s3wwga0pe9u0zbkjqkr3hmxrkigw3pr6se2b1blz76t0tqpov7rrnx0v8s3jwb5yflnlr71z7kjnk3solxspa4mqlmrq8d5riu77tcrnlbt5hzj1c27bnx2hyj1lrzpatm022dhpp1uo9xg3co4bts1ll6pvws73hzdgjdv4c6j6yn4nt98i90zjrywf1m9ufyyw5lb3tr9jf9l5c563kn15q81ytgk6u',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'hjrqys86grojl8atqyoskthawdwf4gflamn7l4k61eem8po8arq',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'l9ehjgvsk5w7sh6u4603',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '1hc6cqjks5p310ksyd7hk9hy9dly3n5d1rzc5syi0pc3pfrdj3xztlxktz24gvcb4t9znw7yt5csa5p8gbzxgm9opan5225aw0henen1y4s2om3rl9o77kgdpyvynlvsr9vtacl9zjafk6usz1ml590sgxsakbnslgu3o141qb3vb2pjiqw09q6m4to9ne4gsz5p0ca1rm1o8b1wo0mv68qr8m82n5k3ehb21bo8o1qhtwhf7gqe234q7685kx8',
                name: '68owfovb2ulzlm10f3gi0y51bevu689hsdw64gjybtf5ap2phbx2o5mojhmbm7968d7uyadm58sd2vwgjtv6yjqc37dse4q2r764l18l6dl4ng4lxr81l7bl0yqmao3bu5a9brnw1brvchxpifxet9r4sqjulo3bzkyhu32o7m6fr0a9sc4kkypjywaobjumy2ptu8d8rl53plkj34wmrpo1zurow1o5549mairkabnhqfge3hxtww3dnuxazub',
                surname: 'aha63vulalxemzt0qc7e2hhtacttepl75v1497lzxgr8w4tvsv7du0c4sujd67sznn8lq9c5c2tbhpas6wls3a41b0tesbszc3suj27l8x7o9ijwwk4k1kdaxd1lld8ovvm0wpt3nf3wprbxgbxubtaesokfwge91b7evvmxynvjw4ylc5hd4a5bxyiu276m7uydwafdvanwdnc0lmp9t6fb025v35pc905nr0q95jn62y07h3ruwtkje2r62iy',
                email: 'hgp5vdkmtku1mu7ejfyr04gff79qsul2wvr9zuxxu1c8twih1oha2hiw9491u2bol6glp3xzbbkg9ic6h0p7ldw87bb0c2r4a4m07kywnn086jel7vmcoho8',
                mobile: '8zmfzx6itpomwk8dzevtnt8y1epr4f79hwqm909s4893hy85gwisxntmlspa',
                area: 't6phi6bb04ga0scw4mkjjymqlxikcny52fcw058o3z440x6znd4eh10jby5cnawh6tkdp90vonp7m50f7fh1t7u0r65rgul1w1qwnk97tgkybleuhggq0k7e8pr2zlb3ahyw5whmwb1gc29nsxt5uqsolbeof25wptwtpya364zlfs1bs2w910saiiw3pz9ly3y095yydif26m4cb8o1aqk4cljgn1owvirlsbt7k3r2aeexyhftthq3eelldxl',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'jn3poanyfi5bj1qbt1cow3tg7gehcatic8sm1fw4ih0tnhzg6h',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'cfq7luhwozlm0kgdreztv',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ccb93wtxlhsm8bi2i6yn4fniox6ogwboz7688z584qt3aj1x5opxgnzdadvxqt3ae1ktybp762kb33eg15thkkbo70u58hsjtmjbd0xt2720te2nuoxms7gucs73tldfis6vws9a3vvh7wetwhy1uuznng3yls0ywfscaddr0kjz2n1cps7en478esugynnjkyg2vllzqupbplnqytsh56kunizwn8dybwj77kalrx7c4ny4ppsuukrnshr1qrl',
                name: 'rtxmfzijnt3eoipgjjvhsloak15gawjpo7ih7yuama22rhyxnj1cbshej6w1b32szbcn85a83u4im9a8ytfj9nwau6enbdfjirex3dzbefeyh5b6izbwnqy81tvvj5e47egir8jtxrxkkkv83evuyrsczqvovjosb7e1z5mje0l1r8lzb2p78b2wb1juhtxyoowfw5ylrwt9u4ddbcz4snl3es0q0gaqet0zfmpl4gf66mj7n758cr9g79h377q',
                surname: 'hdp8pnbq4emda714x7olmt844vtfrox05v9geyvo6vewn85y7zoq7ggjfeoxptfdqdzpx6jspyxs4vbrzm12j7n0k2f3tusvgt5x0dap0evnh9ocjtrit1mlkix3y4489cc0akcqwp7ymzmmw40naazfu81e4bk775fc6a77qe6twg2jncs9x2oslch9h7creiuqoajbhm4t2t3ksl3jnh66xneermdxir6o6ak2c9ppc2zfziwst8jx9ejf5gp',
                email: 'xzm74zr2beuwrgzold4xalbgq5p2p9od5guqottyfs6x6g0miqyguupu8ekljs4xyz1y7zurc2ga7l69n1enwbvw6jv7sgpaxv0zxcp2uirj98lz80fqlwei',
                mobile: 'sgkxeswe70xip49tclr7wj6bm4fvh9t4tyaedwep4hhxfsgse6b9brf9kphw',
                area: 'jv9k2eufrjvm6i9ll61zrrw2p9mzr6cfq6gxesg2z11v1xacmu48ezkqeuvw5motrd6ko6bnhpwdns0l3vcqenja3ilrbikl5scm89375ydfnbczjxfaailz13sek6ymiorok2my8mo7f9l2sagsq5cjxq91k4f17e755asy3j0m0k17g4f7fen0rwm9gqea0v2fcxm8c2givdre1tb0u4pxjupknnuuhjbnc1v7aclahe0oic760x4uv4oannl',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'ltomejrdgaciai10hbgvohfqnxetaft080m9be60nselsxxprv',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'mrceczodc4bnh1nq90jv',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'y5xkhy5a9rnmvz7ow3puuny5dlp56sn0p9hry56t59taoea6v0kqsao7vzt0cg05qsccc9gp1ne4e9hatnnjonmi2hdgz743g269xee3estqo1hxuysbmkzuz8hdiziqnw92g2a3s4spswaj4pq3ul2lznmlkj9keyymsvjox0gsvvr64dgsatne4fajk25ixka7bdj07n73fd2wejy4g14gtuvwjltqfxj3f79tur8og7t99qfomtec6sl20dx8',
                name: 'prvvw4k5oy3ce8kl59vksgu92xl4436tpflxdnpg5hi6o76wz5andx8f7zhqa4b5int60hewfkf05mkqnqw70ebjl9yp7gyrbpq88nv5p61gdmc0umx46p25dz9rzxd2sftouxcxlrxew1yg29ljofykrilic66vg7xucj33pch74qsmuf3jdeaa2hbgllcwd8kn71dcqtimnp05y88csyjbbv5x29lck11oea6w69oduoikhmbuslqfe2soxh5',
                surname: 'gudnwvs9gjljktac0qqfoyk7movyvlay5nz3r3l4a7orm7xs9usz1gmmja09wktw4gwa1d91okyl2m1b2zj98ukymjg2ym9jrh6srhyh4lhm3npr96m9tutrdk1fuda2kfw0qxfj63eihy864h3ecbiwppyq7fn6gkiihhx47p14nivi8sq6rnx33mz2q5v4bgj3umeuw0w8w9l526t53ufgd7oh08t6shwloemgsdcp8plhxvngrvbgapyxpaz',
                email: '8subjsplvbl0rw46z9uul3tqfu5iemy8i246exb1s5cglxesnkwls41ykdisrl82wqzt7hqngphmr91wxwxacn8z09aozpg7vtxyf3vzbh1gwwxiidkfvxaa',
                mobile: '26i35zd7kvd3i2std8uvpa03wksgsad42x4dty86b3oe3ejvf1dq36rdor3k',
                area: '7tjcs46lpwa5o7ok1bnhdeqy8hg2qyrl4w013jj1gzricoewi6n1h9s43tkkjviuktbgy0i3iwv564iddkbemg2l0zgrywlcltyoy4tylahv3wm7pykmoap7t69lvz27ifju9vyvhigpqizknpe9prvep9sso2inawda0j6jw126ub5kk2cnxeyqnhns9qmon70gjmvz8tu3zx5hnaz20o1j90boneiepvv9j58dyybfu4mlzvfzj0zm3bl435b',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'remt5lsua7buvj1tsivvvewe5jrlznm35k8si3t1646dnh44rf',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'bugddr685hgxdenuvwqm',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'tvewzytek9yndq2aehk07gu7s7cgn812pa7kdbmg3erwkxtopr78y7phhg5jzhlrjbffqgxbv74zwg1gs3y6nysqts00syz2mkrq0543bj1iu6pqtvltpgsdc3bscsti8l78p6955l8aa3b8v5sr3bfh4cccjkzp3xhaho30zan77brkjx8vnzgp0ve622skyetz5xg57tqw54x8r4om7c379zc85aalebk1kjz8usw81toek34jb849rob8edo',
                name: 'bo5yezhobuzmutuktegkawvmgfub0j3bpmzj21pzut6l6pzmnc37nl0fdbizhgp6h6tu8w55t8mkua48c6fw3gdekqtiy5f45qni41bhoarpz65ixv9nmqkpwjpmf2n3kozkfi9vevu9mjfx2rxmb9e2bgecs12ytlbzmjaqq6xbvrsukwvc5oqegwkcew7oqhkm3r4gc49kln67typ0ibiylb3n33aho5icqhen06zean8o1zaqbb0ne6aykuum',
                surname: 'pxsen3fa45hxi7i89eo3h92ri2r84t90vcw7ap1bzznnqy2fhp25t3c57c8yl4l895dnced9n0t4d1d1pvlsrj3i63ihfq7oiw7a5a095fqn4oyw5dz2szis9cbnviylo21abhv3qdm951tnviiuymvccgrrolqjrmlhg9ylndxx1e20lnlb4kn305zslmjo8wcb57t7ow07iykt2u077y5ec6fi1mrucfwwz0vl1xektyn3lpt6mfqz426vno1',
                email: 'ioyywg8ttyanflikatnaefcejoi0f8gy0p66klm8jp3b2nw1yl3x5s7f1gal63jnp818fzp607b7y4xqe4d2x1dh5n0hedup28w87k6hwrrzkpiw96qojzmk',
                mobile: '4w14lomv5q73bqha99aikl94fc951xovsfqm8bvkd8uruh1zchrc46308to6',
                area: 'ggpgfc9uevzqazm62hdi3ov8pi5x014312or7suio50vc6z14497r5w6zmzhdz480lncf2oss1u59x1n0r0poh5p2r5iegijqi2eq5737026d7otq5qhz7wwlnccndn7aa02hz2t1nh4ej224dwe2m6gooxhht5kojebntxuhe37k00yqmmj31i3lonmhrvpge8kybp6kku7n6lis9c06iz9wiplf4cd036fgumw0m843vd2ukmt3gfo4qedpci',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'n77z1ynkwgbymnpzscdujw5fwrvqziooh9u86jdp2xbx7b0nfg',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'grxfbbwnj0tk3cor87q2',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'm97xqd05dsm1o73nfdxfsbk70va4q359uhlzy02e9mtm2eiep1futlhm8i0yejto8m1nk960ckqhcxxsqto5t32pze61f14albplgtorm3krh2s8qlzb77w4chors4vog3bia7qitwmafkzvvz7qeln8o2rcoivmorm9le8t68iu01qrgi4o5jjqh9nr39v5hkhwcxxu57t1gazomyc20a7ehm9t3136eyun7b6qk9lgpe2zqwo30azeh7p10jk',
                name: '1fxqenzn0z5n3lcpv255wqdcr5n89xtxmjql2y0yyx4ug655d7gler1gnupvuqi9jxr6ecjvvx2lq9ix6nbslzmn0opye0on16r4yculw8s4z68t464hw5t8sr38ionwvimerdvq4sp0f7ip7nesylitfh0rm16rr0i5ifwz0fzpelis7ivsn6pq8bg7tcmvwsmkq6rvc4ghp29al3lelwyy1hvb3l83f2x4vzyhmxtjp0psqygx3uea8ptrkwd',
                surname: 'cacgcjc9p4ahxakr3z9s2grcbktltap2dfeu39w1kxbbw1oua46u98kv7008z6fzispj1qg3wswaxbnlq98nwviie8ahrp7hqjxs0op8fmry0bpk79yydmrj9qdedkx49plurpvw9ejl1zbn3vvc4w7skvumw5rp6xx10lvlq5b8e2fkazvar3z54pgnu1jjzygknjl3uxpz77gp507m0xkedm3ped0ejpge95zrdfok1sk0ejshwafcehmlsavm',
                email: 'j4mz3xmpoujs8crvxlxzrydf5hp7exub0nib02f48xn5ujjta86od48dv3gt1devmrlfhtpznyng40ao2t1uhk3rbtdxe0vnrw506capry0vvg9i39n6oc48',
                mobile: 'srusetefbq9vj98otyps4p3vtwg3vbjmu75w7eazi8ufylkx9km3v2qer8qj',
                area: 'd6r8g8h3p8cuwjz36aof129qrrax4bsmc0hn8imfx7bxmz5xq8rwgksq8rcl2gbm84clk6rmj76s4bdk0grrgqbvj7lglgxzo3b5ibdf9y2bpqg5d6kz2trtyyezdlsj06nji8uvpts8e8o35iwudiezb5ron5xqqirwk0wx1ifn4xsa5aug8oz1nkmu9cmmisbvrcrt2pe1luyeo2gy6kprbt3i8o5samjecesn400wc2aoq23wydl9xk2ua33',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'zwy617q1beg4r41ftawm3y7j13q9ky3ogey2xw5r3vdwxgqgcq',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'e9fv5fdib71cbe5pozik',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '6n3ok6goyj2l2a7m7wgbd92vmvp2ufn2iuzh7ex2pvy0iehx33dza6vs97co5lyjqbgvlsugzea6j8ipdogr860desqkpcdoxrq80g9z8obpedc79xkmpclis9h0lsp5t0g5odme55uf7gvjz7m4mg071pk91lyepdl94xsyxfh26og2jkt33xxvpia3ymxk44e1gifs8p9bp98cosktn5fkq1ejyqbnexx76z7pxq086bv4tnz5xqno92nx5cr',
                name: 'caiazsf2xtl5cmxaboluhk2m8t067z1r8ioi3saxqki88ar102etwvqmsfpnky5kznbotfixdkwuxl7ax8m1br83i8ktts4kae5k7gob4ln9yc25r4dcx33i8mjphhp2vo2b2vq9uw4zabz2kodxsm58fg2vw6x3o0x64r77jpufmqci0xsnbk8r1yuaa4nj8xtse92712j837as51mwrgt5fn4f8indwe650ymbosadlpedrlhospjtntkbmw9',
                surname: 'obpepsxqvjwk149iwojtu22h1g5r7ocegiy291idadfzu15lkxjaf8q6lx7hlkf1ur1qzoqv906y24hybjczgmt1sap5uu3nb6g5hoe062n9264z9nnc6nkpvnibez2nzmm4g82o4rgna4h5sfm9ph4wrw981mg7zd7ii838mnnrvueas68ykiwxsfuqzijvje0f1d1412t65gwz4b1mu7q6cw900owbuwuil3m7z5r1h8wrw569r7y0z0bvs7s',
                email: '80h5hvf67usiew41xy1kdbisj65rtlasmkk49fpbiyogaocexrktnxcdg4j0hjvpexg8sirh5iua6lzcmu1i87q43m5g9soxsv2omn0bvndnfwytd5j6dwq6u',
                mobile: 'xe61z1qnxt0zf6kqiab8s83uckbl32cmv0sxvggf4l80be335vskjqaif4ba',
                area: 'cz6uyt4uaszyr8toqxnf2pdoo1ixyeqwqhvus8w9svd0y7nuz27lthl7q0591slpwsiq9f13p800xjzxdn2lpokuvj4rg8u2nypmlv6cr6ztsa1stq779nxnlidrvyheoxhfrryc4boszlqqox7oowelih5ur76uvys1ulpg58eg9xsu8gjjc82ky8qzq8s8t9cef2njwdrkshv990cp0xd2nflb1mwus93yukyxqq7lsbc38739k2g0tuhfiq2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'w2u7tvwpumrhar7l4dwlthduaihaap2e6xjhscaz1zwgxe6iqx',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '9igeuswph58bssmrn23f',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ecoyymjtqc3f04ap0jjdfw4pm0596ioc5yqugnmztxp7jeyz44164th2lo7mourwd72kyyvoo2eisf42d3lny056cvcm8pfm1on83yv0ldh7ofs3ir5a1aups9vr0oy11vynhr8gv3mzpncx0275pxgq6puo7t0a6suj940fluvs6pzy1sqf01zarz7wfdyy5mxhwc6fgur345gznuw9pjmiifka6noi7mmqm98pof0d3n0todqvsc3q3lmo2qk',
                name: '7mkh2mk4wnv483lk0wz3awwdhtf6fxs6l7tiaqo7wtuk8ahjs0ax0rqtwd8nck607m2rulqgf3qar34vp88osiz2p2gxtphb8dlx4vw2qekqjv768cslu3ilsowm664211robffum661q5r7yerl3epgswtrna89e8ngmyqjnx1y3gskvw1x2vyfl4tg58b3xl4fvspeh0wxsjqtdhwroqxi978d1f11n9b7pgarisrwl2buo9b0waa24baivve',
                surname: '3av84adc05c2fs6zgriahml63u37oktcev9wyswahx2qua0gv91t3toib51n11v3iktky99i667xns9g41wxfm82c7vtd2siotow2fqw6086hjnhvxuboprv3ys6gbyebvsv0i7qdquecgvslim3rd4ddy90j4ig2u93ji02v2cqufrs9arz0lpdk3t646zik7atsvm31xedhz8c4ybqdjbgtnjkt327xt1e38i7tfmpi8halegc5iyds8uljtp',
                email: 'rn04lzrpu1tqd2m950n90sskwn5tw5x2lmv1c9xuj2c58sn2eqgaxb5k5otv1krsl2x81koxmgmgkudrvq750cnv0th25osqo1ueesabjtsiz6aar971095g',
                mobile: 'qj8awynccg1ti4cn0eyuvyo4a3f8ld53q3q7iodapwpkpol4m6fgpdvv225b5',
                area: 'f3sie05tslun3680hjf53ms36trnqg8vbg44mnos4bjxbp98xzfs75rlu08e8o1hko6qqx5raojw5a35x4bmes18a9ypo6nh2p7gtpbdjtixpf2d0oci9d9idthlv8jqyjcksw7je07e4bir915nvk9qd7hnsmol1aybkn03e04jnzphv4aha1y5tmtddnc9104mtu9eks1bdjl6j7qea579nj89mhqx5hm3svbt19bsiflap9xv5k62ixnsjim',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'vr2muunhy3njlp1rsmw2gymvfnnra4qr478kc91ntrpmxwpcbu',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'o4q8y9wlxb1fxnqqfw6d',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'onwsz9wklrwbs68hqn4ipgusa6jyxi7txck0i53lm3xq5imnrqxg8ieqk88d0zls2heqtzpnu4yeqt32pyb2jsifgrbfjl2zzyy4l20742wvagyi7hrytrmnm4o3tq3qn0ukt1uzh2dhdvnkqjrer4a7x4pcgmf4hm4q5nladqx5olx3urrol8kb5w6xnuo0spuu1uc7xw9m17d4ewlqgquwqp8fy7jk44lss7ontnuuezngx5jwhhrdi8jx5ic',
                name: 'rhcl876ixmw3uxat166hi4c7irqx84354i8trzfhfrhknhu2zjimaysoe2014uvloyauhy3plc5dr1q62qf5uv22yzda6tmlace4exy6c5ozfg9cu8jxf73ixezikqbwb6hbjth81af182np0u3waqj94zp7sq5ic1q7cj9kl29u06mgg6suvu9r25m15udt9c9ux96nkzvrbl1jznmabajpfrzptyu2vmmpq77cmyw7t7fbyeli05eiuuepbyg',
                surname: 'vpffj269xpip2bqa0x2djx2kdilb74tscfr626r1ahxkobe3nr92jn1w6dcfytdkbyjjxrv2bzc25cfil0jffmwbpgjs6hnsqxti1h8arozze8leshqser8nemnwimxppa9x3l5gxjrgpv41hotdns0sy5zhgyy5u9ow5lge66l8w8tdzuq2w4ksynl6f0dz0k1s3e44566s7l6lxv16v1rar7wt47qku6k4d3559e8g14zp15l009phacnpn3r',
                email: 'mza8id59o5lk2chod8k1sr6ypb4l2j0b9w44o3afmw33jcyr3v4n9us78ac6f3e9xg6y2hm5gsbg46lwm4r3tj69cvvyl7w7q3cnijbqtipckrtdhxr7w7q4',
                mobile: 'zlgi2tlxrgdeoi7na48gqwoxfyeblb9i63wuxal4xxmsqe8xcye3a0wxs6px',
                area: '4ukop48b9clr683wtfrg46rq4yzfr2phx321chhpncejz97p0xhilosd42lwbl6g8pnqmr8v8470j1gc3qgvg2btwrxt0eywpp5yabi81ip6l0f4p2jrw41l10qk07w51ozj9lkhg4gnw367ocd03p7n9s5d5noh6h7386zrchpnzrhz7pddntw1cd8c4zpgwzf8qahdisu72e93wtb2gi96gq0op0doxkbjnx6q8yrmpn32pa99i0riet76ilhl',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'q61txho21isak5erko1healecpmklftku3yj773jhft3yhh4vu',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '67hvkpwqn5azydoxbk88',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'mejn3dwjcciqfh3pa02lqxnxrw1rayq8fdzjxm61lnm79y7ct95c3arukdvy31il8hqdfffx1qolos9m6rkojrg7fndwdf0mcrvspsa062u42knw83qacl4waoud303ag2kecbysesw7jla5iwmn0gnjeu6k4ck34kj35k2csruc333vkpbd7kfb6cpwjgyto8m4f33cpn8zabr3chbd1w7d2uw6vo3ooaathv5rqm7o4cc2kvwp79xk193xd0i',
                name: 'adx75cnovmstmf2tkcqc5qoldi19af69faegmwjm9et1xlnan79ggf8vq555a35garjnqmsqmfom3bpnhu79ctf5pkfb1et9on6o7d3sj3hc4996wkemi2hlda1ev9xgv4bldx7nhfgdhxq2af2kaiemk2shz7zw1k66oy880evaigihie7az8xv9p8pd7j568dyhx4ybcuzg0zr1g22xp73v2eyxnvomdak3wend7yd8adj6fhccw53u5oecot',
                surname: 'te31s8h3d4k3fioa6npjg2r0nlax8y9y6ki7cnamqigbjru457c5ex1g8ekzff2ufdrmyjmumf5mx8v8toiqgq6zqbvd7z9m6t4p9levli16ir5ffvjypuwq2dozazcjfv39wczk7c0yos0h7lf0fuudwqj0mzoaa186l4t4gs31y765uxo5bnkhsuirgxppbt4h0yqnipoo0xzuros1mj0dxjzmu2qpcdhj2axded45604pqe9ph5k64tks1uh',
                email: '7uu6nu6ajd3hnzt1yv53zi7leoljne6gjettxril70tuem9zdf03d1iuesp19wn9mdqn2zz3hbc5tq9u3jro37cmojuwnux6sti38mfbj794gt1c1e1bisjx',
                mobile: 'p4at9ku1dictxy1v4obsh74x2pnxgycbr3gdtv4u94t1j6dmosvx0hwpl5h3',
                area: 'ewb6duv1cjw57cji56akzeu0pwy04mzbc6zbjly4681ul9ms5tk0v3ojsm5sy6y7f6mszduhnnexxhs2xpnhmsjcfuqipyozx8vbjzvmujmf7rx0sr8ml20idlvaxj1l85nzjkcmqy4cv45jxwfrutcge16g85rvd1iekqt5onz2y2pftuvr51njtjbo55spu3vaqjmagcrux01k1ynci85gysxbd9s5rp1pid050bdo6hy60thogxjmt41iyle',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 't89qxjo2bikx5wp1n4mwle0wkm4zmi5ljoaedx3o8ggm513w15',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'yx1yhftb0q8mvkm1gm05',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: '2nge4clhpbvbtdl2e6u4imzux8ygcuzn37w1daf978o487d1fyl702ffa272a5mifawcpyqekuguvi4ud16hymj5hxea4t968eo5ucm52thv4kx8gv9470ah01ti0ouy0jpqy6s2igy7966acbm19iw2h1p0zirj33494l4vvyq5nojh9fsit1vxd1njjfwv7dmvxs1yfy9ur6r4ab4eotbxikmnmsa898rv9qoao0afnbqmx3m7h7iw1j2kkjy',
                name: 'txe9derumssy2mw5i4mc48cluxjc3lhxm9radnv398daxhjfctesk7u3gb9k2vw2z0bi7od0ht87daawyxckgfzixk7ptamsc89q1ibrmdomleull4u21bcp8kd6t3lr5ijytplnkgttc9tzsj8xfkogwo9ska6a9264qesyhcxuwkp6sxf704xwzhfeu0eictui19cqu4aedm0px6da6oq91uyg9fnylrywvhq175ckk7xc43kaizhu8scuwk6',
                surname: 'g6hsc9c1ajptpa2koql9x2luashlm2wb910r2vsm46u3y1yemds9q5p01rkrfgtre1ygtsg25rx1su61zl95jf7ez3qlw2xelp816tsbq3ttipeuow3okk75zw5oq68u3xbou6n3n130vdhwuinakjib2pmi9wl5fzg863eo5bqceh7976w7t3xp1mj439d4whqm2i3fo69vlg7cn6i0s02wm5jy60swkz7xyw3o26d31w2s08hx1deecaczgs6',
                email: '8mtfo4jgr6a9i2a50g22506t2x0qd39utzl0evf46ppmw44dghidiyj9a89hfj5im72k9iyzs4j72pms56wx6p0o8vf4dp44dlt7f90j1t6ds6tn38847blf',
                mobile: 'd42e8fdpmoluu5eqhndfcy50d7v7akxgpujtei3tsz2eqvqtyntpyq8t9eyh',
                area: 'p7r543sfq1kfbjdnl2gl9mqfjugg4pgfcncudwdd9t3bpetfqj8h8moifzxm82ggn3116c75874jww0h6bv84jk43xoa0gbdyrr7g0y7qqkkpyxilq0pshlg4rpuy3vepvipy6uq691wc5m3mv7qx74h6hd4ahavvgwpxm2if0s4nd4nfegabp2br31ygqb2rjaukrp5lwkmmixucq48neyie5v7tcqkptegslcasu11eyhbr2rnmnw7n2el9g4',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'pkrz67xthetjt4kiec34effadph4h58t102v7bc6fvy8ao11wy',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'lvjwrtkz303t4blth73x',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'g3jgy1nrw56s54y8xr0gtkdz4szdijf8ii318vnw05xsalt4btzdhqbxb30kaglb5sy926o20czu2r7tzh39sgqyrv6z74wk1vrbuaxf0dg6q8p811ubpwarb2j2wo8b3ifekpe6g7rkxhmq03ikn3oszjasmzbwhvjqmh8wayf1elv9ylf298ka7kvygkrgia66vjey777570mgc6255ykvl12z2dvvxvixitq7h96l70hs7kdwyqafm222ljc',
                name: 'i3p8z2duxfsdcdi68prj5zrf9cyidhdqwcpkifcb44k89q3hns25dn1wfzpy77t38ypk4kjgfa1l5sy9ov21fyscpalipz3u9wsb8nj5wto8qsrxd7jmhh8mien8moj1jkqz59f7roxdsh8iw3y1qz9k34eeqb4s57x7t6kysfa5ky6zzw0nbmeh45xxuwofdtfun82xyvj6hhwo65xqo3gamokrirqb7qm2ryne9q00k6yd0nn5fxvba5tqx7g',
                surname: 'mrm7j2unfolm3nglb5n6lvm1chevczjzucxpymnsl4tc62bp78f590ro4rtixsy7swbbc3mf5yf25g7alyauwt62j6et8dqh5kq4z3wszkatjhogwhrm0kakx31h9zkvs22noczut7f8x831j15g5neqo4vrw9je7jmljlq8p88f5kuqjyysrjmzdk3ywqaaibn9kqzj7r7lg2tflogfjn01ypr5c8qdns6lzm6001euhoxu86zoh9t00s6q8yx',
                email: 'e1to0gf7b7fmnz9yqt50jsz6z1uiabrim4snialjfjanf282ksgs8xosuc4c0vghcjzn7c2e6pmr9fursmysx9xwwo596lzcn86jjd2brum5j7pioytvsfn1',
                mobile: '2wdok8g9btkfmhot0odq19351xlv2qhmgmd0g0jbff5dmgy3r7chd53ixytf',
                area: 'nkj297jhb4w7ir70t29z2nwty3gt89mbg3hd2x58uivapkmr60wk9ejznp8lhji0ium5kq2dh88yfsm5gjfnfwrlpaf5xxwb74zdp5vs7oup8si3k3dspfal0is19s166k6rt9aqbi8fd1t1890ves2j0evi6r1uby8990nv7umtfboz1ny4q1nxqjdnehdp2m4q4bx9xqz3f7g36tkb5xaluji68c4yoiygjb3e70uiqkssm89tcz28ie2fj3q',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'kuqaai6qwhzsvi1f7kmhy175ct12g2dgyb2svg0quty2d8kk4j',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: '3a1u48z7smwzt3aimvkq',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'ko47g3638gjoyekbwv20hqak28awbx2d1ktdzak467pz5daf5g9cozd3s2f38h07vqfs0d2zq574084d2zc8v8zhd091wxn9jf7bqhcyh0c0a8a3b4jg71qx77ujmlviwc2s1scahi53u541qiaxrqvpfwndgax0evugaek7w3a8vwx8u25tqto2qad9utx988wwfl194flyu6a96unmzxservi0a1zd0g7r4pooqr1ncbdlx660vzj1p142s9v',
                name: 'k3i70ixtxl8hbz3t4lzr9y5r235701zmjkktbjbmpoefnk4d8xpeefld1i7un8nep8tuyg4604lgz9vqc29awmioqpr00h5tvaqn9q2i9qx9x4j56a9dv19i9b6ugxe9tqnknvdrtiokovia8i57d4s15hye2rhc8d4moptj8l9xhvb7o9ai8f0v79mm199g3t7abi6boyocv5imn4mdrtpq9aw1xu1l88l2jjhxp03wzxo05a3yldddkxp3tpm',
                surname: 'xfi2nozt17e2s7bvsjayaaje6k0difb5goffbti8jcu8vs7dtt2rbjhayg8jwlo3jqiar88g30e5z3rxo4trbznvxyv6eojn0378jied6q9bk9bbphjha8ztxp3e70hygjsmlt0slfe0nbh49ut6genm846gxp16gsfvv50j90p7zgkwgee9e2gcrgvtblkjumv3boebzf6rx194skc2bemoydi7sv2r7s4dmlv4u3ieaoriz51hvtkmenkno0s',
                email: 'zmrn8z3t0luahpwuov7qtwq5ui3bk6kww4y41n6p1mtxt91vrro1f3jv9dqfk1q231uw81pytj1bza2uboplx6aw7cznd3ugqudss81cet6ubwxth1kyvlc1',
                mobile: 'msb9kkfb9aawc0fgms9pg9n4q2regqofxvw6hx4q149868diivs5nsp1c1io',
                area: '7dp2wwqy6ox0dicai1owzadq8dwbxb1ja1qdd9f5syjgs729ly86dsrpwjlx6yyro9py361mrytjhhtg7prmde458qen00aa6axcxyaiuts3udhqq85dq4p8m8ee9gbg5p6uk1lnutkuzamb3g24g9wvlda53l077i1d9wx0ujclxlztvfx24btww4jhci2zyt0ni54nr7onpi78m7er5v0ipzld6f16en2aib1356zxl070cysid1ggimuh7d7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '270d80c2-98f0-411c-b78f-94bcf6e0872f'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3a00e70b-4b20-4013-afd7-abb712d8dfc9'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/a93ae230-f86d-412e-a464-4b7627ce618a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/3a00e70b-4b20-4013-afd7-abb712d8dfc9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a00e70b-4b20-4013-afd7-abb712d8dfc9'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '1803221d-be09-4be8-a9b1-4520c8a01458',
                tenantId: 'd91bfb08-068f-4bae-ab77-1fcf5029c4fb',
                tenantCode: 'fj6xrlub3mhurvky6marr54fnc4smqsjzcs6mi4bue1okkctdz',
                systemId: '0b105c6d-7310-43f5-9b95-0f7164e1d978',
                systemName: '3rzsacg7auleohx47e44',
                roleId: 'eb96bba1-e594-40ae-913e-0bb1236351f5',
                roleName: '5dkuu2izefr1uobmuhs34smdyu0kxv78sh6bd0zwthxcgxzpg6f7i15mk97wlfnrqoag1sfx2dur6u3cl5zkjsrx8huhfarrv5rvn71qd6gfyriy0kvklsbpsyx2wiwtyeoku76b6na81qoxi4lfg49x3g1xac6remd6pdufteavo67s0d8d2bj96awce0ungs3qoctm2niqkbigtz5sm1geokih9h89n54oxt08seznb3i899neetdggn9wwyv',
                name: 'gz7v7cews5837clmbuzsapdpkfu93m1vsjhenlsjgj7eu7p4malyz9zkaf6cqykgrsqryzwjup3awl0cs0p4q6n6z8dld69vssxmz8qiut0wq3ic1962zh47clf3vm2lcclqehrvif4zf473idcdalf4allujid9i0l2lrt4x8750zge4fguf110j0u4afpdkm1lru3jv7ppgrdn4jpxme5kvpz1hg2qpstqxm0egb342jb3d9zjty6s2ipjwrj',
                surname: 'khixeryy8k8t6wzsnog3l4q73o0kolms206u4nm76rx529eag9ni08ozpnxetd4rpe9gskjupnl5yzj0etrsgfd2tyx36jn6l0mbcf3f6mr6yruxvfx6b09sdt56vtkgdt9pzw4jl71b4ki9av5urbb80sz96qaqefkk06s6tfe61ff5j4oxakqsgxyago91cb2fzcmveaa1xuuvg3d978q3gp2ityduyrp1iov606bd9pfpen9zl1skwgx5xec',
                email: 'hrwbe5s1k707cy52j5teyqfijflcrlwc0a0b7ke41d5r1cn9bsz7rg5ogljrtw9bqkgckedz1dr00hd2sy1e4djkj5gldyoijk9ctzsbdxnooxdlq54kjeeg',
                mobile: '33h14rd67hali9urxr1wx66kpqky9l47eq4mimqcvxsbxmgqkuxhjyeij8cb',
                area: 'x90ds1kysg63w6fu1oyq4cxx2vx4ddz9pamep5ijs1auyfhgarudc0ib7bcyq6es6wadyvcypevx9m6empfgkxbk22u3hp5gm21gxdvcs6hqbv0wakuahy62fef8gt32c31q1n4i1vmxovlxqiyppyp15p3ttjxmg7yavp276yje53s0s836knlovkoajwiznhnggn02j4lce0xhajvu03zv3e6ezru0quy3i6b6ld1tqi2chpkk1w4ulnh5j8a',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                tenantCode: 'swq92ff38xyx0xejzmy2kpoi68g1vgr6c2a67uc5avnycbpxxn',
                systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                systemName: 'qauztmjfnl50cxezhgbx',
                roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                roleName: 'tko08yssjgdq8z6qe33dcmsc106so4bqz3htfkhiqcpt4y1963z266b8kh87o0wsf5u6y7w1g8p4qjve3w52qpgdzi8dlya79eswpg9qbcsm7zrs5zm3tsdp7l9kge1rbpev31puifrvnih85nrk9bwdn9gx1cigyy72mw82822f7m416hwwq3s60mulo58k8zj0mmj62q24emzududtaejxtxijgitvcdm3cvbaobg9ces0cg8cv598g8h36km',
                name: 'smwwa1riboog2gtdlyjozovp0kiep4vx301zuo75m2knp0wg8icvzaoqpsao4t2k531bkz4tqdqaafaj02ykdwebvqrweiyqtmlhgeha7wrgy3p2nqvfna31jgs8frymslk51599j3jreiviikya8tcxcokuyxrpw6i4qco7kzktkk99k4iu8jw54ks0pvbbyirr4s3sh7k05u2tc6m4nl4eetryfoyt2btdooju4l6utfa4w8cbu3dgn56lytk',
                surname: '596guatjcibcd7fijqtvm8qmm1orvpobu4crnmvjeqzaanh95abti19h9sn19iz3trugid1nyu1nxkpy6sd02bkczi8na9fhv51cs7w6krzmy5tqrjtbbx3hhbcjw96lj6b555mjazwrzxef399detcsnz3fvfgp9rgc7vdhyucih3u46mg3rmyk5w854ndn5et4hd94pcwbqex28subu619mxje7f9ny58vgoppwdi7axt358w6vn7096llxew',
                email: '22e85h52ww32lwadsq8e3zlwd0j1m3xz8llemhleundqnqef67huf0b61z5rni54mmxo7pcl67ygeo5eq7r3a0vmbtvyagkn3t9v5eabsgcsigz78giseydi',
                mobile: 'fwjcmqvr0bv4jzijjpkwd6lvs8z01uz5ev90g45r1geu0660hd3w22ww3f7o',
                area: 'ulxxb1ktwmm09hb2ryw40xtomiys5s0sbuw5u3eu47k423acluk7t5sq3hgpsqbfl9521gl7u7ptgfvj29e1yjwqrr2ddspbl0ou7b7fas79wguwq4ko5xpjf972ujkc1mxoseuz9cs2v5jj2gduucdupuw7csgd99mkczy9syqcc17to8aa1jy8xc9kumg66n1us8cufqjv41hazyg97ecjjcjby4o7sif8ow852erwg6hoiin3777y72sxusl',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3a00e70b-4b20-4013-afd7-abb712d8dfc9'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/17c9df59-04b0-4198-a6d9-732e3f7f262d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/3a00e70b-4b20-4013-afd7-abb712d8dfc9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '40fc4b17-8849-4e53-b4ac-fa4820ee8b9c',
                        tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                        tenantCode: 'vry7kq9xqnhtolb1y3lrv3ef1s99y9cocjmx56f4gbz3rmidc7',
                        systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                        systemName: '0p83waq94ek8ilg91q1l',
                        roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                        roleName: 'v2i4bv4q8jwux5a7q4660v7hxn6hm8dkgmcmoo5zw6d8vezpitt4wpww5w4xs1ahhtlsjrkv1kvpt50ui2zapnbe62ilvbt359t51mqwdjtlohzw5qfa74nl35kxwxukao6xvwln4kdcv8r4bdykaqvrfe9gtg5ymkh21jbc0tyjr6dogv5ll4fpuoa4kq8bizngu2gk34k3lpg2diasew0jbxks10zzczaa9wfbrwpj5eo79lbdlou7gbq6cib',
                        name: 'lod0nbzxuey8we4rd48hwh9mjc8otznu1lcy6jalw63gjq6kbbxqkyzsay80zny264ryuo3290bdfjn844opejd474jpbxbrsy1ilm503jy3nvtrvky99al6lognnytdsy3j4w610t35x4jbcyou7bdxl7u3wsofhk4obopx8iqz0ebwmuup8tay27w80b5dhuxpvnc4yrlse0o4ckg3kpxruibtxbx6lyu332gmgffloaket2613v60alvt8bk',
                        surname: 'l00nyucor0alvjc7mk928gnt85x5cr2f27m7vpjtvvr904hvpbmnh6hjtuxysgj5xr84jcu1q3l1nrve0hwzlum9z52l2v3cbvvcql8mfep7unwfpb2gas4hpxuyf2228foool938l2shnvgqiuy7wp6outihfbl59nwmfye2ztgj95fwxr66drucbdu6xysgvonb26wkmstvxofkhw5op8nxet6o5j5elfc7jhf811dex6puul8albcjczbczq',
                        email: 'sk6fpeepi4bijxv35888qr9y19be0d7h1c0ca02optzpqni3mjgfnvb4z73dlyp3o1jluo1jm8gd6qe0ngjwf0ocrka3sybvg7d71qy7rb2skkbdpm79p8vg',
                        mobile: 'wt7udnl4mqwknkj5i2bh6adxx1ay8d2bhgkky9tqtcpizh4s6n2z4wowlf52',
                        area: 'sry4edq2hn5zc8dfcbjvm7e3huj3zbokobtfbtqkmss454pjzeejzjzfd4i27xv1hzdzj4iqewwtm737tv25tdjuy3i2tiuat9b02zlp5ddtatdp2o2rcpnqp8frao7etz0jwx87vvarvod9d2wnrcb0b0s2snzkhp3f4qz9t53ob482p5tau95n2jdwdyy62m0hz8w28qyc6k1v50ikb15sazbqd8mnfzebynjgdosso5pza51yzmwhf81ukhj',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '40fc4b17-8849-4e53-b4ac-fa4820ee8b9c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : 'b88c5c81-802d-41a4-a48a-7b3937ecbe81'
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('3a00e70b-4b20-4013-afd7-abb712d8dfc9');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0e92b3a1-1e11-4c1a-96c6-b0f889865465'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('3a00e70b-4b20-4013-afd7-abb712d8dfc9');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a76f8fcf-5d78-4567-895f-86e5d57ba2f9',
                        tenantId: '1ddad884-2f76-4e5f-8933-9335b1c51511',
                        tenantCode: '0p4n4xc8sn7cgm0iu1lir8v8we0y1rbjnz049rprzgxjs2ayql',
                        systemId: '7d326e6b-b15a-4b18-a0d9-33735c5dc826',
                        systemName: 'wh6vj8dv3ff8xknhlv7d',
                        roleId: '26486484-f3e7-4e61-8bb1-846334dae41c',
                        roleName: 'pqsepux2qfxohbbsye3ia19fm2ps6fobaulavqvdgfitffw2kcqdfja75ejsp823ehebrff3gc61dmj8jrjg1pnc8yre8ecd5b4bplfs4zi1esfblfx0cr3tefycicnchnk291vxoq91spilytg3pblj0w2uuzdnvws3tkjet08w2m36uyiikyvfns8ns8kn912r3konw6njfdp2fjldmaty4u8tn9h6l39m479ozte4rufbvsf8essm6wgo874',
                        name: 'qoy4y3lo0u2ozk7xfetn31972na6vce3hrvo75z8wg82cg6pcmme42g4h7y3flhc3rqgiwsdx4rzpslzb4lzw7ndykkw5q8fheoi00e66dgcpp9xyhimn2o6mo538kv5ujuktu9wgh8js0ghjx5univbnz98okpkgj0awrfkl6n1j6n4p4n754owvy64kvrjv2010xoavl59z3qndhi46o41xh6c3at4ll8vyl1wy26pcregd2k6vhjlkd0f061',
                        surname: 'f837bwifl7vtapaso8a5jxkok4gu5oj8rgmosq3ep4kabv6jxg7hjoodxq4uempiwjbptdr83ugpsf54fz8ke5nckqninbo2pv0gkjw4fltm10f421kd8skj1wbb9q0cgg0mrur0l3l08v03s1ptfs6q7lh809c60jajq8hwv9xpxblmoir92wfzvxr7jav5o8bv1x9xszgs6mr8k5bvj942yhizlh1pjqnxicane3axjk3okbm8b1gq6w6fprp',
                        email: 'mu09ptrxoq0zaaynja0qwy8ohh39j7j5qk93cs7fbksv2uvh364r3zf3xgexurpsrzu5ultggfpczn0vx3vabkvnkq8a19zn3y4fe8ji19x14hilvlmatrhe',
                        mobile: 'hy18vly47hia6ahwq7qgu0i7kxu4kqrlk05ko1t2uhgh6tatooxndkaqskjn',
                        area: 'ldypcxkwjucyr6tap60uo108ohbzddrwlh8ukztqs0kvakpzy2s93nlceyx5zzsaemvui5m62fq8j8oby1xy8k78mh19geqdqtsz5kq0s7brxeu05j14p5mewqtp5x2l5530cdk18hc0bamywlymrd3etu9f1993j30naoeo3g1ulz7cxzvauvrlr1z8l4osmi8snr6zykxbtvi5vykutxb7dv2d9ldnqglwkbzee5ftgri5gs9044kn6mb0n3u',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9',
                        tenantId: 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7',
                        tenantCode: 'e0e4tpwj4zp5f37gg9sfvp9u4i0jo07klet5k1tcegpnd1dy89',
                        systemId: '5b8434f9-32e4-4756-ba37-051cd033ffd7',
                        systemName: '150e1ofpp4i67xwrs64u',
                        roleId: 'ec22b292-1be8-4b46-a044-dc1ed4370eca',
                        roleName: 'tig9wh0hgu2mrcv6q0hdxznh07mrmbos3q8uzbzss3acd34k7enfxw3hhuauba4vcpgyjbqe3eiulsgty8uhewbtzzo4h3itd795uteijiv9g1fknduxz8cm4l0evdo2xjch9p4rohl60z81wj19pjzrxa7aahn6x0g8fobbr021693w67cjiba1238wr7yj78h578a4mtosxsmydseoswtgubeeknl5frgtxm5r9ozink0vcyskrupqprbjwcl',
                        name: '3wqzy5acl0xo5ff64cwcun50smkhyelsihhxj7zzhb9z5ayhqnnq4l5jkw4zsgw9nnlsyg4xtzq344fgfrcunxr66905nj18cpofakjk693jnql7de2d5zicf75v94u3i5gtsoo01mzimlbvqoc6cggam4flbs61z8e01uwgzi9js5mfbyebtc8l4twfmuq85135mgft37r27n6hw5g940r5pu05wwpdgs7lm1549ympco4pd7zzzdyk0t0l0ri',
                        surname: '6b4dqqg0vy945rtpkths6bvdfm69w56rztlcvdflx3n2r0r6ggunfub4vav0yy9q8vz4zrm1in1jx91lqst5plbmkrqv1f0one5xytwsm43aww1a44ygp7nr0cy49dtwvnvgvf34xjc18tt3frck2ywju64jktp6lwheoz0dme7f74rmnpqcaw5914sfaxv5k781ju8wokpxvcv2nljfyhztxk8jd9iusdmiwsobo202g796u1uqhkx1x8xs73k',
                        email: 'n8kauvgnc83xlzsxz5lifv2i3qvsnxubc1notajelgpa2ah8bq9w2sioylryirzfzmf9sn66pgrni96c8hf6b0yk4dl8mp4qeweez681uj0c45owpnrk0z3a',
                        mobile: 'kc4qj4esluyynte8c04z9lh2uzvh2toh2krl9k4heuknm6n8871s9b1qpg2b',
                        area: 'uflesikhokfcjb1g9d3j88qlbubs6n1zpjnn7c3gsf93djsvvz58o0nrcvcqlph5wwcx87kws25jngpjhqq4okgjv0b3hv2cuy5cpxvoihfa5hm8zfaswb8sjujv358tnqd2r46zd8p922bwltwhkf5dm02d18tfyzmgjew1t79azexkxu0hl19no57klzwvsrfedev3d8gzstknf373gxlyc8caq251xvtsl4ylxfg4b7r8lroxxx1vofo1mtn',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('3a00e70b-4b20-4013-afd7-abb712d8dfc9');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '343f9615-a172-4369-82fa-05d4ceac171c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('3a00e70b-4b20-4013-afd7-abb712d8dfc9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});