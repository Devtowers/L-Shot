console.log("script.js loaded!"); // Output a message to the browerser's console to confirm the script has loaded

function typeText(element, rawText, defaultSpeed = 40, callback) {
    element.innerHTML = "";
    let i = 0;
    let speed = defaultSpeed;
    let text = "";
    let actions = {};
    let currentColor = null; // 🔹 Tracks current active color

    // Parse and extract markers
    const markerRegex = /\[([a-z]+)([a-z0-9#]+)?\]/gi;
    let match;
    let cleanedText = "";
    let lastIndex = 0;

    while ((match = markerRegex.exec(rawText)) !== null) {
        const fullMatch = match[0];
        const command = match[1].toLowerCase(); // e.g., "color"
        const value = match[2] || "";           // e.g., "blue" or "#ff0000"

        const plainText = rawText.substring(lastIndex, match.index);
        cleanedText += plainText;

        const charIndex = cleanedText.length;
        actions[charIndex] = { command, value };

        lastIndex = match.index + fullMatch.length;
}

    cleanedText += rawText.substring(lastIndex);
    text = cleanedText;

    function type() {
        if (i < text.length) {
            if (actions[i]) {
                const { command, value } = actions[i];

                if (command === "pause") {
                    i++
                    setTimeout(type, parseInt(value) || speed);
                    return;
                }
                else if (command === "waitclick") {
                    const resume = () => {
                        document.removeEventListener("click", resume);
                        type();
                    };
                    i++;
                    document.addEventListener("click", resume, { once: true });
                    return;
                }
                else if (command.startsWith("color")) {
                    currentColor = command.replace("color", "") || value;
                if (currentColor) currentColor = currentColor.toLowerCase();
}
                else if (command === "resetcolor") {
                    currentColor = null;
                }
                else if (command.startsWith("sound")) {
                    let soundName = command.replace("sound", "") || value || "step";
                    soundName = soundName.toLowerCase();
                    const filePath = `sound/${soundName}.mp3`;
                    console.log("Playing sound:", filePath);
                    const audio = new Audio(filePath);
                    audio.play().catch(err => console.warn("Sound play failed:", err));
}
                else if (command === "fast") {
                    speed = 15;
                }
                else if (command === "slow") {
                    speed = parseInt(value) || 100;
                }
                else if (command === "reset") {
                    speed = defaultSpeed;
                }
            }

            // Apply current color state
            if (currentColor) {
                element.innerHTML += `<span style="color:${currentColor}">${text.charAt(i)}</span>`;
            } else {
                element.innerHTML += text.charAt(i);
            }

            i++;
            setTimeout(type, speed);
        } 
        else if (callback) {
            callback();
        }
    }
    type();
}

// Stores all the story scene, each with its own text and buttons

const scenes = {
    scene1: {
        text: "[waitclick] It was gloomy that night. It felt like pointless to see how the days go by, as if nothing ever changes — so why even bother, right?",
        image: "Image/Tree.png",
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene2" } 
        ]   
    },
    scene2: {
        text: "This is how my life was for the past years.[pause1000]  For the sake of bringing some change to this miserable life, I decided to go to a bar.",
        image: "Image/Tree.png",
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene3" } 
        ]   },
    scene3: {
        text: "It's been a while since I last went drinking, and as luck would have it, I stumbled upon a sign that read.",
        image: "Image/Branch.png",
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene4" }
        ]
    },
    scene4: {
        text: '[slow]"The Bar."[pause1000]  Heh,[reset]  what a funny name.',
        slideshow: [
            { src: "Image/Pick.png", style: "top:10%; left:0; width:100%; height:100%;", fit: "contain" },
            { src: "Image/Glows1.png" },
            { src: "Image/Glows2.png" },
            { src: "Image/Glows3.png" },
            { src: "Image/Win.png" }
        ],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene5" }         
        ]
    },
    scene5: {
        text: "[slow]It was a sketchy place, hidden underground[reset] — the kind of spot that makes you feel like someone might mug you at any moment",
        slideshow: ["Image/Hidetree.png","Image/Grabtree1.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene6" }
        ]
    },
    scene6: {
        text: "But thankfully, no one was there. I found the door and opened it. Despite its sketchy exterior, the bar inside was well-decorated. The dim lights highlighted a clean counter and a wide selection of drinks.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene7" }
        ]
    },
    scene7: {
        text: "As I looked around, I noticed paintings on the wall — scenes that seemed worth staring at for a while.[pause1000]  I ignored them. All I wanted was a drink. Still, it was nice to be in a decent place.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene8" }
        ]
    },
    scene8: {
        text: "I sat at the counter and noticed a few others quietly drinking or [slow]lost in deep thought.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene9" }
        ]
    },
    scene9: {
        text: "As I tapped the table, the bartender — busy cleaning a glass — approached me.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene10" }
        ]
    },
    scene10: {
        text: "[colororange]Bartender: [resetcolor]What drink might you be interested in tonight, sir?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "I'd like to try your best seller", next: "scene12" },
            { label: "Its up to you, I'll let you decide my drink for tonight", next: "scene11" }
        ]
    },
    scene11: {
        text: "He nodded, began preparing it, then casually asked—",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene12" }
        ]
    },
    scene12: {
        text: "[colororange]Bartender: [resetcolor]Seems like it's been a while since your last drink, sir.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene13" }
        ]
    },
    scene13: {
        text: "[color#00008B]Antoine: [resetcolor]How did you know?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene14" }
        ]
    },
    scene14: {
        text: "[colororange]Bartender: [resetcolor]There's only one bar in town and I have a good memory of people who often come here.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene15" }
        ]
    },
    scene15: {
        text: "[color#00008B]Antoine: [resetcolor]I'm just here to change things up a bit in my life just for once.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene16" }
        ]
    },
    scene16: {
        text: "[colororange]Bartender: [resetcolor]Hmm…[pause1000] hoping to just to drown these thoughts of yours or just have fun.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "Exactly…", next: "scene17" },
            { label: "It is as you say", next: "scene17" }
        ]
    },
    scene17: {
        text: "[colororange]Bartender: [resetcolor]I'm afraid normal drink might not suffice[pause1000], but you have come to the right place.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene18" }
        ]
    },
    scene18: {
        text: "[color#00008B]Antoine: [resetcolor]…",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene19" }
        ]
    },
    scene19: {
        text: "[colororange]Bartender: [resetcolor]If you don't mind, I have the perfect drink for someone like you tonight — 'A Shot to the Past.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene20" }
        ]
    },
    scene20: {
        text: "[color#00008B]Antoine: [resetcolor]A shot to the past? Is that something that'll magically send me back?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene21" }
        ]
    },
    scene21: {
        text: "[colororange]Bartender: [resetcolor]Maybe.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene22" }
        ]
    },
    scene22: {
        text: "[color#00008B]Antoine: [resetcolor]Then I'd gladly tell myself a few things. So I wouldn't end up like this — miserable, stuck in the same place, still being bothered by the things meant to be left behind in the past, like a rope forcing me into this direction I didn't wish for myself. I can't even trust myself to escape this entanglement.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene23" }
        ]
    },
    scene23: {
        text: "[color#00008B]Antoine: [resetcolor]And those people saying, Just believe in yourself' or 'Pull harder until you break free'? Screw that. I already gave it my all. Is it because its not within their standard of sheer effort? I still feel stuck.[pause1000] ...What is this? I haven't even had a drink yet, and I'm already crashing out.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene24" }
        ]
    },
    scene24: {
        text: "[colororange]Bartender: [resetcolor]Here's your drink, sir. A Shot to the Past.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene25" }
        ]
    },
    scene25: {
        text: "[colorblue]Antoine: [resetcolor]Still can't get over that name.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene26" }
        ]
    },
    scene26: {
        text: "[colororange]Bartender: [resetcolor]Everyone says the same. But mind you — you can only drink this once in your lifetime. Once you do, there's no second chance.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "Even if I try to steal it forcefully?", next: "scene27" },
            { label: "Even if I memorize the content?", next: "scene27" }
        ]
    },
    scene27: {
        text: "[colororange]Bartender: [resetcolor]You can't. No matter what trick you think of. That's the rule. You can't drink it more than once or—",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene28" }
        ]
    },
    scene28: {
        text: "[color#00008B]Antoine: [resetcolor]There are consequences? Whatever. Just let me enjoy this 'once-in-a-lifetime drink,' I guess.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene29" }
        ]
    },
    scene29: {
        text: "[colororange]Bartender: [resetcolor]Its going to be a wild night sir.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene30" }
        ]
    },
    scene30: {
        text: "[color#00008B]Antoine: [resetcolor]Something to look forward to.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene32" }
        ]
    },
    scene32: {
        text: "As i drank the shot, i felt...[pause1000] nothing. Just a warm sensation trickling from my throat down to my stomach.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene33" }
        ]
    },
    scene33: {
        text: " Honestly, I thought it'd be bitter — but there was a strange sweetness, an aroma that reminded me of home—",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene34" }
        ]
    },
    scene34: {
        text: "What the— ughh. What is this feeling? I'm dizzy as hell.[pause1000] ...Huh? Is this our old house? Is that— me?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene35" }
        ]
    },
    scene35: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray](I never expected to actually time travel.)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene36" }
        ]
    },
    scene36: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray](Heh. The good old days.[pause1000] Sorry, kid. Your happiness won't last.)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene37" }
        ]
    },
    scene37: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]What are you talking about?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene38" }
        ]
    },
    scene38: {
        text: "[color#00008B]Antoine: [resetcolor]Huh? Can you hear me?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene39" }
        ]
    },
    scene39: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Yeah. I'm just busy doing stuff. Who are you?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "Wow. You're surprisingly calm at your age.", next: "scene40" },
            { label: "I'm you, but many years later into the future", next: "scene40" }
        ]
    },
    scene40: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Yea, you kinda look like me. So, time travel's a thing in the future?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene41" }
        ]
    },
    scene41: {
        text: "[color#00008B]Antoine: [resetcolor]You could say that. [colorgray](I didn't think a 'Shot to the Past' would literally send me back.)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene42" }
        ]
    },
    scene42: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Whoaaa~ That's cool.[pause1000]  Something to look forward to i guess.[pause500] So are you here to tell me my future?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene43" }
        ]
    },
    scene43: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray](Should I really say it to the boy the things I always wanted to say to him, to finally have a difference)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "Say it to him", next: "scene44z" },
            { label: "Don't say it to him", next: "scene44b" }
        ]
    },
    scene44z: {
        text: "[color#00008B]Antoine: [resetcolor]So... I guess I should tell you everything...",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene44a" }
        ]
    },
    scene44a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Huh..[pause1000] Your life is so miserable, mister. I don't wanna be you.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene45a" }
        ]
    },
    scene45a: {
        text: "[color#00008B]Antoine: [resetcolor]That's why I'm here.[pause1000] To help you.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene46a" }
        ]
    },
    scene46a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]But if I change now, you might disappear.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene47a" }
        ]
    },
    scene47a: {
        text: "[color#00008B]Antoine: [resetcolor]Why would you think that?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene48a" }
        ]
    },
    scene48a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Because everything that happened… turned me into you.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene49a" }
        ]
    },
    scene49a: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray](Is it worth it achieving my life this way now in exchange of...[pause1000] erasing myself?)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene50a" }
        ]
    },
    scene50a: {
        text: "[color#00008B]Antoine: [resetcolor]I DON'T CARE, AS LONG AS YOU PROMISE TO NEVER BE LIKE ME!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene51a" }
        ]
    },
    scene51a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Mister, why?!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene52a" }
        ]
    },
    scene52a: {
        text: "[color#00008B]Antoine: [resetcolor]There is not much hope left anyway for me, now I might have the chance to change it, to hope again.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene53a" }
        ]
    },
    scene53a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Mister, I'm sorry your life turned out to be this way but...",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "CAN YOU DO IT?!!", next: "scene54a" },
            { label: "Sorry for forcing you kid, just please hear my request.", next: "scene54a" }
        ]
    },
    scene54a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Mister...",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene55a" }
        ]
    },
    scene55a: {
        text: "As I watched him still fazed due to my sudden behavior and request, I suddenly heard a voice- a voice I hadn't heard in so long. Loud, calm, and familiar.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene56a" }
        ]
    },
    scene56a: {
        text: "[colorred]Mother: [resetcolor]Antoine!!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene57a" }
        ]
    },
    scene57a: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Ma!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene58a" }
        ]
    },
    scene58a: {
        text: "I couldn't run towards the door, afraid of her seeing me like this, how messed up I am. I don't act like myself. I didn't even catch a glimpse of her when it suddenly faded, I jolted awake",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene59a" }
        ]
    },
    scene59a: {
        text: "The empty cup sat in my hand. I glanced around — the counter, the drinks, the others still lost in thought... nothing changed...[pause1000] When the bartender, who had just returned from outside, saw me, he finally broke the silence",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene60a" }
        ]
    },
    scene60a: {
        text: "[colororange]Bartender: [resetcolor]Heh. It was really your first time drinking in a while. So... how was it?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "WHY?!! Nothing has changed at all.", next: "scene61a" },
            { label: "Are you joking me?", next: "scene61a" }
        ]
    },
    scene61a: {
        text: "[colororange]Bartender: [resetcolor]Sir, I just gave you a drink that you requested...",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene62a" }
        ]
    },
    scene62a: {
        text: "[color#00008B]Antoine: [resetcolor]WHY?! WHY DIDN'T IT CHANGE ANYTHING?! WHY?!!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene63a" }
        ]
    },
    scene63a: {
        text: "[colororange]Bartender: [resetcolor]...you can't change what was already written in the past, You can only change how you see it now.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene64a" }
        ]
    },
    scene64a: {
        text: "After few moments I finally calm down and sit down. I looked at the empty cup in my hand, then at the bartender.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene65a" }
        ]
    },
    scene65a: {
        text: "[colororange]Bartender: [resetcolor]Would you like to stay for another drink — something different — or head home?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene66a" }
        ]
    },
    scene66a: {
        text: "[color#00008B]Antoine: [resetcolor]I'll stay. I'll just get my head straight.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene67a" }
        ]
    },
    scene67b: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray]As my head gets clearer, my attention was caught by the painting from earlier.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene68" }
        ]
    },
    scene68a: {
        text: "[color#00008B]Antoine: [resetcolor]Deciding to get a drink is pointless after all. I'm sorry kid.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene1" }
        ]
    },
