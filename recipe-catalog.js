window.extraRecipes = (() => {
    const dishes = [
        ["hu", "Gulyásleves", "meat"], ["hu", "Jókai bableves", "meat"], ["hu", "Hortobágyi palacsinta", "meat"], ["hu", "Töltött káposzta", "meat"],
        ["hu", "Marhapörkölt", "meat"], ["hu", "Sertéspörkölt", "meat"], ["hu", "Borjúpaprikás", "meat"], ["hu", "Bakonyi sertésszelet", "meat"],
        ["hu", "Brassói aprópecsenye", "meat"], ["hu", "Lecsós szelet", "meat"], ["hu", "Rakott krumpli", "meat"], ["hu", "Húsos rakott káposzta", "meat"],
        ["hu", "Töltött paprika", "meat"], ["hu", "Húsleves csigatésztával", "meat"], ["hu", "Csontos karaj fokhagymásan", "meat"], ["hu", "Fasírt petrezselymes burgonyával", "meat"],
        ["hu", "Vadas marha zsemlegombóccal", "meat"], ["hu", "Szegedi halászlé", "meat"], ["hu", "Harcsapaprikás túrós csuszával", "meat"], ["hu", "Rántott csirkemell", "meat"],
        ["hu", "Kacsacomb párolt káposztával", "meat"], ["hu", "Pulykaragu leves", "meat"], ["hu", "Csirkés rizses hús", "meat"], ["hu", "Tepsis csirkecomb", "meat"],
        ["hu", "Szalontüdő zsemlegombóccal", "meat"], ["hu", "Disznótoros sült kolbásszal", "meat"], ["hu", "Hagymás rostélyos", "meat"], ["hu", "Sertésszűzérmék gombamártással", "meat"],
        ["hu", "Krumplis tészta", "veggie"], ["hu", "Túrós csusza", "veggie"], ["hu", "Juhtúrós sztrapacska", "veggie"], ["hu", "Gombapaprikás galuskával", "veggie"],
        ["hu", "Tojásos nokedli fejes salátával", "veggie"], ["hu", "Zöldborsófőzelék tükörtojással", "veggie"], ["hu", "Lencsefőzelék", "veggie"], ["hu", "Sárgaborsó-főzelék", "veggie"],
        ["hu", "Tökfőzelék kaporral", "veggie"], ["hu", "Paradicsomos káposzta", "veggie"], ["hu", "Káposztás tészta", "veggie"], ["hu", "Dödölle tejföllel", "veggie"],
        ["hu", "Gombás rizottó magyarosan", "veggie"], ["hu", "Sajtos-tejfölös lángos", "veggie"], ["hu", "Káposztás cvekedli", "veggie"], ["hu", "Zöldséges lecsó tojással", "veggie"],
        ["hu", "Mákos guba", "veggie"], ["hu", "Túrógombóc tejföllel", "veggie"], ["hu", "Szilvás gombóc", "veggie"], ["hu", "Rántott sajt tartárral", "veggie"],
        ["it", "Lasagne alla bolognese", "meat"], ["it", "Carbonara spagetti", "meat"], ["it", "Penne all'arrabbiata kolbásszal", "meat"], ["it", "Olasz húsgombóc paradicsomszószban", "meat"],
        ["it", "Csirkés pesto tészta", "meat"], ["it", "Ossobuco sáfrányos rizottóval", "meat"], ["it", "Saltimbocca alla romana", "meat"], ["it", "Csirke piccata", "meat"],
        ["it", "Sült sertésszűz olaszosan", "meat"], ["it", "Salsiccia fehérbabbal", "meat"], ["it", "Tonhalas puttanesca", "meat"], ["it", "Tengeri herkentyűs linguine", "meat"],
        ["it", "Pollo alla cacciatora", "meat"], ["it", "Sült bárány rozmaringgal", "meat"], ["it", "Prosciuttós tortellini", "meat"], ["it", "Baconös gnocchi", "meat"],
        ["it", "Ragu alla napoletana", "meat"], ["it", "Sült lazac citromos gremolatával", "meat"], ["it", "Csirkés parmigiana", "meat"], ["it", "Olasz kolbászos rizottó", "meat"],
        ["it", "Pancettás borsóleves", "meat"], ["it", "Pulykás cannelloni", "meat"], ["it", "Sonkás torta salata", "meat"], ["it", "Spenótos-ricottás ravioli vajjal", "veggie"],
        ["it", "Risotto alla milanese", "veggie"], ["it", "Pasta alla norma", "veggie"], ["it", "Caponata siciliana", "veggie"], ["it", "Parmigiana di melanzane", "veggie"],
        ["it", "Gnocchi alla sorrentina", "veggie"], ["it", "Cacio e pepe", "veggie"], ["it", "Pesto genovese tésztával", "veggie"], ["it", "Gombás tagliatelle", "veggie"],
        ["it", "Ribollita toszkán leves", "veggie"], ["it", "Minestrone leves", "veggie"], ["it", "Panzanella saláta", "veggie"], ["it", "Parmigiano risotto spárgával", "veggie"],
        ["it", "Töltött portobello olasz módra", "veggie"], ["it", "Sült paprika burratával", "veggie"], ["it", "Töltött cukkini ricottával", "veggie"], ["it", "Polenta gombaraguval", "veggie"],
        ["it", "Focaccia rozmaringgal", "veggie"], ["it", "Piadina grillezett zöldségekkel", "veggie"], ["it", "Caprese gnocchi", "veggie"], ["it", "Toszkán fehérbab-leves", "veggie"],
        ["it", "Sült karfiol parmezánnal", "veggie"], ["it", "Citromos ricottás ravioli", "veggie"], ["it", "Olasz paradicsomos orzo", "veggie"], ["it", "Bruschetta háromféle feltéttel", "veggie"],
        ["mx", "Marhahúsos taco", "meat"], ["mx", "Carnitas taco", "meat"], ["mx", "Barbacoa burrito", "meat"], ["mx", "Enchiladas verdes csirkével", "meat"],
        ["mx", "Chili con carne", "meat"], ["mx", "Mole poblano csirkével", "meat"], ["mx", "Tinga de pollo tostada", "meat"], ["mx", "Fajitas marhahússal", "meat"],
        ["mx", "Al pastor sertéstaco", "meat"], ["mx", "Chorizós quesadilla", "meat"], ["mx", "Baja fish taco", "meat"], ["mx", "Camarones al ajillo taco", "meat"],
        ["mx", "Tamales csirkével", "meat"], ["mx", "Pozole rojo sertéshússal", "meat"], ["mx", "Sopa de tortilla", "meat"], ["mx", "Sertéses chile verde", "meat"],
        ["mx", "Birria marhahúsból", "meat"], ["mx", "Chicharrónos taco", "meat"], ["mx", "Csirkés burrito tál", "meat"], ["mx", "Mexikói húsgombócleves", "meat"],
        ["mx", "Sertéses tamales rojos", "meat"], ["mx", "Picadillo marhahússal", "meat"], ["mx", "Pollo a la crema", "meat"], ["mx", "Cochinita pibil", "meat"],
        ["mx", "Queso fundido chorizóval", "meat"], ["mx", "Tacos dorados csirkével", "meat"], ["mx", "Mexikói garnélás rizs", "meat"], ["mx", "Sertéses enchilada roja", "meat"],
        ["mx", "Elote grillezett csirkével", "meat"], ["mx", "Mexikói marharagu", "meat"], ["mx", "Tostada tenger gyümölcseivel", "meat"], ["mx", "Sertéses chile colorado", "meat"],
        ["mx", "Fekete babos enchilada", "veggie"], ["mx", "Vegetáriánus burrito", "veggie"], ["mx", "Chiles rellenos sajttal", "veggie"], ["mx", "Sajtos enchiladas suizas", "veggie"],
        ["mx", "Nopales saláta", "veggie"], ["mx", "Vegetáriánus fajitas", "veggie"], ["mx", "Quesadilla gombával", "veggie"], ["mx", "Sütőtökös tamales", "veggie"],
        ["mx", "Frijoles refritos rizzsel", "veggie"], ["mx", "Mexikói kukoricaleves", "veggie"], ["mx", "Avokádós tostada", "veggie"], ["mx", "Poblano paprikás rizs", "veggie"],
        ["mx", "Sajtos chile relleno", "veggie"], ["mx", "Mexikói sült karfiol taco", "veggie"], ["mx", "Esquites kukoricasaláta", "veggie"], ["mx", "Babos quesadilla", "veggie"],
        ["mx", "Sütőben sült nachos babbal", "veggie"],
        ["asia", "Japchae marhahússal", "meat"], ["asia", "Bibimbap marhahússal", "meat"], ["asia", "Bulgogi tál", "meat"], ["asia", "Koreai dakgalbi", "meat"],
        ["asia", "Japán csirke teriyaki", "meat"], ["asia", "Tonkatsu japán káposztasalátával", "meat"], ["asia", "Ramen sertéschar siuval", "meat"], ["asia", "Katsu curry csirkével", "meat"],
        ["asia", "Kínai kung pao csirke", "meat"], ["asia", "Édes-savanyú sertés", "meat"], ["asia", "Mapo tofu darált hússal", "meat"], ["asia", "Kínai marhahús brokkolival", "meat"],
        ["asia", "Pekingi kacsa palacsintával", "meat"], ["asia", "Szecsuáni sertéscsíkok", "meat"], ["asia", "Sült rizs garnélával", "meat"], ["asia", "Vietnámi pho bo", "meat"],
        ["asia", "Bún chả grillezett sertéssel", "meat"], ["asia", "Vietnámi karamellás csirke", "meat"], ["asia", "Thai zöld curry csirkével", "meat"], ["asia", "Pad thai garnélával", "meat"],
        ["asia", "Massaman marhacurry", "meat"], ["asia", "Thai bazsalikomos sertés", "meat"], ["asia", "Maláj satay csirke", "meat"], ["asia", "Indonéz nasi goreng csirkével", "meat"],
        ["asia", "Indiai butter chicken", "meat"], ["asia", "Csirke tikka masala", "meat"], ["asia", "Lamb rogan josh", "meat"], ["asia", "Tandoori csirke", "meat"],
        ["asia", "Samosa hústöltelékkel", "meat"], ["asia", "Sült lazac miso mázzal", "meat"], ["asia", "Japán gyoza sertéssel", "meat"], ["asia", "Koreai mandu darált hússal", "meat"],
        ["asia", "Kínai wonton leves", "meat"], ["asia", "Szezámos marha tésztával", "meat"], ["asia", "Thai vörös curry kacsával", "meat"], ["asia", "Szingapúri laktésztás rák", "meat"],
        ["asia", "Lecsós japán omurice", "meat"], ["asia", "Sertéskatsu szendvics", "meat"], ["asia", "Koreai sült csirkeszárny", "meat"], ["asia", "Mongol marha rizzsel", "meat"],
        ["asia", "Sült padlizsán misóval", "veggie"], ["asia", "Zöldséges japán ramen", "veggie"], ["asia", "Vegetáriánus bibimbap", "veggie"], ["asia", "Tofu teriyaki rizzsel", "veggie"],
        ["asia", "Zöldséges pad thai", "veggie"], ["asia", "Thai vörös curry tofuval", "veggie"], ["asia", "Kókusztejes zöldséges curry", "veggie"], ["asia", "Palak paneer", "veggie"],
        ["asia", "Chana masala", "veggie"], ["asia", "Dal tadka basmati rizzsel", "veggie"]
    ];

    const ingredientSets = {
        hu: {
            meat: [["Hús", 150, "g"], ["Hagyma", 0.5, "db"], ["Krumpli", 150, "g"], ["Tejföl", 30, "g"], ["Pirospaprika", 1, "tk"]],
            veggie: [["Zöldség", 150, "g"], ["Hagyma", 0.5, "db"], ["Tejföl", 30, "g"], ["Liszt", 30, "g"], ["Tojás", 0.5, "db"]]
        },
        it: {
            meat: [["Hús", 140, "g"], ["Tészta", 100, "g"], ["Paradicsom", 100, "g"], ["Sajt", 25, "g"], ["Olívaolaj", 10, "ml"]],
            veggie: [["Zöldség", 150, "g"], ["Tészta", 100, "g"], ["Paradicsom", 100, "g"], ["Sajt", 30, "g"], ["Olívaolaj", 10, "ml"]]
        },
        mx: {
            meat: [["Hús", 140, "g"], ["Tortilla", 2, "db"], ["Bab", 50, "g"], ["Paradicsom", 60, "g"], ["Sajt", 25, "g"]],
            veggie: [["Zöldség", 120, "g"], ["Tortilla", 2, "db"], ["Bab", 70, "g"], ["Kukorica", 50, "g"], ["Sajt", 25, "g"]]
        },
        asia: {
            meat: [["Hús", 140, "g"], ["Rizs", 100, "g"], ["Zöldség", 100, "g"], ["Szójaszósz", 15, "ml"], ["Gyömbér", 5, "g"]],
            veggie: [["Tofu", 120, "g"], ["Rizs", 100, "g"], ["Zöldség", 120, "g"], ["Szójaszósz", 15, "ml"], ["Gyömbér", 5, "g"]]
        }
    };
    const cuisineSteps = {
        hu: ["<strong>Előkészítés:</strong> Készítsd ki az összes hozzávalót, a zöldségeket mosd meg, és vágd őket hasonló méretű darabokra, hogy egyenletesen készüljenek el.", "<strong>Alap készítése:</strong> A hagymát kevés zsiradékon, közepes lángon párold üvegesre. Add hozzá a fűszereket és a fő hozzávalókat, majd keverd át.", "<strong>Főzés:</strong> Öntsd fel annyi vízzel vagy alaplével, amennyi szükséges, és közepes lángon főzd puhára. Ha hab képződik, szedd le egy kanállal.", "<strong>Sűrítés:</strong> A tejfölt, habarást vagy mártást kevés forró lével keverd simára, csak ezután add az ételhez. Így nem lesz csomós és nem csapódik ki.", "<strong>Befejezés:</strong> Kóstold meg, állítsd be a sót és a fűszerezést, majd pihentesd 5 percig. A hozzá illő körettel, frissen tálald."],
        it: ["<strong>Előkészítés:</strong> Készíts ki mindent, a zöldségeket vágd egyforma darabokra, a húst pedig töröld szárazra, így szebben pirul.", "<strong>Pirítás:</strong> Melegíts olívaolajat közepes vagy erős lángon. Add hozzá a fokhagymát és a fő hozzávalókat, majd pirítsd illatosra, de a fokhagymát ne égesd meg.", "<strong>A szósz:</strong> Öntsd hozzá a paradicsomot vagy alaplevet, keverd át, majd közepes lángon főzd össze, amíg sűrű és illatos lesz.", "<strong>Köret:</strong> Közben főzd meg a tésztát sós vízben, vagy készítsd elő a rizst a csomagolás szerint. A tésztából tegyél félre kevés főzővizet.", "<strong>Tálalás:</strong> Keverd össze a köretet a szósszal, szükség esetén lazítsd a félretett főzővízzel, majd szórd meg sajttal és friss zöldfűszerrel."],
        mx: ["<strong>Előkészítés:</strong> A húst vagy zöldségeket vágd egyforma csíkokra, a fűszereket, paradicsomot, babot és kukoricát készítsd a tűzhely mellé.", "<strong>Pirítás:</strong> Forró serpenyőben, kevés olajon pirítsd meg a fő hozzávalókat a fűszerekkel. Ne zsúfold tele a serpenyőt, különben párolódni fognak pirulás helyett.", "<strong>Összefőzés:</strong> Add hozzá a paradicsomot, a babot vagy a kukoricát, majd közepes lángon párold össze 10-15 perc alatt.", "<strong>Köret:</strong> Közben melegítsd át a tortillát száraz serpenyőben, vagy készítsd el a rizst. A tortilla akkor jó, ha hajlítható, de nem pirul túl keményre.", "<strong>Tálalás:</strong> Kóstold meg, igazítsd a sót és a csípősséget, majd sajttal, friss zöldségekkel és lime-mal tálald."],
        asia: ["<strong>Előkészítés:</strong> A hozzávalókat vágd fel és rendezd sorba, mert wokban vagy forró serpenyőben gyorsan követik egymást a lépések.", "<strong>Köret:</strong> A rizst vagy tésztát készítsd elő a csomagolás szerint. A főtt rizs legyen pergős, a tészta pedig ne főjön teljesen puhára.", "<strong>Pirítás:</strong> Forró serpenyőben pirítsd meg a fő hozzávalókat kevés olajon. A húst addig süsd, amíg teljesen átsül, de ne szárítsd ki.", "<strong>Ízesítés:</strong> Add hozzá a zöldségeket, a gyömbért és a szójaszószt vagy currypasztát, majd 3-5 perc alatt párold roppanósra.", "<strong>Befejezés:</strong> Kóstold meg, szükség esetén igazítsd a sós, édes és csípős ízeket, majd rizzsel vagy tésztával azonnal tálald." ]
    };
    const cuisineCost = { hu: 340, it: 510, mx: 470, asia: 490 };
    const cuisineTime = { hu: 45, it: 35, mx: 30, asia: 35 };
    const freeRecipeLimits = { hu: 4, it: 4, mx: 4, asia: 5 };
    const freeRecipeCounts = {};

    return dishes.map(([cuisine, name, type], index) => {
        freeRecipeCounts[cuisine] = (freeRecipeCounts[cuisine] || 0) + 1;
        return {
        id: index + 6,
        name,
        cuisine,
        type,
        access: freeRecipeCounts[cuisine] <= freeRecipeLimits[cuisine] ? "free" : "pro",
        time: cuisineTime[cuisine] + (index % 4) * 5,
        baseCost: cuisineCost[cuisine] + (index % 7) * 35,
        rating: Number((4.3 + (index % 7) * 0.1).toFixed(1)),
        ratingsCount: 35 + (index * 17) % 180,
        ingredients: ingredientSets[cuisine][type].map(([ingredient, amount, unit]) => ({
            name: ingredient === "Hús" && /hal|lazac|tonhal|garnél|tenger|rák/i.test(name) ? "Hal" : ingredient,
            amount,
            unit
        })),
        steps: cuisineSteps[cuisine]
    };
    });
})();