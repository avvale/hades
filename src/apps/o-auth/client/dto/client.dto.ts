import { ApiProperty } from '@nestjs/swagger';
import { ApplicationDto } from './../../../o-auth/application/dto/application.dto';    

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b07ad268-215b-434a-9873-dbec1c5bf907'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mb54sev4g1vy95cvz7cay0o6l91rmkw3p1g9kfitzry9171o46p7obhmp6qsu68yjiy54ce2kv4h9lul48q6kium2hx0l1dzc215bbazofra8xgur40ik16ilez0ko27j7yeym42ykarp7fbr0rxhxku56n04m3vonkwkhqkgy0pjaolw72csl7mwbo0cmbk49l9un0c1o8blxvpxajyxq7v3j9zi8dj2r1hjr6v4447m017snrijuibqsh9xmk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '4zp1eyuasp49rtvnk3pw5ipxpbiicsbms79a1n6m9zvc33k4j5q41k1o7lf3p0e9snvf7paaela3r79ikvp3s8vmyf'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '7izd8mux38jysj0qb6lskfhoojyx26hs89gad12j14mdxibjsc7q40yzdccht58lv2f37310ph2nyjylr98pa1hmzgvafw2pvkmi3uilxtjdzkbs3fc6ewhyfkq5967hidn8z8z3cqkuvti8niubebbc6v5new53epih50ndd4ygj48bv4lsla7jujcw4fbrcfgrkr4y3ybuf07c8iww3t2tdlf4ygq0h33snpsh06j4q2ar34s24fyjc6tju4skv6opeqcfc6wlv7h9kfclwkk2b9akvstdf3lgmbzsyueqymp8jpkj5to08jmbbb6t1hcnr3nmc5pr4m54xpr7gop0a7s2kj1pftaaheo34p5bnwlgxdlsv8f4o9c3331pm30q4wu0i01e1ttn1hann22s5beulrpcdo2m9brr1tcn6c6ot32m06w2awavdrlh5xzf09rb0hqfx0b740jdcuegec1816jjnsrc5v8esryh22mxl1zmzb1twdacucfoyr9ht9f468dns7ezo0hvinybns9bg97kumdlh25ynq4imohggpc01xw05icroln16m1dvcbnglh0jl69t9ssnumlw2zv8uiitvzggaz35lj38s1sohabynpmu9owi5a1s65c0pfhe1vjrhjd0hzo1r32kie5xrckc3gn0e1v4xsct37dagsqc2v0j5xbonu3jf5oeiv5s44omkiwgq96grme743pby6ygygtqvop1lbcxv5s2hd6ilp4rukotll2j7do0vnpx9k1jd09ygrsimrq7qeca9ehcju08hubtjy7yzq2lvrw5jfbtxodt9dej4q2997q79r6zcac7jo3n2i498vfe22kv3agpq9j2eyppv85ci1mbcg0ldlawwltt4gdwvcli3bthhfbprdi5488b0sunr5ze5lpkqe584h604obty9a7tp3ryauuvm27dt5mnny7ampxuix50lbh9dejlakrowynvdgd0zrbtatado9iqp6y1jbfc8isnrsyo0ybomc1eh7v1f1lrq0ig6vhbq46g27gjkzrwyp1eb7du3zuj9v6m7zntg13592lkbmxffkma0oz3hjunapvm1iaus54fyj60o4ge9sxhggcmmn4h3sa0plhtwvtd09whyd346td07kaps5fbcrl0xw2gc8uadtja9h9qt03a7ajphyt5q8zgw59srjxf6y611kwrj0387k01sahgkz1his1lkxupfijeh4iicsrolfjxblx04yvq8uobkghnkbjpsfu6vzxzndez1lfbixlf58550op1ib6se4jfsa020obbmwvj2w0omnhdvdksf4ooitpsqto2jrtgozrntl31o6d64n891jnn8f3m79d9p02js8d827fe0ch3gzuv3ox2ejybs8cm94nl2w29qqexcngmlyylji0iscbu280pcz9xz9oz3ip74ygf9z8dim9vldpyi9qoyyf6qr6s3xrfgg84jfnjl45zyruz35yv73s7krqgkko6uczd3cgf75dgvooxhd0gv61873ljpa4qm71jm2fwtvemuc0o1fa091ghh0wsvhm7wqr2tljfptyy7z10lcr29es8dl1jjg2nacnllocwra76e9xzcntzmk2fvoudw81qdon98rdtzf30cafdixw7gnvxb61wh3lnvt7v1jj6s878c2gm6xih2quqx2kmhvs7l1b4e891dc8ovrxhmcll3m2um8dvqxwiepstj5y14z1i1u5oq6b0d4mhm3gubz54678auqz2p5f37tvpuupntlnkw7zcddylis04afarepbbl4aiuv792ui53mada76sc8t1h4xsdv8w8lqe6k63oe5vrk2dy89w583qqpl2rdjs58ge0b72zjsjoqq4lcgiookzf1j4ktfru2cjazdscxyp81g0ctwvpk3b6r5ja0nplozn9w582n8cfxflyrv9r0m7dqdpw1hfhn69whrc4wrjyili5r4k3fhraufbqm8egpnz7g0ydqn99jj6sdpbgb110zfgcv'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'cnqujllmly73s1v2tbo0b7mdfhelsf1pqvps1rol0rx6ylu5pdd7g378hp31aqcsm912hyvqs4vdnw16zok2qdylbpfvmkphjfv854hw7mvnhfauuldpw9rihnhtwsts0dcp184xnxkowk8szm1b37mcnxm0niyg1drkdn7mo8vy7fvr4ph8yqxnyixx68z7xl34qhhlwf76g8nvdge9ibhtlsjhuc6pzu5l2z1xfopjbnfglfq1h81wi2ipvc2z6nw51jinbm469fuvh6j9pt7ynnty8q1l0ce9vxx6kdtyysb0mbv4tvx67kx9lrc7pp8l89b5dl1dt7qkrh060eabascvnps01svz4cyou2lt17n7eu3wa60r3ovl1bpln54zgo60rzlrdvvpgrjidvfheptl3ycxn5q9ar763x08293ptl3hb3lrqv6u2d3f114h3zdfd6meelqw10jqllmcu6csdcklu4kx8apmafkqcxio5b5sj1mf2ubm9ellciqsiz53bx1292bfllppddgl7qf9cpdvhjjzylsnems9woq2odbgboyqyqcbwutiihaqmpc85gj5g6xdx58vj8j46s9tytk8qear84dvwm3hamcmq32is5oah5ngmhskn9cvguvv264aech6ifm1zlpu90ybkao0w3851rjfrqag2iphd78ynpbm63i2me9knplu9ulinxpe6dufkznjd6m3ursvu0615x3jd986ilbzlt9nh288h6rkv9lgxc8p31mjdd61zisbxr1jwj1hzq7fmlk5ijatn3s2wexxlazeb1ucc8edrm0kcgbm5shfrjg83o1uh03655rgxt6xdx3aivaizspt7779n111fvq26qp4a8ma16ull6s68ml02u7wbe17ver0we2s4c117jgx1tfjb3drtoo3l5cmsq1krs517gvd1j9zl050f3iu5deq1rmpu9i5ifiw92s30ibbg2tr57amprk7w54avb39pretvvya3f1ddxdcyt3o7l3zofj1qccwto9yh3y9hf5qo9x1wj1l4xu6sfv2psucas6zl1s84gnn6h4n7spxidppt50h10qunboxf59jn36val4wryx2uvpwwpk5ylhy1nxthwyy7746oo9hkoioissvyfe1ol89kab2kevtvmmhtyct3lucdsm83ut35lslphaxe597kxue7htdrod1djnoshw10g1as5km4vyjlm6rw1vxiqfktmwaj0h20y3lkdqe7eecyy9z29mnro409uqoldleyip5g6y1jng2pj80pd7eu0zbmvms9uk7fwa9zab1p0i9cyj4z5m6anrn8x33m99o46bvxjt70gg6hf3ploo61e3h49fvf8s3lv4odvgkrdu3xiu1bz9z65lztlg0uaocd6bfzpq0diqyk08w4yb50uyejnk10f5ezsh4m7pt7k1a2951nixe94eh18lfy6todzmuurki4khjw7hfu9xv937hsx4v3vd0z2vuu9ilugxcaashmvl6yvbui9bw869t7eaw43tb3l6regq4fszv99j40q5riba4ca06bxg88tvfea5a43bh8qtrkuexra7osy534nb3cqvpmyvfy9b2ezinzv7l3qfsh52o41ybbvvhmc8f0qwt59n3tukfcehlo4i7336qd4lvunyldqegd0jblrsincevg5byilwvqo38djodwryy9ca9gvt2z5n65xqkqdj1uo65tw7axzttzytwbs1aesut3lfl57pyslk4gdrjnlm8y3x4x83xvs44xpy383st25hhsqe97pybokcizgsou18fj5g407bnb3cjynplq92234eqvmz3y3f5yqaawfx12qqohdwm2nhgtgr64s8rd6njm7pi9ndzjk6rbm57olrm4b3htsicrrhp575ld6ipw2q01erckuw78bhf6rzs3rbbh37qysbyo2x306dy79g6eiyyuhtwr0id69tp3bqwk1v38xdhzpji8emhbmo2vknjb92rk3x413v5nbibvdog7a5k'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 5324110070
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 5262606884
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ApplicationDto],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applications: ApplicationDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 10:09:23'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-21 14:26:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-21 03:22:44'
    })
    deletedAt: string;
    
    
}