scene44b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Hmm, I guess you really can't tell me everything, mister.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene45b" }
        ]
    },
    scene45b: {
        text: "[color#00008B]Antoine: [resetcolor]How's the family?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene46b" }
        ]
    },
    scene46b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]I mean they're out right now, trying to prepare for my brothers going overseas",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene47b" }
        ]
    },
    scene47b: {
        text: "[color#00008B]Antoine: [resetcolor]They didn't even bother to let you go with them?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene48b" }
        ]
    },
    scene48b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]I insist not going with them, since I have school and I want to be home alone, besides I have this thing to do.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene49b" }
        ]
    },
    scene49b: {
        text: "[color#00008B]Antoine: [resetcolor]What is that project?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene50b" }
        ]
    },
    scene50b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Its just a painting project, it may be messy but there is something that I want out of it, yet I can't seem to get it",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene51b" }
        ]
    },
    scene51b: {
        text: "[color#00008B]Antoine: [resetcolor]Hmm! that's cool!!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene52b" }
        ]
    },
    scene52b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Yeah, but it's hard... [pause1000] I just can't seem to get it right.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene53b" }
        ]
    },
    scene53b: {
        text: "[color#00008B]Antoine: [resetcolor]You can do it kid. I trust you. [colorgray](Wow — “trust”[pause1000]  came out of my mouth?)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene54b" }
        ]
    },
    scene54b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Thanks, mister. I'll try my best.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene55b" }
        ]
    },
    scene55b: {
        text: "As I watched him draw and looked around our old room, I suddenly heard a voice—[pause1000]  a voice I hadn't heard in so long. Loud, calm, and familiar.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene56b" }
        ]
    },
    scene56b: {
        text: "[color#ededed]Mother: [resetcolor]Antoine!!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene57b" }
        ]
    },
    scene57b: {
        text: "[color#00FFFF]Kid Antoine: [resetcolor]Ma!",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene58b" }
        ]
    },
    scene58b: {
        text: "I couldn't run towards the door, afraid of her seeing me like this, how messed up I turned too be. But I want to see her, just for one moment. Then it suddenly faded, I jolted awake",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene59b" }
        ]
    },
    scene59b: {
        text: "The empty cup sat in my hand. I glanced around — the counter, the drinks, the others still lost in thought... nothing changed...[pause1000] When the bartender, who had just returned from outside, saw me, he finally broke the silence",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene60b" }
        ]
    },
    scene60b: {
        text: "[colororange]Bartender: [resetcolor]Heh. It was really your first time drinking in a while. So... how was it?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { label: "Your drink live up to its name.", next: "scene62c" },
            { label: "Can I ask? Is what I felt real? Did I really return to the past?", next: "scene61b" }
        ]
    },
    scene61b: {
        text: "[colororange]Bartender: [resetcolor]Yes sir, sorry if I forgot to mention, that you can't really change the past, but you can change how you see it now.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene62b" }
        ]
    },
    scene62b: {
        text: "[color#00008B]Antoine: [resetcolor]Well, it was a little disappointing. ",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene63b" }
        ]
    },
    scene62c: {
        text: "[color#00008B]Antoine: [resetcolor]...It really was a shot to the past. ",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene63b" }
        ]
    },
    scene63b: {
        text: "[colororange]Bartender: [resetcolor]Sorry to hear that, sir. How about another drink — maybe something different this time?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene64b" }
        ]
    },
    scene63c: {
        text: "[colororange]Bartender: [resetcolor]Glad you liked it, sir. Would you like to stay for another drink — something different — or head home?",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene64b" }
        ]
    },
    scene64b: {
        text: "[color#00008B]Antoine: [resetcolor]Sure, let me get a new one.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene65b" }
        ]
    },
    scene65b: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray]As my head gets clearer, my attention was caught by the painting from earlier.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene66" }
        ]
    },
    scene66b: {
        text: "[color#00008B]Antoine: [resetcolor][colorgray](What a night. All I wanted was a drink to drown my thoughts only to resurface what I left behind.)",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene67b" }
        ]
    },
    scene67b: {
        text: "[colororange]Bartender: [resetcolor]It seems that it's going to be a long night, sir.",
        slideshow: ["Image/Grab.png","Image/Lose.png"],
        buttons: [
            { image: "https://res.cloudinary.com/dzths7uts/image/upload/v1755795457/next_ryafkw.png", next: "scene1" }
        ]
    },
};

