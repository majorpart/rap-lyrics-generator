// Hardcoded examples data - all content embedded for SSR reliability
// No file system access needed, works perfectly in Serverless environments
const HARDCODED_EXAMPLES = {
    'longing-for-home': {
        title: 'Longing for Home',
        description: 'A powerful rap about middle-aged struggles, the weight of dreams, and the desire to return home.',
        image: '/assets/images/rap-lyrics-longing-for -home.webp',
        excerpt: '"Yo, middle-aged now, still chasing the dream,<br>But the hustle and bustle, it\'s wearin\' on the team.<br>I was on the grind, thought I\'d make it big..."',
        content: `
                <h2>Verse 1</h2>
                <p>Yo, middle-aged now, still chasing the dream,<br>
                But the hustle and bustle, it's wearin' on the team.<br>
                I was on the grind, thought I'd make it big,<br>
                Now I'm stuck in the city, feelin' so big, yet so small.<br>
                Every night I look up at the stars in the sky,<br>
                Wish I could go back home, but I don't know why.<br>
                They say life's a journey, but this one feels lost,<br>
                Woke up one day and realized I'm past my prime,<br>
                But the dreams I chased, they slipped through my hands,<br>
                Now I'm left with the regret, and the weight of the sands.</p>

                <h2>Verse 2</h2>
                <p>I remember the days, when I was young and bold,<br>
                Thought I could conquer the world, but I failed and was sold.<br>
                To the city life, the concrete and the gray,<br>
                But the heart of the home, it's callin' my name.<br>
                My parents' old house, with the memories so deep,<br>
                A place where my ancestors rest, and my roots are asleep.<br>
                But I'm too afraid to go back, fearin' the sight,<br>
                Of them seeing me fail, and their hopes in the night.<br>
                I've been making moves, but I can't make it right,<br>
                Stuck between two worlds, can't decide my fate.</p>

                <h2>Verse 3</h2>
                <p>The city's a jungle, and I'm just a fly,<br>
                Hustlin' and bustlin', but I can't reach the sky.<br>
                I miss the familiar, the comfort and the peace,<br>
                The sound of the silence, the rhythm of the trees.<br>
                But I'm no cap on my fears, can't let go of the past,<br>
                Afraid to face the reality of the last.<br>
                I've been through so much, but I've learned a thing or two,<br>
                That home is where the heart is, and it's always with you.</p>

                <h2>Punchline (Last 4 Lines)</h2>
                <p>So I'll keep on the grind, even if it's slow,<br>
                Till I find the courage to say, "I'm coming home, you know."<br>
                Whether they accept me or not, I'll still be the same,<br>
                A son who's unfinished, but still on the game.<br>
                No matter the outcome, I'll make my stand,<br>
                'Cause the journey's the treasure, and the heart that's in command.<br>
                So if you're out there, feeling the same, don't give up the fight,<br>
                Home is where the heart is, and it's always in sight.</p>
            `
    },
    'dreams-are-not-out-of-reach': {
        title: 'Dreams are not out of reach',
        description: 'An inspiring rap about persistence, grind, and ultimate victory.',
        image: '/assets/images/rap-lyrics-dreams-are-not-out-of-reach.webp',
        excerpt: '"Yo, remember that little girl, playing \'round the block?<br>Head full of rhymes, feet tapping, that\'s the clock..."',
        content: `
                <h2>Verse 1</h2>
                <p>Yo, remember that little girl, playing 'round the block?<br>
                Head full of rhymes, feet tapping, that's the clock<br>
                Tick-tock, the rhythm's callin', somethin' gotta break<br>
                She'd hit the floorboards, basement, just to make<br>
                Her voice heard 'fore the day, yeah, sun up, sun down<br>
                A beatbox battle, never really won, but somehow<br>
                She knew the pattern, how it was meant to flow<br>
                Turned the neighborhood into her own little show<br>
                No cap, no doubt, just pure instinct and grit<br>
                Sittin' on the floor, mic stand improv'd from a kit<br>
                12 hours daily, yeah, it was a grind<br>
                But every scratch, every line, a piece of her mind<br>
                She'd rap 'bout dreams, 'bout climb the mountain high<br>
                The city streets were her stage, the park's the only sky<br>
                At first, the stares, the sideways glance, the doubt<br>
                Just knew the bars, knew the rhythm, knew it was about<br>
                Survival, not acceptance, just the need to prove<br>
                Her voice wasn't just noise, it was the world to save<br>
                From mediocrity, from the everyday hue<br>
                She'd spit her truth, make 'em stop, make 'em rewind, see</p>

                <h2>Verse 2</h2>
                <p>Remember the park, the bus stop, yeah, the square?<br>
                The awkward silence 'fore the real performance there<br>
                "Just a kid rap... what a waste of time, right?"<br>
                She'd shrug it off, "Gotta try, gotta climb that height"<br>
                Faces turned sour, some just wanna ignore<br>
                But she'd keep spittin', "Yo, check out this new lore!"<br>
                The syllables built, a fortress in the air<br>
                Defying gravity, takin' every single swear<br>
                At the mic, yeah, but the real battle was within<br>
                Against the naysayers, against the fading sun<br>
                Each verse a brick, each line a step forward, slow<br>
                But steady progress, watch the meter go<br>
                From obscurity's shadows, peekin' through the cracks<br>
                The passion burnin', yeah, the hunger never flags<br>
                She'd watch the seconds fly, the minutes melt away<br>
                Just focused on the rhythm, on the message, on the day<br>
                When the whole world hears it, when the recognition comes<br>
                Yeah, she was on the grind, never missin' one of life's trims</p>

                <h2>Verse 3</h2>
                <p>The rejections poured in, like hail on a rainy day<br>
                "Too raw," "Too quiet," "Can't make heads or tails, man, play"<br>
                But she'd collect the feedback, learn, adapt, redefine<br>
                Polish the edges, but keep the core inside<br>
                The style evolved, the sound got sharper, yeah<br>
                Turned heads in circles, made the critics say, "Whoa!"<br>
                Small crowds, then bigger, faces startin' to change<br>
                From "Why is this chick spittin'?" to "Word to your main"<br>
                The persistence paid off, the effort finally showed<br>
                She wasn't just rippin', she was livin' out the code<br>
                The dream, that childhood promise, finally startin' to bloom<br>
                From the concrete jungle, from the hardest of rooms<br>
                The square and the bar, the stage was finally hers<br>
                The girl who just wanted to rap is now on top of the charts and stirs</p>

                <h2>Verse 4</h2>
                <p>Now here I am, standin' in this big bright light<br>
                Got the mic in hand, feelin' the vibe, feelin' right<br>
                This ain't about fame, ain't about the crown<br>
                It's 'bout the journey, 'bout survivin' the town<br>
                That little girl still lives inside, yeah, she ain't gone<br>
                Her story's etched in every single song<br>
                They tried to silence her, put her on the shelf<br>
                But every verse she wrote, every single effort, she'd self<br>
                Believe it through, even when the future looked grim<br>
                Like watchin' time fly by, watchin' the big dreams dim<br>
                But she held on tight, kept the faith, kept the flow<br>
                Turned doubt into doubtlessness, yeah, that's how she got here, you know<br>
                Pushed through the pain, through the nights and the days<br>
                Every single syllable, every single breath, paid<br>
                The price to be here, to be recognized, to stand<br>
                And say these words, and make the whole world understand<br>
                This ain't just luck, this ain't just hype, this is the proof<br>
                Of a dream that wouldn't die, kept on its life-support<br>
                By grit and grace, by sweat and tears, by soul<br>
                This whole damn thing is real, ain't no cap, no fake, no hole<br>
                In the end, it doesn't even matter why it started, does it?<br>
                Just know the fight, the sacrifice, the whole damn process it took<br>
                From the playground to this stage, from silent prayer to the mic<br>
                This is the journey, this is the victory, this is the <strong>VICTORY</strong>!</p>
            `
    },
    'protecting-homeland-in-war': {
        title: 'Protecting One\'s Homeland in War',
        description: 'A raw narrative of conflict, loss, and resilience.',
        image: '/assets/images/rap-lyrics-homeland-in-war.webp',
        excerpt: '"Yo, walk the streets of Gaza, feel the weight on my chest,<br>Concrete dreams crumbling, peace just a distant guest..."',
        content: `
                <h2>Verse 1</h2>
                <p>Yo, walk the streets of Gaza, feel the weight on my chest,<br>
                Concrete dreams crumbling, peace just a distant guest.<br>
                Bullets fly like confetti, no respect for the flow,<br>
                While the world keeps watching, glued to their TV show.<br>
                They call it Operation, but it's just a hustle game,<br>
                Powers playing chess while kids are burning their home's flame.<br>
                A little girl, no older than ten, lost her place to stay,<br>
                Now she's on the grind, searching for shelter in a rainy day.</p>

                <h2>Verse 2</h2>
                <p>They say it's for security, but the cost is too high,<br>
                A child's laughter replaced by the echo of a cry.<br>
                Buildings crumbled, stories shattered, no time for a rewind,<br>
                While the big shots make moves, living off what they've been feeding.<br>
                No cap on the damage, no shame in the sight,<br>
                Leaving scars on the soul, day and night.<br>
                She walks with no shoes, dreaming of walls that can hold,<br>
                A future without fear, that's the only goal.</p>

                <h2>Verse 3</h2>
                <p>They bomb and they block, but they can't block the truth,<br>
                A little girl's spirit, still shining through.<br>
                She's building her kingdom from the rubble and the dust,<br>
                While the world talks about profits, not a single bush.<br>
                They call it progress, but it's just a war for the land,<br>
                Taking everything, leaving nothing but pain in the hand.<br>
                She's the face of the struggle, the heart of the fight,<br>
                Even in the chaos, she's still shining the light.</p>

                <h2>Punchline (Last 4 Lines)</h2>
                <p>So they come in with tanks, thinking they're the king,<br>
                But the real power is in the little girl's strength, not the steel.<br>
                They destroy homes, but they can't destroy hope,<br>
                While the world looks away, they're breaking the hope.<br>
                So next time you hear lies, remember the cost,<br>
                A little girl's future, a broken host.<br>
                Peace? First make the bullets stop, then we'll talk.</p>
            `
    },
    'the-boy-confessed-his-feelings-to-the-girl': {
        title: 'The boy confessed his feelings to the girl',
        description: 'A heartfelt rap about expressing feelings and vulnerability.',
        image: '/assets/images/rap-lyrics-boy-confessed-his-feelings-to-the-girl.webp',
        excerpt: '"Yo, the moment I saw her, time just stood still,<br>She was flipping pages in the library chill..."',
        content: `
                <h2>Verse 1</h2>
                <p>Yo, the moment I saw her, time just stood still,<br>
                She was flipping pages in the library chill.<br>
                Sunlight peeking through, hitting her face so divine,<br>
                I was frozen in place, thinking she was mine.<br>
                But I was on the grind, too shy to make a move,<br>
                Every glance I stole, every beat of my heart's groove.<br>
                She was cute, no lie, a vibe that was no cap,<br>
                But my tongue was tied up, glued to the trap.</p>

                <h2>Verse 2</h2>
                <p>Days turned into weeks, and she stayed on her grind,<br>
                I followed her steps, but never crossed the line.<br>
                Making moves felt like climbing a mountain so high,<br>
                While she was just a memory in my eyes.<br>
                I thought about her smile, the way her lips would part,<br>
                But the words stuck in my throat, couldn't be art.<br>
                She was a dream I chased, but never could touch,<br>
                A little bit of heaven, a little bit of luck.</p>

                <h2>Verse 3</h2>
                <p>Now I'm finally here, standing tall and straight,<br>
                Got the courage to say, "Girl, I really like you, alright?"<br>
                But the question is, will she look at me with a smile?<br>
                Or will she just keep walking, ignoring my style?<br>
                No cap on the feelings, no turnin' back now,<br>
                Whether she says yes or no, I'll love her somehow.<br>
                Even if she finds someone else, makes a brand new life,<br>
                I'll still cherish this moment, keep her in my sight.</p>

                <h2>Punchline (Last 4 Lines)</h2>
                <p>So I say it out loud, feel the weight in the air,<br>
                Whether she hears it or not, I'm still here, still care.<br>
                If she chooses another, I'll still love her the same,<br>
                'Cause true love is forever, no matter the game.<br>
                So if you're out there, feeling the same, don't be afraid,<br>
                Love is worth the risk, don't wait to make a move,<br>
                Even if it's one-way, it's still a love to believe,<br>
                No matter the outcome, I'll always be true to the feeling.</p>
            `
    },
    'brothers-keeper': {
        title: 'Brother\'s Keeper',
        description: 'A story of loyalty and brotherhood.',
        image: '/assets/images/rap-lyrics-Examples (1).webp',
        excerpt: '"Street nines, remember that Chevy Malibu shine?<br>On the grind since crip, no lookin\' back, just time<br>From broken glass to stage, the dream ain\'t overpaid"',
        content: `
                <h2>Verse 1</h2>
Street nines, remember that Chevy Malibu shine?
On the grind since crip, no lookin' back, just time
From broken glass to stage, the dream ain't overpaid
This whole thing started when we was barely made
Me and Dre, the ones with the crazy rhyme game
Promised each other we'd keep each other sane
Through the darkest days, the hunger inside our frame
A brother's keeper, ain't nothin' else than real
That producer came, a sudden golden gleam
But he only wanted one, left Dre out in the cold
Like we were just some flickering neon spell, a broken shelf
Now the beat is busted, Dre's the only one who had the shelf
On the stage, the silence, the spotlight feelin' hell
The crowd expectin' hits, but I'm standin' on the edge
My whole life felt like a twisted track, head over hell
This is the pressure, the weight on my chest, the story ends
Not with a win, but with a choice, like I'm plottin' the next best bet.

                <h2>Verse 2</h2>
They said, "Why do you walk away? The money's callin' loud"
But loyalty's my anchor, ain't no cap I'm proud
To let this dream compromise what's truly deep inside
This ain't just me, it's Dre, my brother, by my side
The producer's face is a blur, a faded postcard scene
The real enemy is inside this competition
The beat's distorted, the samples gone insane
My trust, like glass, just shattered in my brain
But I see it now, right where it all began
My friend who had the keys, the backstage, the chance, the plan
To play God with our sound, twist the melody
So I pull the trigger, I choose the solo stance
Leave the duo status, walk to the mic, the crowd's roarin'
This ain't a performance, this is payin' the score
For the broken track, for the trust that got misplaced
This is just me now, but it's the realness I embrace.

                <h2>Chorus</h2>
This is for Dre, the one who kept the flame alive
Through every struggle, every heavy ride
A brother's keeper, yeah, that's how the story's rife
When the world forgets, I remember, stayin' on the thrifty side
Of loyalty's scale, yeah, I'm keepin' it real, no disguise
This bond ain't broke, the track might be, but the memory's high
We climbed together, but now it's just me, standin' here so high.

                <h2>Verse 3</h2>
The acapella flows, raw and stripped bare
No beats to follow, just my voice in the air
Every word is a brick, building a tower of trust
A brand new anthem, no need for producer's lust
They see the vulnerability, the artist bared his soul
But this ain't weakness, it's the strongest feeling whole
This is the punchline, the moment they least expect
Me and Dre's song, the one we never broke the pact
To keep it real, keepin' it real.

                <h2>Punchline (Last 4 Lines)</h2>
So I dropped the duo, took the solo stage
Didn't need the fame, needed to keep the faith
The beat was busted, Dre was the scapegoat, fake
But the real MVP was loyalty, and I gave it back.
            `
    },
    'delivery-flow': {
        title: 'Delivery Flow',
        description: 'A rap about daily grind and hustle.',
        image: '/assets/images/rap-lyrics-Examples (2).webp',
        excerpt: '"Sunrise hits, I\'m out the door, on the grind, no cap,<br>Sipping coffee, rush hour grind, the streets get hot.<br>Riding scoot, the thermometer up north"',
        content: `
*(Verse 1)*  
Sunrise hits, I'm out the door, on the grind, no cap,  
Sipping coffee, rush hour grind, the streets get hot.  
Riding scoot, the thermometer up north,  
Destination: nowhere, but I keep me hopin' for a drop.  
Traffic jams are my playground, deadlines are my test,  
Every turn a challenge, every ride a lesson best.  
Seen suits in the office, got the whispers and the lies,  
All that buzzin’ talk, ain’t nothin’ but fake disguises.  
But when the day is done, and the mic is in my hand,  
I spill the truth, step in the sand, make it understand.  

*(Chorus)*  
From the scooter’s wheel to the stage’s appeal,  
I ride the line, make the story real.  
The urban villages keep me fed, a rhythm in my head,  
The real world’s mess, but my flow’s the lead.  

*(Verse 2)*  
Delivered chili sauce to a suit, spilled it on his shoe,  
He said, "This ain’t right, take it back, too slow!"  
The elevator choked, the clock was tickin’ low,  
A high-end party, lost the order, watchin’ time just flow.  
Late by ten whole minutes, walked in, felt the heat,  
A guy in a black suit said, "Rider, get this food while you can beat!"  
I put the box down, took a breath, ain’t no way I’m backseat,  
Started spinnin’ tales, the mic was my weapon, sharp and straight.  
Word for word, the silence hit, like a beat gone cold,  
Then a judge stepped near, gave me a nod, "This ain’t no joke, hold."  

*(Chorus)*  
From the scooter’s wheel to the stage’s appeal,  
I ride the line, make the story real.  
The urban villages keep me fed, a rhythm in my head,  
The real world’s mess, but my flow’s the lead.  

*(Bridge)*  
The map I sketched, the routes I tracked,  
Turned into rhymes, a rhythm I packed.  
From the heat of the night to the cold studio floor,  
My journey’s far from over, no more.  

*(Punchline - The Last Four Lines)*  
So next time I’m deliverin’ pain or makin’ gains,  
I’ll keep the flow rollin’, no regrets, no strain.  
The map’s a metaphor, the journey’s the refrain,  
The grind? It's my anthem, forever in the game.
            `
    },
    'ghostwriter-no-more': {
        title: 'Ghostwriter No More',
        description: 'Breaking free from the shadows.',
        image: '/assets/images/rap-lyrics-Examples (3).webp',
        excerpt: '"Stuck backstage, the vibe\'s too thick<br>Watchin\' him shine, while I stay sick<br>Got the bars flowin\', yeah, I\'m on the grind"',
        content: `
(Verse 1)
Stuck backstage, the vibe's too thick
Watchin' him shine, while I stay sick
Got the bars flowin', yeah, I'm on the grind
But the spotlight's on his lined
This whole damn setup, it's twisted, ain't no cap
He's the face, but the face ain't the whole package
Every hit he drops, I wrote the blueprint
Just callin' it creative direction, not really rap.

(Chorus)
Yeah, I'm the ghost in the machine, the silent key
Built his whole empire, watchin' him be free
While my name's a footnote in the back of the book
'Til tonight, this whole facade's gon' look shook.
(Fade out)

(Verse 2)
They call me 'assistant', yeah, that's the label he hands out
Gotta keep my head down, never put on a show
'Bout the ink and the pain, the truth that I'm handin' out?
No, ma'an, this ain't 'bout bein' the chosen few.
This whole nine-to-five, but my clock ain't runnin' on time
Every line I spit now is pure fire, straight from the thigh
I seen the city vibe, heard the masses begin
To question the setup, the whole damn facade's beginnin'.

(Chorus)
Yeah, I'm the ghost in the machine, the silent key
Built his whole empire, watchin' him be free
While my name's a footnote in the back of the book
'Til tonight, this whole facade's gon' look shook.
(Fade out)

(Bridge)
See the cameras flash, the energy buildin'
He's about to say somethin', watch his words get twisted
Acceptin' the award, the mic's pickin' up
This ain't no encore, this is just the start of the hub.

(Verse 3)
Alright, you think you're the star, the main event in the show
Well, this is my cue, the real MVP gotta glow
No more ghostin', no more hidin' the light
This mic is mine now, let the real story ignite!
Listen up, my friend, the legend's finally here
Every verse you stole, now face the music, man, don't fear
Your glory was crafted, your fame was designed
Now the creator's stepin' up, puttin' your whole game to trial lines.

(Punchline - Last Four Lines)
This ain't no encore, this is just the start of the hub
You thought you were the main event? Well, you heard the call, no cap
The ghostwriter's done scribin', it's time to take the stage
The real artist is here, no more pawns, no more page!
            `
    },
    'our-broken-hit': {
        title: 'Our Broken Hit',
        description: 'A story of love and loss.',
        image: '/assets/images/rap-lyrics-Examples (4).webp',
        excerpt: '"Black ice on the dashboard, shinin\' in the rain<br>Wrote the anthem \'bout the girl who lit my candle flame<br>Honeymoon gone sour, but the chorus stillin\'"',
        content: `
(Verse 1)  
Black ice on the dashboard, shinin' in the rain  
Wrote the anthem 'bout the girl who lit my candle flame  
Honeymoon gone sour, but the chorus stillin'  
Now the fame's a buzzsaw, choppin' up the rhythm  
On the grind, movin' fast, gotta make it no cap  
But the feelings got a life of their own, hard to trap  
She was my muse, my mirror, my escape from the trap  
Now the hits got heavier, but the heart's still crackin'  

(Chorus)  
'Our Broken Hit' went platinum, diamond, and gold  
But the love that fueled it all just got cold  
Now the crowds are gone, the fame's a heavy load  
But the melody still lingers, on this empty road  

(Verse 2)  
Can't play the chorus live, it's a wound too fresh to read  
Every note a reminder of the love that got led  
By the grind and the turbans, nowhere left to flee  
Now the songs are unreleased, just whispers in the breeze  
Till I saw a stranger silhouette in the haze  
Singing lyrics I wrote, tears stainin' her disguise  
She knows the words by heart, like they're etched in her veins  
A ghost from my past, bringin' back all the scenes  

(Bridge)  
The success is loud, but the silence is deeper  
Love turned to static, or was it just fear?  
The fame was a magnet, pulled her away like a feather  
Now here she is, singin' the songs about the after  
The loss, the struggle, the future we missed  
The diamonds and ice, the loneliness we hid  

(Chorus)  
'Our Broken Hit' went platinum, diamond, and gold  
But the love that fueled it all just got cold  
Now the crowds are gone, the fame's a heavy load  
But the melody still lingers, on this empty road  

(Verse 3)  
She ain't the same, but she knows the key  
To the lock my heart put on the song and the beat  
Tearin' up the lyrics, makin' me wanna kneel  
This connection, this energy, can't be sealed  
Some love ain't lost, it's just changed its form  
Like a butterfly, comin' out of the storm  
She's the echo, the phantom limb, the lingering scent  
Singin' the songs I wrote 'bout the end and the lament  

(Outro/Punchline)  
Heartbreak's the hook that's undeniable  
But in her eyes, I see the love that never really left  
From the peak to the pit, the hits that we've kept  
This love's a scar, but it's still the one that bleeds  
So here's to the hits, the losses, and the way we met  
Some love just lingers, even after you're gone, or so it seems  
It's a feeling so deep, it breaks you, but it never ends  
That love was real, it just got rearranged.
            `
    },
    'underdog-anthem': {
        title: 'Underdog Anthem',
        description: 'Rising from the bottom.',
        image: '/assets/images/rap-lyrics-Examples (5).webp',
        excerpt: '"You see that chrome shinein\' bright, cold rainin\' down outside<br>That ain\'t no accident, that\'s all the suds I ever tried<br>Back in the day, yeah, I had rhymes that shook the whole block"',
        content: `
(Verse 1)
You see that chrome shinein’ bright, cold rainin’ down outside
That ain’t no accident, that’s all the suds I ever tried
Back in the day, yeah, I had rhymes that shook the whole block
Now I’m a mudslingin’ mudslinger washin’ cars on the clock
They called me a joke, said my future was scrubbin’ wheels so plain
Never thought I’d standin’ here, on this luxury stage again
But somethin’ inside clicked, my pen was callin’ out loud
While engine oil dripped down, my craft was on the fritz, no good
But I still got that flow, yeah, I still got that beat inside
While the car wash conveyor belt keeps pushin’ me to the side
This ain’t no fantasy, this is the grind I had to face
Nowhere near the summit, but damn, I’m building up the base)

(Chorus)
From the garage floor to the grand stage, the story’s written in the age
They washed the shine off my chances, but the artist never fades away
Nowhere near the headliner, but the show just got delayed
This anthem’s for the overlooked, for the ones that rise and never sway

(Verse 2)
They saw a kid with a hose, not the king comin’ through the door
Didn't see the rhythm in the rain, didn't see the future anymore
The penthouse dwellers, sippin’ wine, blinkin’ at the scene unfoldin’
Thought they hired a car guy, not the MC with the vinyl veins unfoldin’
These luxury rides are my canvas, these puddles are the spray
My bars are sharper than the polish, my truth cuts through the day
They thought my mic was a joke, now they see the sound ignite
This ain't no car wash serenade, this is the ultimate fight
For the respect I deserved, yeah, I’m drivin’ off the hype
On the back of a Benz, yeah, I’m climbin’ up the climb)

(Chorus)
From the garage floor to the grand stage, the story’s written in the age
They washed the shine off my chances, but the artist never fades away
Nowhere near the headliner, but the show just got delayed
This anthem’s for the overlooked, for the ones that rise and never sway

(Bridge)
Remember the slights, the whispers, the "why bother" in the air?
How they tried to wash away the talent, water downin’ my care?
But the beats kept bangin’ in my head, like an engine that was hot
I buried the talent deep, kept the dream in a concrete lot
Nowhere near the spotlight, but the fire never went out low
Still got the rhymes in the veins, still got the hunger, still got the show
Today’s the day the gilded cage can finally start to break
This ain’t no car wash ceremony, this is the closing chapter!

(Chorus)
From the garage floor to the grand stage, the story’s written in the age
They washed the shine off my chances, but the artist never fades away
Nowhere near the headliner, but the show just got delayed
This anthem’s for the overlooked, for the ones that rise and never sway

(Outro)
(He adjusts mic, nods to the crowd)
This ain't just a story, it's the track that started in the rain (1)
Every drop of struggle, polished to a shine within the pain... (2)
From the lowest lows, to this reflection in the glass... (3)
...The underdog's anthem, ain't nothin' left to chase. (4)
            `
    }
};

// No longer using file system - all data is hardcoded for SSR reliability
export function getAllExampleSlugs() {
    return Object.keys(HARDCODED_EXAMPLES);
}

// Directly return hardcoded content - no file system access needed
export function getExampleBySlug(slug) {
    const hardcoded = HARDCODED_EXAMPLES[slug];
    if (!hardcoded) {
        return null;
    }
    
    return {
        slug,
        title: hardcoded.title,
        description: hardcoded.description,
        image: hardcoded.image,
        content: hardcoded.content
    };
}

