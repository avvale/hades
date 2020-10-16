import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '78782da7-e8aa-4668-84b5-0232a2a9039c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a19e48fd-b959-46ae-ad76-ebf13d1701fa'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2rrmwpm95uundmdjqsb2hsvhuoovfcmolbtvmpvjhtems3l1bnnoi68cqh9q0dk6b9t8ko2vzmz2k9diroxqz9fgbtxing7mep0rhm7bxhbqmsx7saigf3dr5rv17q9h3g0ddlvwuqqt6xkg6rxs3stmhyvlc1z76nr4grjv7npan7piptdp87ez4j2shk0mpp0s8s8zg4k1ruoeqlrb0a8er2g35rl9nhetxdhvocv2pf5cc00v97nm335w755'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '4jhtgrcscnalfvn3aoiw5hbkbsqz1934g5vk7oytxmkwa4m3t7xx9ayofnap982zjo00zuvcphsz84rjxeq2bjil2ktfcswdx6i44cbdt4kubiualipe0u7brynh1flxzp41xtehjtp5zzt6t8to044qjv8ogppw3n0zz5hh0rzslk8mhzl8mcrjm3ox8nbrnkiywwg7387wctiz4neeywzsfdfsp6u55ypjfcwtbrh90jrifopebq8ccf9pdm6'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'xkjff2n3kjwpiz0hgm3q4g7n2on4vbnw2fqpvltpy4vtbfxbpgvfzh2uvihd977rr88ulo8op3f47ppwqmecext61eidmg3lnrnygyfoihpvbq9z8ryiistb88pl7643qk5044w6g0frd3x2pwnnp6aktyngq52c6rvsubo5rknc050fgntsfukruea2572h6d7es1q7wg7akdwptzyxv2yq3znl8zik8tm986nasg71dddfhhdfcwu0ypsudmp'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ul7y5dc40kzmrpi2ldaiwpxnhq38zosvuq4bjdgl5s8j8wvj8f560y3nhtfq'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '4026894e-51dd-4542-9699-f2f32a5a6c8d'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'mg78oqy2f9x8fot8qyr4caxgk9vhyxakmswh4vie9kmqngdn517oysqlq6tpvvypfgw4ljw8imkvblbj2tptpgjtjvfw9fg8egfk8o6ag8a4azleze73qb8n'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '2dk4ecxwcifnaop2xpxvvjz2qeqg42yecy093jlt6i4a726qs7jjnrfpvkh0reic5eq8enho9fq6iezeavkwy08d8rj80l3hpom8lg2uovo4w7ubnfhti4281bqv9pebx0wrlqvgzxh7m1106tk5mjlfh7lgz97plsdjr3d2wh7tzytfln8e4y0f7l37sapzjzfm2w7il8u6aoqw4hu3bszkmnbvv8rsrdo72hajjhzhc10uk7hkykqggxemxby'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'yq0686tupjkh2oy8sj8p4r4z0m7g2h73bce0ct7r2kbzj61rr5n7lvlcmkgplazmww5rtj305qd1k5xnq5flivyvrqwkpke63drvpngjqxtyejahgjfece0iu6o6jn6tryjcy6u3dhaziepouck47z05v6yxu2uqvsa81zxa08rks8s4azq86x9n628crs5dp8ph73wdc4eu912d08rln0231bia8efido0jgbg3ahbgvca8ant7htkd85qt2ao'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