// Slideshow interval variable
let slideshowInterval;

// Function to change the scene based on the button clicked

function goTo(sceneId) {
    const scene = scenes[sceneId];
    const bgm = document.getElementById('bgm');
if (scene.music) {
    if (bgm.src !== scene.music) { // change only if different
        bgm.src = scene.music;
        bgm.play().catch(err => console.warn("Music play blocked:", err));
    }
}
    let colorStyle = scene.color ? ` style="color:${scene.color};"` : "";
    let html = `<p${colorStyle} id="typewriter"></p>`;
    scene.buttons.forEach(btn => {
    let content = "";
    
    if (btn.image && btn.label) {
        // Both image and text
        content = `<img src="${btn.image}" alt="${btn.label}" style="height:40px; vertical-align:middle; margin-right:5px;"> ${btn.label}`;
    } else if (btn.image) {
        // Image only
        content = `<img src="${btn.image}" alt="button" style="height:40px;">`;
        extraClass = "no-bg";
    } else {
        // Text only
        content = btn.label;
    }

    html += `<button class="choice button1" onclick="goTo('${btn.next}')">${content}</button>`;
});

    document.getElementById('dialogueBox').innerHTML = html;
    const typewriter = document.getElementById('typewriter');
    typeText(typewriter, scene.text, 40);

const deathMessage = document.getElementById('deathMessage');

// First, hide it immediately
deathMessage.classList.remove('show');
deathMessage.style.display = 'none';

// If it's a death scene, delay showing it
if (scene.color === 'red') {
    setTimeout(() => {
        deathMessage.style.display = 'block';
        // Trigger fade-in if using the CSS transition
        setTimeout(() => deathMessage.classList.add('show'), 50); // slight delay for transition
    }, 2000);
}


const winMessage = document.getElementById('winMessage');

// First, hide it immediately
winMessage.classList.remove('show');
winMessage.style.display = 'none';

// If it's a win scene, delay showing it
if (scene.color === 'green') {
    setTimeout(() => {
        winMessage.style.display = 'block';
        setTimeout(() => winMessage.classList.add('show'), 50); // slight delay for transition
    }, 4000); // 4000 milliseconds = 4 seconds
}

    const boxImg = document.getElementById('boxImage');
    // Stop any previous slideshow
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    // Slideshow logic
    if (scene.slideshow && Array.isArray(scene.slideshow)) {
    let idx = 0;
    let firstSlide = scene.slideshow[0];
    boxImg.src = firstSlide.src || firstSlide;
    boxImg.style.cssText = (firstSlide.style || "display:block; position:absolute; top:0; left:0; width:100%; height:100%;");
    boxImg.style.objectFit = firstSlide.fit || "cover";
    slideshowInterval = setInterval(() => {
        idx++;
        if (idx >= scene.slideshow.length) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
            return;
        }
        const slide = scene.slideshow[idx];
        boxImg.src = slide.src || slide;
        boxImg.style.cssText = (slide.style || "display:block; position:absolute; top:0; left:0; width:100%; height:100%;");
        boxImg.style.objectFit = slide.fit || "cover";
    }, 1000);
} else if (scene.image) {
    boxImg.src = scene.image;
    boxImg.style.display = 'block';
    boxImg.style.objectFit = scene.fit || "cover";
} else {
    boxImg.style.display = 'none';
}
}

