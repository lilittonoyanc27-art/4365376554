import { SectionData, ExampleItem, TableRowItem } from './types.ts';

export const APP_HEADER = {
  titleEs: "Usos y construcciones con BIEN",
  titleHy: "BIEN բառի տարբեր կիրառություններն ու կառույցները",
  levelSubtitle: "Nivel B1–C1 | Իսպաներենի քերականություն և խոսակցական լեզու | Հայերեն բացատրությամբ, առանց վարժությունների",
  introParagraphs: [
    "Իսպաներենում bien բառը շատ ավելի լայն նշանակություն ունի, քան պարզապես «լավ» բառը։",
    "Այն կարող է նշանակել՝ լավ, ճիշտ, բավականին, շատ, հաջողությամբ, իսկ որոշ կառույցներում արտահայտում է համաձայնություն, հակադրություն, զարմանք կամ նույնիսկ պայման։"
  ],
  introExamples: [
    {
      id: "intro-1",
      spanish: "Estoy bien.",
      armenian: "Ես լավ եմ։",
      highlightWords: ["bien"]
    },
    {
      id: "intro-2",
      spanish: "Me parece bien.",
      armenian: "Ինձ հարմար է / համաձայն եմ։",
      highlightWords: ["bien"]
    },
    {
      id: "intro-3",
      spanish: "Está bien que descanses.",
      armenian: "Լավ է, որ հանգստանաս։",
      highlightWords: ["Está bien"]
    },
    {
      id: "intro-4",
      spanish: "Bien podría ser verdad.",
      armenian: "Միանգամայն հնարավոր է, որ դա ճիշտ լինի։",
      highlightWords: ["Bien podría"]
    }
  ],
  introConclusion: "Այս նախադասություններում bien-ը տարբեր դերեր ունի։"
};