let bgm = null;
let volumeSlider = null;

document.addEventListener('DOMContentLoaded', function() {
    bgm = document.getElementById('bgm');
    volumeSlider = document.getElementById('volumeSlider');

    if (bgm && volumeSlider) {
        // Set slider defaults if no saved setting
        let savedVolume = localStorage.getItem('gameVolume');
        if (savedVolume !== null) {
            volumeSlider.value = savedVolume;
        } else {
            volumeSlider.value = 0.3; // default starting volume
        }

        // Apply to BGM
        bgm.volume = parseFloat(volumeSlider.value);

        // Listen for slider changes
        volumeSlider.addEventListener('input', function() {
            let newVolume = parseFloat(volumeSlider.value);
            bgm.volume = newVolume;
            localStorage.setItem('gameVolume', newVolume); // save for reload
        });
    }
});

// Central function for playing music
function playBGM(file) {
    if (!bgm) bgm = document.getElementById('bgm');
    if (!volumeSlider) volumeSlider = document.getElementById('volumeSlider');

    if (bgm) {
        bgm.src = file;
        bgm.volume = parseFloat(volumeSlider ? volumeSlider.value : 0.3);
        bgm.play().catch(err => console.warn("BGM play failed:", err));
    }
}

// Function for sound effects that match slider volume
function playSoundEffect(name) {
    if (!volumeSlider) volumeSlider = document.getElementById('volumeSlider');
    let sfx = new Audio(`sound/${name}.mp3`);
    sfx.volume = parseFloat(volumeSlider ? volumeSlider.value : 0.3);
    sfx.play().catch(err => console.warn("SFX play failed:", err));
} 