export const SECTIONS: SectionData[] = [
  {
    id: 1,
    numberStr: "1",
    titleEs: "BIEN և BUENO",
    titleHy: "Հիմնական տարբերությունը",
    descriptionHy: [
      "Սա ամենակարևոր տարբերություններից մեկն է։",
      "Bien հիմնականում մակբայ է և նկարագրում է գործողությունը կամ վիճակը։",
      "Bueno / buena ածական է և նկարագրում է գոյականը։"
    ],
    table: {
      headers: ["Español", "Հայերեն"],
      rows: [
        { id: "s1-t1", spanish: "Hablas bien español.", armenian: "Դու լավ ես խոսում իսպաներեն։" },
        { id: "s1-t2", spanish: "Eres una buena profesora.", armenian: "Դու լավ ուսուցչուհի ես։" },
        { id: "s1-t3", spanish: "La comida está buena.", armenian: "Ուտելիքը համեղ է։" },
        { id: "s1-t4", spanish: "La comida está bien.", armenian: "Ուտելիքը նորմալ է / ամեն ինչ կարգին է։" },
        { id: "s1-t5", spanish: "El trabajo está bien hecho.", armenian: "Աշխատանքը լավ է կատարված։" },
        { id: "s1-t6", spanish: "Es un buen trabajo.", armenian: "Դա լավ աշխատանք է։" }
      ]
    },
    comparisons: [
      {
        title: "Համեմատություն",
        items: [
          { id: "s1-c1", spanish: "Él es bueno.", armenian: "Նա լավ մարդ է։" },
          { id: "s1-c2", spanish: "Él está bien.", armenian: "Նա իրեն լավ է զգում / նրա վիճակը լավ է։" },
          { id: "s1-c3", spanish: "Él trabaja bien.", armenian: "Նա լավ է աշխատում։" }
        ],
        notes: [
          "Այս երեք նախադասությունները տարբեր իմաստներ են արտահայտում։"
        ]
      }
    ]
  },
  {
    id: 2,
    numberStr: "2",
    titleEs: "ESTAR BIEN",
    titleHy: "Լավ լինել, լավ զգալ",
    formula: "Estar + bien",
    descriptionHy: [
      "Օգտագործվում է առողջության, տրամադրության, վիճակի կամ որևէ բանի ընդունելի լինելու մասին խոսելիս։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s2-e1", spanish: "1. Hoy estoy bastante bien.", armenian: "Այսօր ինձ բավականին լավ եմ զգում։" },
      { id: "s2-e2", spanish: "2. ¿Estás bien? Te noto un poco cansada.", armenian: "Լա՞վ ես։ Նկատում եմ, որ մի փոքր հոգնած ես։" },
      { id: "s2-e3", spanish: "3. No te preocupes, todo está bien.", armenian: "Մի՛ անհանգստացիր, ամեն ինչ կարգին է։" },
      { id: "s2-e4", spanish: "4. Este horario está bien para mí.", armenian: "Այս գրաֆիկն ինձ հարմար է։" },
      { id: "s2-e5", spanish: "5. La habitación está bien, pero es un poco pequeña.", armenian: "Սենյակը նորմալ է, բայց մի փոքր փոքր է։" }
    ],
    attentionNotes: [
      "Estoy bien — Ես լավ եմ։",
      "Soy bueno en matemáticas — Ես լավ եմ մաթեմատիկայից։",
      "Չենք ասում soy bien՝ «ես լավ եմ» իմաստով։"
    ]
  },
  {
    id: 3,
    numberStr: "3",
    titleEs: "HACER ALGO BIEN",
    titleHy: "Ինչ-որ բան լավ անել",
    formula: "Verbo + bien",
    descriptionHy: [
      "Այս կառույցում bien-ը ցույց է տալիս, թե ինչպես է կատարվում գործողությունը։"
    ],
    examples: [
      { id: "s3-e1", spanish: "1. Hablas muy bien español.", armenian: "Դու շատ լավ ես խոսում իսպաներեն։" },
      { id: "s3-e2", spanish: "2. María canta bien.", armenian: "Մարիան լավ է երգում։" },
      { id: "s3-e3", spanish: "3. Has explicado muy bien el problema.", armenian: "Դու շատ լավ ես բացատրել խնդիրը։" },
      { id: "s3-e4", spanish: "4. No dormí bien anoche.", armenian: "Անցած գիշեր լավ չքնեցի։" },
      { id: "s3-e5", spanish: "5. Todo salió bien al final.", armenian: "Ի վերջո ամեն ինչ լավ ավարտվեց։" }
    ],
    subsections: [
      {
        title: "Bien / Muy bien / Bastante bien",
        table: {
          headers: ["Español", "Հայերեն"],
          rows: [
            { id: "s3-sub-1", spanish: "Bien", armenian: "Լավ" },
            { id: "s3-sub-2", spanish: "Muy bien", armenian: "Շատ լավ" },
            { id: "s3-sub-3", spanish: "Bastante bien", armenian: "Բավականին լավ" },
            { id: "s3-sub-4", spanish: "Realmente bien", armenian: "Իսկապես լավ" },
            { id: "s3-sub-5", spanish: "Especialmente bien", armenian: "Հատկապես լավ" },
            { id: "s3-sub-6", spanish: "Demasiado bien", armenian: "Չափազանց լավ" },
            { id: "s3-sub-7", spanish: "No muy bien", armenian: "Ոչ այնքան լավ" }
          ]
        },
        examples: [
          { id: "s3-extra-1", spanish: "Me ha salido bastante bien el examen.", armenian: "Քննությունս բավականին լավ է ստացվել։" }
        ]
      }
    ]
  },
  {
    id: 4,
    numberStr: "4",
    titleEs: "ME PARECE BIEN",
    titleHy: "Ինձ հարմար է, համաձայն եմ",
    formula: "Parecerle bien algo a alguien",
    descriptionHy: [
      "Սա իսպանացիների ամենատարածված խոսակցական արտահայտություններից մեկն է։",
      "Օգտագործվում է առաջարկին, որոշմանը կամ ծրագրին համաձայնություն արտահայտելու համար։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s4-e1", spanish: "— ¿Quedamos mañana a las seis? — Sí, me parece bien.", armenian: "— Վաղը ժամը վեցին հանդիպե՞նք։ — Այո՛, ինձ հարմար է։" },
      { id: "s4-e2", spanish: "Me parece bien tu propuesta.", armenian: "Քո առաջարկն ինձ հարմար է։" },
      { id: "s4-e3", spanish: "No me parece bien que me hables así.", armenian: "Ինձ դուր չի գալիս, որ ինձ հետ այդպես ես խոսում / Ես ճիշտ չեմ համարում, որ ինձ հետ այդպես խոսես։" },
      { id: "s4-e4", spanish: "¿Te parece bien si empezamos un poco antes?", armenian: "Դեմ չե՞ս, եթե մի փոքր ավելի շուտ սկսենք։" }
    ],
    comparisons: [
      {
        title: "Me parece bien / Me parece bueno",
        notes: [
          "Me parece bien սովորաբար օգտագործվում է համաձայնություն կամ ընդունելիություն արտահայտելու համար։",
          "Me parece una buena idea նշանակում է՝ «Ինձ թվում է՝ դա լավ գաղափար է»։"
        ],
        items: [
          { id: "s4-c1", spanish: "¿Te parece bien este plan?", armenian: "Այս ծրագիրը քեզ հարմա՞ր է։" },
          { id: "s4-c2", spanish: "¿Te parece una buena idea?", armenian: "Քեզ լա՞վ գաղափար է թվում։" }
        ]
      }
    ]
  },
  {
    id: 5,
    numberStr: "5",
    titleEs: "ESTÁ BIEN QUE + SUBJUNTIVO",
    titleHy: "Լավ է, որ...",
    levelBadge: "B1–B2",
    formula: "Está bien que + Subjuntivo",
    descriptionHy: [
      "Սա հատկապես կարևոր է B1–B2 մակարդակում։",
      "Օգտագործվում է, երբ գնահատում ենք որևէ գործողություն կամ իրավիճակ։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s5-e1", spanish: "1. Está bien que descanses después de trabajar tanto.", armenian: "Լավ է, որ այդքան աշխատելուց հետո հանգստանաս։" },
      { id: "s5-e2", spanish: "2. Está bien que quieras aprender cosas nuevas.", armenian: "Լավ է, որ ցանկանում ես նոր բաներ սովորել։" },
      { id: "s5-e3", spanish: "3. No está bien que trates así a tus amigos.", armenian: "Լավ չէ, որ ընկերներիդ հետ այդպես վարվես։" },
      { id: "s5-e4", spanish: "4. Está bien que los niños hagan preguntas.", armenian: "Լավ է, որ երեխաները հարցեր տան։" },
      { id: "s5-e5", spanish: "5. Me parece bien que hayas tomado esa decisión.", armenian: "Ես ճիշտ եմ համարում, որ այդ որոշումը կայացրել ես։" }
    ],
    grammarNotes: [
      "Քերականություն. Երբ խոսողը գնահատում է ստորադաս նախադասությամբ արտահայտված գործողությունը, սովորաբար օգտագործվում է Subjuntivo։"
    ],
    comparisons: [
      {
        title: "Համեմատենք՝",
        items: [
          { id: "s5-c1", spanish: "Está bien descansar.", armenian: "Հանգստանալը լավ է։" },
          { id: "s5-c2", spanish: "Está bien que descanses.", armenian: "Լավ է, որ դու հանգստանաս։" }
        ],
        notes: [
          "Առաջին նախադասությունում օգտագործվում է infinitivo, երկրորդում՝ Subjuntivo։"
        ]
      }
    ]
  },
  {
    id: 6,
    numberStr: "6",
    titleEs: "MÁS BIEN",
    titleHy: "Ավելի շուտ, ավելի ճիշտ",
    descriptionHy: [
      "Más bien օգտագործվում է, երբ ուզում ենք ուղղել միտքը, մեղմացնել արտահայտությունը կամ ավելի ճշգրիտ նկարագրել իրավիճակը։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s6-e1", spanish: "1. No estoy enfadada, más bien estoy decepcionada.", armenian: "Ես բարկացած չեմ, ավելի շուտ հիասթափված եմ։" },
      { id: "s6-e2", spanish: "2. No es una obligación, más bien es una recomendación.", armenian: "Դա պարտականություն չէ, ավելի շուտ խորհուրդ է։" },
      { id: "s6-e3", spanish: "3. No estaba triste, sino más bien preocupada.", armenian: "Նա տխուր չէր, այլ ավելի շուտ անհանգիստ էր։" },
      { id: "s6-e4", spanish: "4. Es una película más bien romántica.", armenian: "Դա ավելի շուտ ռոմանտիկ ֆիլմ է։" },
      { id: "s6-e5", spanish: "5. El examen fue más bien difícil.", armenian: "Քննությունը բավականին դժվար էր։" }
    ],
    comparisons: [
      {
        title: "Կարևոր տարբերություն",
        items: [
          { id: "s6-c1", spanish: "Es mejor estudiar por la mañana.", armenian: "Ավելի լավ է առավոտյան սովորել։" },
          { id: "s6-c2", spanish: "Prefiero estudiar por la mañana, o más bien, a primera hora.", armenian: "Նախընտրում եմ առավոտյան սովորել, ավելի ճիշտ՝ վաղ առավոտյան։" }
        ],
        notes: [
          "Mejor-ը համեմատություն է արտահայտում, իսկ más bien-ը հաճախ ճշգրտում է միտքը։"
        ]
      }
    ]
  },
  {
    id: 7,
    numberStr: "7",
    titleEs: "BIEN + ADJETIVO",
    titleHy: "Շատ, բավականին",
    formula: "Bien + Adjetivo",
    descriptionHy: [
      "Խոսակցական իսպաներենում bien կարող է ուժեղացնել ածականի իմաստը։",
      "Այս կիրառությունը տարածված է հատկապես Լատինական Ամերիկայի տարբեր երկրներում, բայց հանդիպում է նաև Իսպանիայում։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s7-e1", spanish: "La casa es bien grande.", armenian: "Տունը շատ մեծ է։" },
      { id: "s7-e2", spanish: "El examen estuvo bien difícil.", armenian: "Քննությունը բավականին դժվար էր։" },
      { id: "s7-e3", spanish: "Este café está bien caliente.", armenian: "Այս սուրճը շատ տաք է։" },
      { id: "s7-e4", spanish: "Es una persona bien simpática.", armenian: "Նա շատ հաճելի մարդ է։" }
    ],
    comparisons: [
      {
        title: "Իսպանիայում շատ դեպքերում ավելի սովորական է ասել՝",
        items: [
          { id: "s7-c1", spanish: "La casa es muy grande.", armenian: "Տունը շատ մեծ է։" },
          { id: "s7-c2", spanish: "El examen fue bastante difícil.", armenian: "Քննությունը բավականին դժվար էր։" }
        ],
        notes: [
          "Այսպիսով՝ bien + adjetivo-ն միշտ չէ, որ բոլոր իսպանախոս երկրներում նույնքան բնական կամ տարածված է։"
        ]
      }
    ]
  },
  {
    id: 8,
    numberStr: "8",
    titleEs: "BIEN... BIEN...",
    titleHy: "Կա՛մ... կա՛մ...",
    levelBadge: "B2–C1",
    formula: "Bien... bien...",
    descriptionHy: [
      "Սա ավելի առաջադեմ կառույց է՝ B2–C1 մակարդակի համար։",
      "Օգտագործվում է երկու հնարավոր տարբերակ ներկայացնելու համար։ Ավելի հաճախ հանդիպում է պաշտոնական կամ գրավոր խոսքում։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s8-e1", spanish: "1. Podemos viajar, bien en tren, bien en autobús.", armenian: "Կարող ենք ճանապարհորդել կա՛մ գնացքով, կա՛մ ավտոբուսով։" },
      { id: "s8-e2", spanish: "2. La reunión será, bien el lunes, bien el martes.", armenian: "Հանդիպումը կլինի կա՛մ երկուշաբթի, կա՛մ երեքշաբթի։" },
      { id: "s8-e3", spanish: "3. Puedes presentar la solicitud, bien por internet, bien en persona.", armenian: "Կարող ես դիմումը ներկայացնել կա՛մ առցանց, կա՛մ անձամբ։" }
    ],
    notes: [
      "Առօրյա խոսքում իսպանացիները հաճախ օգտագործում են o... o...։"
    ],
    comparisons: [
      {
        title: "Առօրյա խոսքի տարբերակ",
        items: [
          { id: "s8-c1", spanish: "O vamos en tren o vamos en autobús.", armenian: "Կա՛մ գնացքով ենք գնում, կա՛մ ավտոբուսով։" }
        ]
      }
    ]
  },
  {
    id: 9,
    numberStr: "9",
    titleEs: "SI BIEN + INDICATIVO",
    titleHy: "Թեև, չնայած որ",
    formula: "Si bien + Indicativo",
    descriptionHy: [
      "Si bien նշանակում է «թեև» կամ «չնայած որ»։",
      "Այս կապակցությունը հաճախ օգտագործվում է գրավոր, պաշտոնական և վերլուծական խոսքում։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s9-e1", spanish: "1. Si bien el trabajo es difícil, resulta muy interesante.", armenian: "Թեև աշխատանքը դժվար է, այն շատ հետաքրքիր է։" },
      { id: "s9-e2", spanish: "2. Si bien entiendo tu opinión, no estoy completamente de acuerdo.", armenian: "Թեև հասկանում եմ քո կարծիքը, ամբողջովին համաձայն չեմ։" },
      { id: "s9-e3", spanish: "3. Si bien hemos avanzado mucho, todavía queda trabajo por hacer.", armenian: "Թեև մեծ առաջընթաց ենք գրանցել, դեռ աշխատանք կա անելու։" },
      { id: "s9-e4", spanish: "4. Si bien la ciudad es pequeña, ofrece muchas oportunidades.", armenian: "Թեև քաղաքը փոքր է, այն բազմաթիվ հնարավորություններ է առաջարկում։" }
    ],
    comparisons: [
      {
        title: "Si bien և aunque",
        items: [
          { id: "s9-c1", spanish: "Aunque es caro, lo compraré.", armenian: "Թեև թանկ է, կգնեմ։" },
          { id: "s9-c2", spanish: "Si bien es caro, tiene una calidad excelente.", armenian: "Թեև թանկ է, գերազանց որակ ունի։" }
        ],
        notes: [
          "Si bien-ը սովորաբար օգտագործվում է որպես հաստատված փաստի ընդունում, որից հետո ներկայացվում է հակադիր միտք։ Այդ պատճառով այն հիմնականում գործածվում է Indicativo-ի հետ։"
        ]
      }
    ]
  },
  {
    id: 10,
    numberStr: "10",
    titleEs: "BIEN QUE + INDICATIVO",
    titleHy: "Լավ էլ..., հաստատ...",
    formula: "Bien que + Indicativo",
    descriptionHy: [
      "Այս արտահայտությունն ունի խոսակցական, երբեմն հեգնական կամ հակաճառական երանգ։",
      "Այն ընդգծում է, որ մարդն իրականում ինչ-որ բան արել է կամ գիտի, թեև կարող է հակառակը պնդել։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s10-e1", spanish: "Bien que lo sabías.", armenian: "Լավ էլ գիտեիր։" },
      { id: "s10-e2", spanish: "Bien que te gustó la película.", armenian: "Ֆիլմը քեզ լավ էլ դուր եկավ։" },
      { id: "s10-e3", spanish: "Bien que viniste cuando necesitabas ayuda.", armenian: "Երբ օգնության կարիք ունեիր, լավ էլ եկար։" }
    ],
    notes: [
      "Այս կառույցը հատկապես օգտակար է կենդանի երկխոսությունները և սերիալների խոսակցական լեզուն հասկանալու համար։"
    ]
  },
  {
    id: 11,
    numberStr: "11",
    titleEs: "BIEN PODRÍA + INFINITIVO",
    titleHy: "Միանգամայն կարող էր",
    formula: "Bien + poder (Condicional) + infinitivo",
    descriptionHy: [
      "Այս կառույցը կարող է արտահայտել հավանականություն, հնարավոր տարբերակ կամ մեղմ առաջարկ։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s11-e1", spanish: "1. Bien podría ser verdad.", armenian: "Միանգամայն հնարավոր է, որ դա ճիշտ լինի։" },
      { id: "s11-e2", spanish: "2. Podríamos ir mañana, aunque bien podríamos esperar hasta el sábado.", armenian: "Կարող էինք գնալ վաղը, բայց կարող էինք նաև սպասել մինչև շաբաթ։" },
      { id: "s11-e3", spanish: "3. Bien podrías avisarme antes de venir.", armenian: "Կարող էիր գոնե նախապես զգուշացնել ինձ գալուց առաջ։" },
      { id: "s11-e4", spanish: "4. Eso bien podría explicar su comportamiento.", armenian: "Դա միանգամայն կարող էր բացատրել նրա վարքագիծը։" }
    ],
    notes: [
      "Վերջին երկու օրինակներում bien-ն ընդգծում է խոսողի վերաբերմունքը։ Կախված ինտոնացիայից՝ արտահայտությունը կարող է լինել չեզոք կամ թեթև նախատինք։"
    ]
  },
  {
    id: 12,
    numberStr: "12",
    titleEs: "HACER BIEN EN + INFINITIVO",
    titleHy: "Ճիշտ վարվել՝ ինչ-որ բան անելով",
    formula: "Hacer bien en + infinitivo",
    descriptionHy: [
      "Այս կառույցն օգտագործվում է, երբ գնահատում ենք մարդու գործողությունը որպես ճիշտ կամ խելամիտ։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s12-e1", spanish: "1. Hiciste bien en decir la verdad.", armenian: "Ճիշտ վարվեցիր՝ ճշմարտությունն ասելով։" },
      { id: "s12-e2", spanish: "2. Has hecho bien en pedir ayuda.", armenian: "Ճիշտ ես արել, որ օգնություն ես խնդրել։" },
      { id: "s12-e3", spanish: "3. Haría bien en descansar un poco.", armenian: "Նա ճիշտ կվարվեր, եթե մի փոքր հանգստանար։" },
      { id: "s12-e4", spanish: "4. Creo que hicimos bien en esperar.", armenian: "Կարծում եմ՝ ճիշտ արեցինք, որ սպասեցինք։" }
    ],
    comparisons: [
      {
        title: "Տարբերությունը",
        items: [
          { id: "s12-c1", spanish: "Lo hiciste bien.", armenian: "Դու դա լավ կատարեցիր։" },
          { id: "s12-c2", spanish: "Hiciste bien en hacerlo.", armenian: "Դու ճիշտ վարվեցիր՝ դա անելով։" }
        ],
        notes: [
          "Առաջին նախադասությունը գնահատում է գործողության կատարման որակը, իսկ երկրորդը՝ որոշման ճիշտ լինելը։"
        ]
      }
    ]
  },
  {
    id: 13,
    numberStr: "13",
    titleEs: "IR BIEN / SALIR BIEN / QUEDAR BIEN",
    titleHy: "Տարբեր իմաստներ",
    descriptionHy: [
      "Այս երեք կառույցները շատ հաճախ են հանդիպում առօրյա իսպաներենում։"
    ],
    table: {
      headers: ["Construcción", "Հայերեն"],
      rows: [
        { id: "s13-t1", spanish: "Ir bien", armenian: "Գործերը լավ ընթանալ" },
        { id: "s13-t2", spanish: "Salir bien", armenian: "Լավ ստացվել" },
        { id: "s13-t3", spanish: "Quedar bien", armenian: "Լավ տեսք ունենալ, լավ տպավորություն թողնել կամ լավ ստացվել" }
      ]
    },
    subsections: [
      {
        title: "IR BIEN",
        examples: [
          { id: "s13-sub1-e1", spanish: "¿Qué tal te va en el trabajo?", armenian: "Ինչպե՞ս են աշխատանքային գործերդ։" },
          { id: "s13-sub1-e2", spanish: "Me va bastante bien.", armenian: "Գործերս բավականին լավ են։" },
          { id: "s13-sub1-e3", spanish: "Todo va bien por ahora.", armenian: "Առայժմ ամեն ինչ լավ է ընթանում։" }
        ]
      },
      {
        title: "SALIR BIEN",
        examples: [
          { id: "s13-sub2-e1", spanish: "La entrevista salió muy bien.", armenian: "Հարցազրույցը շատ լավ անցավ։" },
          { id: "s13-sub2-e2", spanish: "Espero que todo salga bien.", armenian: "Հուսով եմ՝ ամեն ինչ լավ կստացվի։" }
        ]
      },
      {
        title: "QUEDAR BIEN",
        examples: [
          { id: "s13-sub3-e1", spanish: "Esta chaqueta te queda muy bien.", armenian: "Այս բաճկոնը քեզ շատ է սազում։" },
          { id: "s13-sub3-e2", spanish: "El pastel me quedó muy bien.", armenian: "Տորթս շատ լավ ստացվեց։" },
          { id: "s13-sub3-e3", spanish: "Quiero quedar bien con mis compañeros.", armenian: "Ուզում եմ լավ տպավորություն թողնել գործընկերներիս վրա։" }
        ]
      }
    ],
    notes: [
      "Կարևոր է. Quedar bien con alguien երբեմն կարող է նշանակել պարզապես լավ տպավորություն թողնել, իսկ որոշ համատեքստերում՝ ուրիշների հավանությունը շահելու համար հաճոյանալ։"
    ]
  },
  {
    id: 14,
    numberStr: "14",
    titleEs: "LLEVARSE BIEN CON",
    titleHy: "Լավ հարաբերություններ ունենալ",
    formula: "Llevarse bien con alguien",
    descriptionHy: [
      "Llevarse bien con alguien նշանակում է ինչ-որ մեկի հետ լավ հարաբերություններ ունենալ։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s14-e1", spanish: "Me llevo muy bien con mis compañeros.", armenian: "Ես շատ լավ հարաբերություններ ունեմ գործընկերներիս հետ։" },
      { id: "s14-e2", spanish: "¿Te llevas bien con tus vecinos?", armenian: "Լա՞վ հարաբերություններ ունես հարևաններիդ հետ։" },
      { id: "s14-e3", spanish: "Antes no nos llevábamos bien, pero ahora somos amigos.", armenian: "Նախկինում լավ հարաբերություններ չունեինք, բայց հիմա ընկերներ ենք։" },
      { id: "s14-e4", spanish: "No se lleva bien con su jefe.", armenian: "Նա լավ հարաբերություններ չունի իր ղեկավարի հետ։" }
    ],
    comparisons: [
      {
        title: "Մի՛ շփոթիր՝",
        items: [
          { id: "s14-c1", spanish: "Me va bien en el trabajo.", armenian: "Աշխատանքում գործերս լավ են։" },
          { id: "s14-c2", spanish: "Me llevo bien con mis compañeros.", armenian: "Գործընկերներիս հետ լավ հարաբերություններ ունեմ։" }
        ]
      }
    ]
  },
  {
    id: 15,
    numberStr: "15",
    titleEs: "VENIR BIEN",
    titleHy: "Հարմար լինել",
    formula: "Venirle bien algo a alguien",
    descriptionHy: [
      "Իսպանիայում այս կառույցը շատ տարածված է ժամադրություն կամ հանդիպում պայմանավորվելիս։"
    ],
    examplesTitle: "Ejemplos",
    examples: [
      { id: "s15-e1", spanish: "¿Te viene bien mañana?", armenian: "Վաղը քեզ հարմա՞ր է։" },
      { id: "s15-e2", spanish: "Me viene mejor el viernes.", armenian: "Ինձ ուրբաթն ավելի հարմար է։" },
      { id: "s15-e3", spanish: "A las cinco no me viene bien.", armenian: "Ժամը հինգն ինձ հարմար չէ։" },
      { id: "s15-e4", spanish: "Nos vendría bien un poco de ayuda.", armenian: "Մեզ մի փոքր օգնությունը շատ օգտակար կլիներ։" }
    ],
    comparisons: [
      {
        title: "Venir bien և parecer bien",
        items: [
          { id: "s15-c1", spanish: "¿Te viene bien el lunes?", armenian: "Երկուշաբթին քեզ հարմա՞ր է։" },
          { id: "s15-c2", spanish: "¿Te parece bien quedar el lunes?", armenian: "Համաձա՞յն ես երկուշաբթի հանդիպել։" }
        ],
        notes: [
          "Առաջինը հիմնականում վերաբերում է հարմարությանը, երկրորդը՝ առաջարկի ընդունելիությանը։"
        ]
      }
    ]
  },
  {
    id: 16,
    numberStr: "16",
    titleEs: "Expresiones coloquiales con BIEN",
    titleHy: "Ընդունված խոսակցական արտահայտություններ BIEN բառով",
    descriptionHy: [
      "Այս արտահայտությունները ամենօրյա խոսքում մշտապես կիրառվում են իսպանացիների կողմից։ Սեղմեք ցանկացած իսպաներեն արտահայտության վրա՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։"
    ],
    table: {
      headers: ["Español", "Հայերեն"],
      rows: [
        { id: "s16-1", spanish: "¡Muy bien!", armenian: "Շատ լավ։" },
        { id: "s16-2", spanish: "¡Qué bien!", armenian: "Ի՜նչ լավ է։" },
        { id: "s16-3", spanish: "Está bien.", armenian: "Լավ է / համաձայն եմ։" },
        { id: "s16-4", spanish: "Todo bien.", armenian: "Ամեն ինչ կարգին է։" },
        { id: "s16-5", spanish: "Hasta ahí, bien.", armenian: "Մինչև այդ ամեն ինչ պարզ է / կարգին է։" },
        { id: "s16-6", spanish: "Más bien.", armenian: "Ավելի շուտ / ավելի ճիշտ։" },
        { id: "s16-7", spanish: "Me parece bien.", armenian: "Ինձ հարմար է / համաձայն եմ։" },
        { id: "s16-8", spanish: "Me viene bien.", armenian: "Ինձ հարմար է։" },
        { id: "s16-9", spanish: "Me da buena espina.", armenian: "Լավ նախազգացում ունեմ։" },
        { id: "s16-10", spanish: "Está bien visto.", armenian: "Լավ է ընդունվում հասարակության մեջ։" },
        { id: "s16-11", spanish: "No está bien visto.", armenian: "Լավ չի ընդունվում հասարակության մեջ։" },
        { id: "s16-12", spanish: "Bien pensado.", armenian: "Լավ մտածված է։" },
        { id: "s16-13", spanish: "Bien dicho.", armenian: "Լավ ասված է։" },
        { id: "s16-14", spanish: "Bien hecho.", armenian: "Ապրե՛ս / լավ է արված։" },
        { id: "s16-15", spanish: "Que te vaya bien.", armenian: "Թող գործերդ լավ ընթանան։" },
        { id: "s16-16", spanish: "Que lo pases bien.", armenian: "Լավ ժամանակ անցկացրո՛ւ։" },
        { id: "s16-17", spanish: "Pasarlo bien.", armenian: "Լավ ժամանակ անցկացնել։" },
        { id: "s16-18", spanish: "Menos mal que todo salió bien.", armenian: "Լավ է, որ ամեն ինչ բարեհաջող ավարտվեց։" }
      ]
    }
  },
  {
    id: 17,
    numberStr: "17",
    titleEs: "Diálogo — Quedar con una amiga",
    titleHy: "Երկխոսություն — Հանդիպում ընկերուհու հետ",
    dialogue: {
      title: "Diálogo — Quedar con una amiga",
      context: "Contexto: Լաուրան և Պատրիսիան ցանկանում են հանդիպել։",
      lines: [
        {
          id: "d-1",
          speaker: "Laura",
          spanish: "¡Hola, Patricia! ¿Qué tal estás?",
          armenian: "Բարև՛, Պատրիսիա։ Ինչպե՞ս ես։"
        },
        {
          id: "d-2",
          speaker: "Patricia",
          spanish: "Muy bien, gracias. ¿Y tú?",
          armenian: "Շատ լավ, շնորհակալություն։ Իսկ դո՞ւ։"
        },
        {
          id: "d-3",
          speaker: "Laura",
          spanish: "Bien, aunque últimamente tengo mucho trabajo.",
          armenian: "Լավ եմ, թեև վերջին շրջանում շատ աշխատանք ունեմ։"
        },
        {
          id: "d-4",
          speaker: "Patricia",
          spanish: "Te entiendo. Oye, ¿te viene bien quedar el viernes?",
          armenian: "Հասկանում եմ քեզ։ Լսի՛ր, ուրբաթ հանդիպելը քեզ հարմա՞ր է։"
        },
        {
          id: "d-5",
          speaker: "Laura",
          spanish: "El viernes me viene bastante bien. ¿A qué hora?",
          armenian: "Ուրբաթն ինձ բավականին հարմար է։ Ժամը քանիսի՞ն։"
        },
        {
          id: "d-6",
          speaker: "Patricia",
          spanish: "¿Te parece bien a las seis?",
          armenian: "Ժամը վեցը քեզ հարմա՞ր է։"
        },
        {
          id: "d-7",
          speaker: "Laura",
          spanish: "Sí, me parece perfecto.",
          armenian: "Այո՛, ինձ լիովին հարմար է։"
        },
        {
          id: "d-8",
          speaker: "Patricia",
          spanish: "¡Qué bien! Podemos ir a una cafetería nueva.",
          armenian: "Ի՜նչ լավ է։ Կարող ենք նոր սրճարան գնալ։"
        },
        {
          id: "d-9",
          speaker: "Laura",
          spanish: "Buena idea. Además, nos vendría bien desconectar un poco del trabajo.",
          armenian: "Լավ գաղափար է։ Բացի այդ, մեզ օգտակար կլինի մի փոքր կտրվել աշխատանքից։"
        },
        {
          id: "d-10",
          speaker: "Patricia",
          spanish: "Exactamente. ¡Seguro que lo pasamos bien!",
          armenian: "Ճիշտ այդպես։ Վստահ եմ՝ լավ ժամանակ կանցկացնենք։"
        },
        {
          id: "d-11",
          speaker: "Laura",
          spanish: "¡Genial! Entonces, nos vemos el viernes. Que te vaya bien.",
          armenian: "Հիանալի՛։ Ուրեմն կհանդիպենք ուրբաթ։ Թող գործերդ լավ ընթանան։"
        }
      ]
    }
  },
  {
    id: 18,
    numberStr: "18",
    titleEs: "Lectura — Una decisión bien tomada",
    titleHy: "Ընթերցանություն — Լավ կայացված որոշում",
    levelBadge: "Nivel B2",
    reading: {
      title: "Una decisión bien tomada",
      level: "Nivel B2",
      paragraphs: [
        {
          id: "p1",
          spanish: "Claudia llevaba varios meses pensando en cambiar de trabajo. Aunque se llevaba bien con sus compañeros, sentía que necesitaba nuevos retos.",
          armenian: "Կլաուդիան արդեն մի քանի ամիս մտածում էր աշխատանքը փոխելու մասին։ Թեև լավ հարաբերություններ ուներ գործընկերների հետ, զգում էր, որ նոր մարտահրավերների կարիք ունի։"
        },
        {
          id: "p2",
          spanish: "Un día recibió una oferta de una empresa internacional.",
          armenian: "Մի օր նա աշխատանքի առաջարկ ստացավ միջազգային ընկերությունից։"
        },
        {
          id: "p3",
          spanish: "Al principio no sabía qué hacer. Por una parte, su trabajo actual le iba bastante bien. Por otra, la nueva oportunidad podía ayudarla a crecer profesionalmente.",
          armenian: "Սկզբում չգիտեր՝ ինչ անել։ Մի կողմից՝ ներկայիս աշխատանքում գործերը բավականին լավ էին ընթանում։ Մյուս կողմից՝ նոր հնարավորությունը կարող էր օգնել նրան մասնագիտական աճ ունենալ։"
        },
        {
          id: "p4",
          spanish: "Decidió hablar con su mejor amiga.",
          armenian: "Նա որոշեց խոսել իր լավագույն ընկերուհու հետ։"
        },
        {
          id: "p5",
          spanish: "—Creo que harías bien en aceptar la oferta —le dijo su amiga—. Si bien el cambio puede resultar difícil al principio, también puede abrirte muchas puertas.",
          armenian: "— Կարծում եմ՝ ճիշտ կվարվես, եթե ընդունես առաջարկը, — ասաց ընկերուհին։ — Թեև փոփոխությունը սկզբում կարող է դժվար լինել, այն կարող է նաև բազմաթիվ նոր հնարավորություններ բացել քո առջև։"
        },
        {
          id: "p6",
          spanish: "Claudia reflexionó durante varios días y acabó por aceptar.",
          armenian: "Կլաուդիան մի քանի օր մտածեց և ի վերջո ընդունեց առաջարկը։"
        },
        {
          id: "p7",
          spanish: "La entrevista final salió muy bien y sus nuevos compañeros la recibieron con entusiasmo.",
          armenian: "Վերջնական հարցազրույցը շատ լավ անցավ, իսկ նոր գործընկերները նրան ջերմորեն ընդունեցին։"
        },
        {
          id: "p8",
          spanish: "Unos meses después, se dio cuenta de que había tomado una buena decisión.",
          armenian: "Մի քանի ամիս անց նա հասկացավ, որ ճիշտ որոշում էր կայացրել։"
        },
        {
          id: "p9",
          spanish: "Su experiencia le enseñó que no siempre es fácil cambiar, pero que, cuando una oportunidad nos viene bien y responde a nuestros objetivos, merece la pena considerarla.",
          armenian: "Այդ փորձառությունը նրան սովորեցրեց, որ փոխվելը միշտ չէ, որ հեշտ է, բայց երբ որևէ հնարավորություն մեզ հարմար է և համապատասխանում է մեր նպատակներին, արժե այն դիտարկել։"
        }
      ]
    }
  },
  {
    id: 19,
    numberStr: "19",
    titleEs: "Resumen",
    titleHy: "Ամփոփում",
    descriptionHy: [
      "BIEN բառի բոլոր հիմնական կառույցների համակարգված ամփոփիչ աղյուսակը։"
    ],
    table: {
      headers: ["Construcción", "Հայերեն"],
      rows: [
        { id: "s19-1", spanish: "Estar bien", armenian: "Լավ լինել" },
        { id: "s19-2", spanish: "Hacer algo bien", armenian: "Ինչ-որ բան լավ անել" },
        { id: "s19-3", spanish: "Me parece bien", armenian: "Համաձայն եմ / ինձ հարմար է" },
        { id: "s19-4", spanish: "Está bien que + Subjuntivo", armenian: "Լավ է, որ..." },
        { id: "s19-5", spanish: "Más bien", armenian: "Ավելի շուտ, ավելի ճիշտ" },
        { id: "s19-6", spanish: "Bien + adjetivo", armenian: "Շատ, բավականին (տարածաշրջանային/խոսակցական)" },
        { id: "s19-7", spanish: "Bien... bien...", armenian: "Կա՛մ... կա՛մ..." },
        { id: "s19-8", spanish: "Si bien + Indicativo", armenian: "Թեև, չնայած որ" },
        { id: "s19-9", spanish: "Bien que + Indicativo", armenian: "Լավ էլ..." },
        { id: "s19-10", spanish: "Bien podría + infinitivo", armenian: "Միանգամայն կարող էր..." },
        { id: "s19-11", spanish: "Hacer bien en + infinitivo", armenian: "Ճիշտ վարվել՝ ինչ-որ բան անելով" },
        { id: "s19-12", spanish: "Ir bien", armenian: "Լավ ընթանալ" },
        { id: "s19-13", spanish: "Salir bien", armenian: "Լավ ստացվել" },
        { id: "s19-14", spanish: "Quedar bien", armenian: "Լավ ստացվել, սազել, լավ տպավորություն թողնել" },
        { id: "s19-15", spanish: "Llevarse bien con", armenian: "Լավ հարաբերություններ ունենալ" },
        { id: "s19-16", spanish: "Venir bien", armenian: "Հարմար լինել" }
      ]
    },
    notes: [
      "Գլխավոր միտքը. Bien բառը չի նշանակում միայն «լավ»։ Այն կարող է արտահայտել գործողության որակ, համաձայնություն, հարմարություն, գնահատական, հակադրություն և ուժեղացում։ Այս կառույցների ճիշտ օգտագործումը հատկապես օգտակար է իսպանացիների հետ բնական և սահուն խոսելու համար։"
    ]
  }
];