function startGame() {
    const menu = document.getElementById('mainMenu');
    playBGM("sound/.mp3"); // Game background music
    menu.style.transition = 'opacity 1.5s';
    menu.style.opacity = 0;

    setTimeout(() => {
        menu.style.display = 'none';

        // Show game scene
        const gameScene = document.getElementById('gameScene');
        gameScene.style.display = 'block';
        gameScene.style.opacity = 0;
        gameScene.style.transition = 'opacity 1.5s';
        gameScene.style.opacity = 1;

        // Wait for player click before showing dialogue
        document.addEventListener('click', firstDialogue, { once: true });

    }, 1500); // Wait for menu fade out
}

function showSettings() {
    document.getElementById('settingsScreen').style.display = 'block';
    document.getElementById('creditsScreen').style.display = 'none';
    document.getElementById('volumeControl').style.display = 'block';
}

function hideSettings() {
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('volumeControl').style.display = 'none';
}

function showCredits() {
    document.getElementById('creditsScreen').style.display = 'block';
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('volumeControl').style.display = 'none';
}

function hideCredits() {
    document.getElementById('creditsScreen').style.display = 'none';
}

function toggleVolume() {
    let vol = document.getElementById('volumeControl');
    vol.style.display = (vol.style.display === 'block') ? 'none' : 'block';
}

// Example: connect volume slider to audio (if you have background music)
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('volumeSlider');
    const audio = document.getElementById('bgm');

    if (audio) audio.volume = slider.value; // Set initial volume from slider

    if (slider) {
        slider.addEventListener('input', function() {
            if (audio) audio.volume = slider.value;
        });
    }
});


// Initialize first scene
playBGM("sound/menu.mp3"); // Menu background music
goTo('scene1');
