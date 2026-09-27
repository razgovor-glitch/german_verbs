import type { GrammarTopic } from '../types'

/**
 * Грамматика A1 — от простого к сложному.
 * Каждая тема: объяснение → таблица → примеры → ловушки для русскоязычных.
 */
export const grammarTopics: GrammarTopic[] = [
  {
    id: 'artikel-genus',
    title: 'Artikel & Genus',
    titleRu: 'Артикль и род существительных',
    level: 'A1',
    summary: 'У каждого немецкого существительного есть род: der, die или das. Род нужно учить вместе со словом — он не совпадает с русским.',
    sections: [
      {
        heading: 'Определённый и неопределённый артикль',
        body: [
          '**der / die / das** — определённый артикль («этот, известный»). **ein / eine / ein** — неопределённый («какой-то, один»).',
          'Все существительные в немецком пишутся **с большой буквы** — это не стилистика, а правило.',
        ],
        table: {
          caption: 'Артикли в Nominativ',
          head: ['Род', 'Определённый', 'Неопределённый', 'Пример'],
          rows: [
            ['мужской', 'der', 'ein', 'der Tisch → ein Tisch'],
            ['женский', 'die', 'eine', 'die Lampe → eine Lampe'],
            ['средний', 'das', 'ein', 'das Buch → ein Buch'],
            ['мн. число', 'die', '— (нет)', 'die Bücher'],
          ],
        },
        examples: [
          { de: 'Das ist ein Buch. Das Buch ist interessant.', ru: 'Это книга. (Эта) книга интересная.' },
          { de: 'Ich habe eine Frage.', ru: 'У меня есть вопрос.' },
        ],
      },
      {
        heading: 'Как угадать род по суффиксу',
        body: ['Род невозможно вывести логически, но суффиксы дают надёжные подсказки — выучите их, и половина слов перестанет быть загадкой.'],
        table: {
          caption: 'Суффиксы-подсказки',
          head: ['Род', 'Суффиксы', 'Примеры'],
          rows: [
            ['der (мужской)', '-er (профессии/лица), -ling, -ismus, -or, -ant, -ent', 'der Lehrer, der Frühling, der Motor, der Student'],
            ['die (женский)', '-ung, -heit, -keit, -schaft, -tion, -tät, -ie, -in (женщины)', 'die Zeitung, die Freiheit, die Nation, die Universität, die Lehrerin'],
            ['das (средний)', '-chen, -lein, -ment, -um, -nis, инфинитивы', 'das Mädchen, das Fräulein, das Dokument, das Museum, das Essen'],
          ],
        },
      },
      {
        heading: 'Род не совпадает с русским',
        body: ['Это главный источник ошибок. Сравните: русское «книга» — женский род, немецкое das Buch — средний.'],
        table: {
          caption: 'Ложные друзья рода',
          head: ['Немецкое слово', 'Род в немецком', 'Род в русском'],
          rows: [
            ['das Buch (книга)', 'средний', 'женский'],
            ['der Tisch (стол)', 'мужской', 'мужской ✓'],
            ['die Wohnung (квартира)', 'женский', 'женский ✓'],
            ['das Wasser (вода)', 'средний', 'женский'],
            ['das Mädchen (девочка)', 'средний', 'женский'],
            ['die Sonne (солнце)', 'женский', 'средний'],
            ['der Mond (луна)', 'мужской', 'женский'],
            ['das Fenster (окно)', 'средний', 'средний ✓'],
          ],
        },
      },
    ],
    pitfalls: [
      'Учить слово без артикля — значит учить его наполовину. Всегда запоминайте «der Tisch», а не «Tisch».',
      'das Mädchen — средний род, хотя означает девочку. Так работают все слова на -chen.',
      'Артикль обязателен там, где в русском его нет: «Я студент» → Ich bin **ein** Student (или без артикля для профессии: Ich bin Student).',
    ],
    tips: [
      'Учите артикль вместе с цветом: der = синий, die = красный, das = зелёный. Мозг запоминает цвет быстрее, чем абстрактный род.',
      'Заучите мнемонику: **der** — сильный (der Mann), **die** — красивая (die Frau), **das** — маленькое (das Kind).',
    ],
    drills: ['article', 'de-ru-choice'],
  },

  {
    id: 'plural',
    title: 'Pluralbildung',
    titleRu: 'Образование множественного числа',
    level: 'A1',
    summary: 'В немецком пять способов образовать множественное число. Универсального окончания нет, но шаблоны предсказуемы.',
    sections: [
      {
        heading: 'Пять моделей множественного числа',
        table: {
          head: ['Тип', 'Окончание', 'Пример'],
          rows: [
            ['1. -e', '-e (часто с умлаутом)', 'der Tisch → die Tische; der Stuhl → die Stühle'],
            ['2. -en / -n', '-en / -n', 'die Frau → die Frauen; die Lampe → die Lampen'],
            ['3. -er', '-er (часто с умлаутом)', 'das Kind → die Kinder; das Buch → die Bücher'],
            ['4. -s', '-s (заимствования)', 'das Auto → die Autos; das Café → die Cafés'],
            ['5. без окончания', '— (иногда умлаут)', 'der Lehrer → die Lehrer; der Apfel → die Äpfel'],
          ],
        },
      },
      {
        heading: 'Надёжные ориентиры',
        body: ['Можно запомнить закономерности по роду и суффиксу:'],
        table: {
          head: ['Если слово…', 'То во множественном…', 'Пример'],
          rows: [
            ['женского рода', 'почти всегда -en / -n', 'die Zeitung → die Zeitungen'],
            ['на -er, -el, -en', 'без окончания', 'der Lehrer → die Lehrer, der Garten → die Gärten'],
            ['на -chen, -lein', 'без окончания', 'das Mädchen → die Mädchen'],
            ['на -nis', '-se', 'das Ergebnis → die Ergebnisse'],
            ['иностранное на -um, -ion', '-en', 'das Museum → die Museen'],
          ],
        },
      },
      {
        heading: 'Слова, у которых множественного числа нет',
        body: ['Как и в русском, есть слова только в единственном числе.'],
        examples: [
          { de: 'das Geld, das Obst, das Gemüse, die Milch, die Musik, das Wetter', ru: 'деньги, фрукты, овощи, молоко, музыка, погода' },
          { de: 'die Eltern, die Geschwister, die Leute', ru: 'только множественное число: родители, братья/сёстры, люди' },
        ],
      },
    ],
    pitfalls: [
      'Не существует одного правила «добавь -s». Немецкое множественное число нужно учить вместе со словом.',
      'Умлаут (a→ä, o→ö, u→ü) часто сопровождает -e и -er: der Apfel → die Äpfel, das Haus → die Häuser.',
      'die Eltern уже множественное число — нельзя сказать «eine Eltern».',
    ],
    tips: ['Записывайте слова сразу в трёх формах: **das Kind — die Kinder** или **der Apfel — die Äpfel**.'],
    drills: ['plural', 'typing-de'],
  },

  {
    id: 'pronomen',
    title: 'Personalpronomen',
    titleRu: 'Личные местоимения',
    level: 'A1',
    summary: 'Местоимения меняются по падежам. Три падежа нужно знать с самого начала: Nominativ, Akkusativ, Dativ.',
    sections: [
      {
        heading: 'Все формы',
        table: {
          head: ['Nominativ (кто?)', 'Akkusativ (кого?)', 'Dativ (кому?)', 'Перевод'],
          rows: [
            ['ich', 'mich', 'mir', 'я / меня / мне'],
            ['du', 'dich', 'dir', 'ты / тебя / тебе'],
            ['er', 'ihn', 'ihm', 'он / его / ему'],
            ['sie', 'sie', 'ihr', 'она / её / ей'],
            ['es', 'es', 'ihm', 'оно / его / ему'],
            ['wir', 'uns', 'uns', 'мы / нас / нам'],
            ['ihr', 'euch', 'euch', 'вы (мн.) / вас / вам'],
            ['sie', 'sie', 'ihnen', 'они / их / им'],
            ['Sie', 'Sie', 'Ihnen', 'Вы (вежл.) / Вас / Вам'],
          ],
        },
      },
      {
        heading: 'Вежливая форма Sie',
        body: [
          'Вежливое «Вы» — это **Sie** всегда с большой буквы, даже в середине предложения. Форма совпадает с 3-м лицом множественного числа: глагол получает окончание -en.',
          'При обращении на «Вы» недопустимо использовать du — это воспринимается как фамильярность.',
        ],
        examples: [
          { de: 'Wie heißen Sie?', ru: 'Как Вас зовут?' },
          { de: 'Können Sie mir helfen?', ru: 'Можете Вы мне помочь?' },
          { de: 'Ich helfe Ihnen gern.', ru: 'Я охотно Вам помогу.' },
        ],
      },
      {
        heading: 'du или Sie?',
        table: {
          head: ['Ситуация', 'Форма'],
          rows: [
            ['друзья, семья, коллеги-ровесники', 'du'],
            ['дети и подростки (до ~16 лет)', 'du'],
            ['незнакомые взрослые, начальство, чиновники', 'Sie'],
            ['магазин, банк, госучреждение, врач', 'Sie'],
          ],
        },
      },
    ],
    pitfalls: [
      'Русское «вы» может быть и вежливым, и множественным. В немецком это два разных слова: **Sie** (вежливое) и **ihr** (вы — несколько человек).',
      'Прямое «ты» незнакомцу — грубость. В Германии переход на du требует предложения: «Wollen wir du sagen?»',
    ],
    drills: ['conjugation', 'ru-de-choice'],
  },

  {
    id: 'praesens-regelmaessig',
    title: 'Präsens: regelmäßige Verben',
    titleRu: 'Настоящее время: правильные глаголы',
    level: 'A1',
    summary: 'Правильные глаголы спрягаются по одной схеме: основа + личное окончание. Это фундамент всей системы.',
    sections: [
      {
        heading: 'Схема окончаний',
        body: ['Возьмём **lernen** («учить»). Основа — **lern-** (отбрасываем -en), прибавляем окончания.'],
        table: {
          caption: 'lernen — учить',
          head: ['Лицо', 'Основа + окончание', 'Форма', 'Перевод'],
          rows: [
            ['ich', 'lern + e', 'lerne', 'я учу'],
            ['du', 'lern + st', 'lernst', 'ты учишь'],
            ['er/sie/es', 'lern + t', 'lernt', 'он/она/оно учит'],
            ['wir', 'lern + en', 'lernen', 'мы учим'],
            ['ihr', 'lern + t', 'lernt', 'вы (мн.) учите'],
            ['sie/Sie', 'lern + en', 'lernen', 'они учат / Вы учите'],
          ],
        },
      },
      {
        heading: 'Вставочное -e-',
        body: [
          'Если основа заканчивается на **-t**, **-d** или на согласную + **-m/-n** (кроме l, r, m, n), между основой и окончанием появляется **-e-** в формах du, er, ihr.',
          'Это нужно, чтобы немцу было удобно произносить: «du arbeitest», а не «du arbeitst».',
        ],
        table: {
          head: ['Инфинитив', 'du', 'er/sie/es', 'ihr'],
          rows: [
            ['arbeiten (работать)', 'arbeitest', 'arbeitet', 'arbeitet'],
            ['warten (ждать)', 'wartest', 'wartet', 'wartet'],
            ['finden (находить)', 'findest', 'findet', 'findet'],
            ['öffnen (открывать)', 'öffnest', 'öffnet', 'öffnet'],
          ],
        },
      },
      {
        heading: 'Основа на -s / -ß / -z',
        body: ['У глаголов с основой на шипящий или свистящий звук du-форма теряет -s и совпадает с 3-м лицом.'],
        table: {
          head: ['Инфинитив', 'du', 'er/sie/es'],
          rows: [
            ['heißen (зваться)', 'heißt', 'heißt'],
            ['sitzen (сидеть)', 'sitzt', 'sitzt'],
            ['tanzen (танцевать)', 'tanzt', 'tanzt'],
          ],
        },
      },
    ],
    pitfalls: [
      'В русском «я читаю» и «ты читаешь» различаются только окончанием — в немецком то же, но окончания другие: -e и -st. Не переносите русские привычки.',
      'Форма ihr = er/sie/es по окончанию (-t), но контекст различает их.',
      'В немецком НЕТ категории вида: «я читаю» и «я почитаю» — одно и то же **ich lese**.',
    ],
    tips: ['Правило трёх вопросов к глаголу: правильный он или сильный? не меняется ли гласная? не отделяется ли приставка?'],
    drills: ['conjugation', 'typing-de'],
  },

  {
    id: 'praesens-unregelmaessig',
    title: 'Präsens: unregelmäßige Verben',
    titleRu: 'Настоящее время: сильные глаголы',
    level: 'A1',
    summary: 'У сильных глаголов меняется корневая гласная в формах du и er/sie/es. Это важно выучить наизусть — таких глаголов много и они частотны.',
    sections: [
      {
        heading: 'Три типа смены гласной',
        table: {
          head: ['Тип', 'Смена', 'Инфинитив', 'du', 'er/sie/es'],
          rows: [
            ['a → ä', 'умлаут', 'fahren', 'fährst', 'fährt'],
            ['a → ä', 'умлаут', 'schlafen', 'schläfst', 'schläft'],
            ['o → ö', 'умлаут', 'stoßen', 'stößt', 'stößt'],
            ['e → i', 'краткая', 'sprechen', 'sprichst', 'spricht'],
            ['e → i', 'краткая', 'nehmen', 'nimmst', 'nimmt'],
            ['e → ie', 'долгая', 'sehen', 'siehst', 'sieht'],
            ['e → ie', 'долгая', 'lesen', 'liest', 'liest'],
            ['au → äu', 'умлаут', 'laufen', 'läufst', 'läuft'],
          ],
        },
        body: ['Обратите внимание: меняются **только** формы du и er/sie/es. Формы ich, wir, ihr, sie остаются на основе инфинитива.'],
      },
      {
        heading: 'Самые важные исключения',
        table: {
          head: ['Глагол', 'ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
          rows: [
            ['sein (быть)', 'bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
            ['haben (иметь)', 'habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
            ['werden (становиться)', 'werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
            ['wissen (знать)', 'weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
          ],
        },
      },
      {
        heading: 'Смешанные глаголы',
        body: ['Меняют гласную И получают -te в претерите: **bringen — brachte — gebracht**, **denken — dachte — gedacht**, **kennen — kannte — gekannt**.'],
        examples: [
          { de: 'Ich bringe dir das Buch.', ru: 'Я принесу тебе книгу.' },
          { de: 'Ich brachte ihm das Buch.', ru: 'Я принёс ему книгу.' },
        ],
      },
    ],
    pitfalls: [
      'Не путайте: у глаголов на -eln/-ern (sammeln, ändern) в 1-м лице остаётся -e: ich sammle / ich sammele.',
      'Смена гласной НЕ происходит в формах wir и sie: wir fahren (не «fähren»).',
    ],
    tips: ['Учите глагол сразу в трёх колонках: инфинитив — 3-е лицо — претерит. Тогда смена гласной запомнится автоматически.'],
    drills: ['conjugation', 'de-ru-choice'],
  },

  {
    id: 'modalverben',
    title: 'Modalverben',
    titleRu: 'Модальные глаголы',
    level: 'A1',
    summary: 'Шесть модальных глаголов меняют смысл всего предложения и строят «рамочную конструкцию»: модальный на втором месте, инфинитив — в конце.',
    sections: [
      {
        heading: 'Формы модальных глаголов',
        table: {
          head: ['', 'können (мочь)', 'müssen (должен)', 'wollen (хотеть)', 'sollen (следует)', 'dürfen (можно)', 'mögen (любить)'],
          rows: [
            ['ich', 'kann', 'muss', 'will', 'soll', 'darf', 'mag'],
            ['du', 'kannst', 'musst', 'willst', 'sollst', 'darfst', 'magst'],
            ['er/sie/es', 'kann', 'muss', 'will', 'soll', 'darf', 'mag'],
            ['wir', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'],
            ['ihr', 'könnt', 'müsst', 'wollt', 'sollt', 'dürft', 'mögt'],
            ['sie/Sie', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'],
          ],
        },
        body: [
          'Заметьте: в **ich** и **er/sie/es** нет окончания -t. Формы совпадают.',
          'В претерите модальные получают умлаут-снятие и -te: konnte, musste, wollte, sollte, durfte, mochte.',
        ],
      },
      {
        heading: 'Satzklammer — рамочная конструкция',
        body: [
          'Модальный глагол стоит на **втором месте**, смысловой инфинитив уходит в **самый конец** предложения. Между ними — «рамка», в которую помещается всё остальное.',
        ],
        examples: [
          { de: 'Ich **kann** heute nicht **kommen**.', ru: 'Я не могу сегодня прийти.' },
          { de: 'Wir **müssen** morgen früh **aufstehen**.', ru: 'Нам нужно завтра рано встать.' },
          { de: '**Darf** ich Sie etwas **fragen**?', ru: 'Можно Вас кое-что спросить?' },
        ],
      },
      {
        heading: 'Отрицание: müssen vs dürfen',
        body: ['Это классическая ловушка. Русское «не должен» переводится по-разному в зависимости от смысла.'],
        table: {
          head: ['Немецкая фраза', 'Значение', 'Русский перевод'],
          rows: [
            ['Du musst das nicht machen.', 'нет необходимости', 'Тебе не обязательно это делать.'],
            ['Du darfst das nicht machen.', 'запрет', 'Тебе нельзя это делать.'],
            ['Du kannst das nicht machen.', 'нет возможности/умения', 'Ты не можешь это сделать.'],
            ['Du sollst das nicht machen.', 'не рекомендуется', 'Тебе не следует это делать.'],
          ],
        },
      },
    ],
    pitfalls: [
      'nicht müssen ≠ nicht dürfen! Первое — «необязательно», второе — «запрещено».',
      'После модального глагола НЕТ частицы zu: Ich kann kommen (не «Ich kann zu kommen»).',
      'У модальных глаголов нет императива — вместо Kannst du…? используется вопрос.',
      'möchten — это не инфинитив, а вежливая форма от mögen. Именно её используют в магазине и кафе.',
    ],
    tips: ['Запомните рамку как «модальный глагол — тележка, инфинитив — багаж в конце поезда».'],
    drills: ['conjugation', 'sentence-order', 'ru-de-choice'],
  },

  {
    id: 'wortstellung',
    title: 'Wortstellung',
    titleRu: 'Порядок слов в предложении',
    level: 'A1',
    summary: 'Главное правило немецкого предложения: спрягаемый глагол всегда стоит на втором месте. Всё остальное может двигаться.',
    sections: [
      {
        heading: 'Правило второго места (Verb-zweit)',
        body: [
          'На первом месте может стоять подлежащее, обстоятельство времени, места или даже дополнение — но **глагол всегда второй**.',
          'Если на первое место встаёт не подлежащее, подлежащее переезжает на третье место — это называется **инверсия**.',
        ],
        table: {
          head: ['Позиция 1', 'Позиция 2 (глагол)', 'Позиция 3+', 'Перевод'],
          rows: [
            ['Ich', 'fahre', 'morgen nach Berlin.', 'Я завтра еду в Берлин.'],
            ['Morgen', 'fahre', 'ich nach Berlin.', 'Завтра я еду в Берлин.'],
            ['Nach Berlin', 'fahre', 'ich morgen.', 'В Берлин я еду завтра.'],
            ['Meine Schwester', 'arbeitet', 'in Frankfurt.', 'Моя сестра работает во Франкфурте.'],
          ],
        },
      },
      {
        heading: 'Инверсия — не ошибка, а норма',
        body: ['Русскоязычные часто ставят подлежащее сразу после обстоятельства, потому что так в русском: «Завтра я еду». В немецком глагол обязан остаться вторым.'],
        examples: [
          { de: 'Heute **habe** ich keine Zeit.', ru: 'Сегодня у меня нет времени. (не «Heute ich habe»)' },
          { de: 'In Russland **wohnt** meine Familie.', ru: 'В России живёт моя семья.' },
        ],
      },
      {
        heading: 'Отрицание и обстоятельства',
        body: ['Порядок дополнений: **Dativ перед Akkusativ**, если оба выражены существительными. Местоимения всегда идут раньше существительных.'],
        table: {
          head: ['Схема', 'Пример', 'Перевод'],
          rows: [
            ['Nominativ — Verb — Dativ — Akkusativ', 'Ich gebe dem Kind das Buch.', 'Я даю ребёнку книгу.'],
            ['Nominativ — Verb — Akk (мест.) — Dat (мест.)', 'Ich gebe es ihm.', 'Я даю это ему.'],
            ['nicht ставится перед отрицаемым', 'Ich fahre nicht nach Berlin.', 'Я не еду в Берлин.'],
            ['nicht перед прилагательным/наречием', 'Das Buch ist nicht teuer.', 'Книга не дорогая.'],
          ],
        },
      },
    ],
    pitfalls: [
      '«Завтра я еду» → **Morgen fahre ich** (не «Morgen ich fahre»). Это ошибка №1 русскоязычных.',
      'nicht ставится как можно ближе к тому, что отрицается, а не сразу после глагола.',
    ],
    tips: ['Проговорите вслух: «глагол — второй, всегда второй». Пока это не станет рефлексом, проверяйте каждое предложение.'],
    drills: ['sentence-order'],
  },

  {
    id: 'fragen',
    title: 'Fragen',
    titleRu: 'Вопросы',
    level: 'A1',
    summary: 'Два типа вопросов: без вопросительного слова (Ja/Nein-Fragen) и с вопросительным словом (W-Fragen). В первом случае глагол выходит на первое место.',
    sections: [
      {
        heading: 'Ja/Nein-Fragen — вопрос без вопросительного слова',
        body: ['Спрягаемый глагол встаёт на **первое место**, подлежащее — на второе. Ответ: Ja / Nein / Doch.'],
        table: {
          head: ['Утверждение', 'Вопрос', 'Ответ'],
          rows: [
            ['Du kommst aus Russland.', 'Kommst du aus Russland?', 'Ja, ich komme aus Russland.'],
            ['Sie haben Zeit.', 'Haben Sie Zeit?', 'Nein, ich habe keine Zeit.'],
            ['Er spricht Deutsch.', 'Spricht er Deutsch?', 'Ja, ein bisschen.'],
          ],
        },
      },
      {
        heading: 'W-Fragen — вопросы с вопросительным словом',
        body: ['Вопросительное слово — на первом месте, глагол — на втором.'],
        table: {
          head: ['Вопрос', 'Перевод', 'Пример'],
          rows: [
            ['Wer?', 'Кто?', 'Wer ist das?'],
            ['Was?', 'Что?', 'Was machst du?'],
            ['Wo?', 'Где?', 'Wo wohnst du?'],
            ['Wohin?', 'Куда?', 'Wohin fährst du?'],
            ['Woher?', 'Откуда?', 'Woher kommst du?'],
            ['Wann?', 'Когда?', 'Wann beginnt der Kurs?'],
            ['Warum?', 'Почему?', 'Warum lernst du Deutsch?'],
            ['Wie?', 'Как?', 'Wie heißt du?'],
            ['Wie viel? / Wie viele?', 'Сколько?', 'Wie viel kostet das?'],
            ['Welcher?', 'Какой (из)?', 'Welcher Bus fährt zum Bahnhof?'],
          ],
        },
      },
      {
        heading: 'Doch — третий ответ',
        body: ['Если вопрос был отрицательным, а вы хотите возразить, нужен **doch**, а не ja.'],
        examples: [
          { de: 'Hast du keine Zeit? — Doch, ich habe Zeit.', ru: 'У тебя нет времени? — Нет, есть.' },
          { de: 'Bist du nicht müde? — Doch, sehr müde.', ru: 'Ты не устал? — Нет, очень устал.' },
        ],
      },
    ],
    pitfalls: [
      'Русское «где» и «куда» — это wo и wohin. Ich wohne **in Berlin** (wo), Ich fahre **nach Berlin** (wohin).',
      'В вопросе с предлогом предлог ставится перед вопросительным словом: **Mit wem** fährst du? (не «Wem mit»).',
    ],
    drills: ['sentence-order', 'ru-de-choice'],
  },

  {
    id: 'negation',
    title: 'Negation: nicht & kein',
    titleRu: 'Отрицание: nicht и kein',
    level: 'A1',
    summary: 'Два отрицания с разными зонами ответственности: kein отрицает существительное с неопределённым артиклем, nicht — всё остальное.',
    sections: [
      {
        heading: 'Когда kein, когда nicht',
        table: {
          head: ['Отрицаем', 'Инструмент', 'Пример'],
          rows: [
            ['существительное с ein / без артикля', 'kein', 'Ich habe **keine** Zeit. / Das ist **kein** Problem.'],
            ['существительное с определённым артиклем', 'nicht', 'Ich mag **nicht** das Buch, sondern das Heft.'],
            ['глагол', 'nicht', 'Ich verstehe **nicht**.'],
            ['прилагательное', 'nicht', 'Das Buch ist **nicht** teuer.'],
            ['имя, название', 'nicht', 'Ich bin **nicht** Ivan, ich bin Peter.'],
            ['обстоятельство', 'nicht', 'Er kommt **nicht** heute, sondern morgen.'],
          ],
        },
      },
      {
        heading: 'Склонение kein',
        body: ['kein склоняется точно так же, как ein: kein / keine / kein, а в Akkusativ мужской род — keinen.'],
        table: {
          head: ['Род', 'Nominativ', 'Akkusativ', 'Dativ'],
          rows: [
            ['мужской', 'kein Tisch', 'keinen Tisch', 'keinem Tisch'],
            ['женский', 'keine Lampe', 'keine Lampe', 'keiner Lampe'],
            ['средний', 'kein Buch', 'kein Buch', 'keinem Buch'],
            ['мн. число', 'keine Bücher', 'keine Bücher', 'keinen Büchern'],
          ],
        },
      },
      {
        heading: 'Место nicht в предложении',
        body: ['nicht стремится занять позицию **перед** тем, что отрицает. Если отрицается весь факт — nicht идёт в конец, после всех дополнений.'],
        examples: [
          { de: 'Ich arbeite heute nicht.', ru: 'Я сегодня не работаю.' },
          { de: 'Ich kenne ihn nicht.', ru: 'Я его не знаю.' },
          { de: 'Er wohnt nicht in Berlin.', ru: 'Он живёт не в Берлине.' },
          { de: 'Ich habe das nicht gesehen.', ru: 'Я этого не видел.' },
        ],
      },
    ],
    pitfalls: [
      '«У меня нет времени» → Ich habe **keine** Zeit. Нельзя «Ich habe nicht Zeit».',
      'Двойное отрицание в немецком, как в русском, невозможно: «никогда не» = **nie**, без дополнительного nicht.',
      'В Perfekt nicht стоит перед Partizip II: Ich habe das **nicht** verstanden.',
    ],
    tips: ['Простой тест: если после отрицания идёт «ein/какой-то» — это kein. Всё прочее — nicht.'],
    drills: ['case-choice', 'typing-de'],
  },

  {
    id: 'akkusativ',
    title: 'Akkusativ',
    titleRu: 'Винительный падеж',
    level: 'A1',
    summary: 'Падеж прямого дополнения. Главное: меняется ТОЛЬКО мужской род — der → den, ein → einen. Женский и средний в Akkusativ не меняются.',
    sections: [
      {
        heading: 'Формы артиклей в Akkusativ',
        table: {
          head: ['Род', 'Nominativ', 'Akkusativ', 'Что изменилось'],
          rows: [
            ['мужской', 'der / ein', '**den / einen**', 'изменился!'],
            ['женский', 'die / eine', 'die / eine', 'не изменился'],
            ['средний', 'das / ein', 'das / ein', 'не изменился'],
            ['мн. число', 'die / keine', 'die / keine', 'не изменился'],
          ],
        },
        body: ['Личные местоимения тоже меняются: ich → **mich**, du → **dich**, er → **ihn**, wir → **uns**, ihr → **euch**.'],
      },
      {
        heading: 'Когда нужен Akkusativ',
        table: {
          head: ['Триггер', 'Пример', 'Перевод'],
          rows: [
            ['прямое дополнение (кого? что?)', 'Ich sehe **den** Mann.', 'Я вижу мужчину.'],
            ['после es gibt', 'Es gibt **einen** Park hier.', 'Здесь есть парк.'],
            ['после haben, brauchen, kaufen, suchen', 'Ich brauche **einen** Stuhl.', 'Мне нужен стул.'],
            ['предлоги: durch, für, gegen, ohne, um, entlang', 'Das ist **für** dich.', 'Это для тебя.'],
            ['предлоги места при направлении (in, auf, an…)', 'Ich gehe **in die** Stadt.', 'Я иду в город.'],
          ],
        },
      },
      {
        heading: 'Самые частые глаголы с Akkusativ',
        examples: [
          { de: 'Ich habe einen Bruder und eine Schwester.', ru: 'У меня есть брат и сестра.' },
          { de: 'Er kauft den Käse und das Brot.', ru: 'Он покупает сыр и хлеб.' },
          { de: 'Ich frage dich.', ru: 'Я спрашиваю тебя.' },
          { de: 'Wir besuchen unsere Eltern.', ru: 'Мы навещаем наших родителей.' },
        ],
      },
    ],
    pitfalls: [
      'Только мужской род меняет форму! Русскоязычные часто меняют все подряд: «Ich sehe die Mann» вместо **den Mann**.',
      'Ich helfe **dir** — Dativ, а не Akkusativ. helfen, danken, antworten, gefallen требуют Dativ.',
      'В русском «я иду в город» — винительный, и в немецком тоже Akkusativ: Ich gehe **in die** Stadt. Совпадение!',
    ],
    tips: ['Проверяйте род существительного до того, как выбрать артикль. Мужской род — единственный, о котором нужно думать в Akkusativ.'],
    drills: ['case-choice', 'article', 'typing-de'],
  },

  {
    id: 'dativ',
    title: 'Dativ',
    titleRu: 'Дательный падеж',
    level: 'A1',
    summary: 'Падеж косвенного дополнения («кому?»). Здесь меняются все роды, кроме… наоборот: меняется всё, кроме среднего и мужского, у которых форма совпадает.',
    sections: [
      {
        heading: 'Формы артиклей в Dativ',
        table: {
          head: ['Род', 'Nominativ', 'Dativ', 'Изменение'],
          rows: [
            ['мужской', 'der / ein', '**dem / einem**', 'der→dem, ein→einem'],
            ['женский', 'die / eine', '**der / einer**', 'die→der, eine→einer'],
            ['средний', 'das / ein', '**dem / einem**', 'das→dem, ein→einem'],
            ['мн. число', 'die / keine', '**den + -n** / keinen', 'die→den, у сущ. добавляется -n'],
          ],
        },
        body: ['Личные местоимения: ich → **mir**, du → **dir**, er → **ihm**, sie → **ihr**, es → **ihm**, wir → **uns**, ihr → **euch**, sie → **ihnen**, Sie → **Ihnen**.'],
      },
      {
        heading: 'Глаголы, требующие Dativ',
        body: ['Эти глаголы нужно просто запомнить — они не подчиняются русской логике.'],
        table: {
          head: ['Глагол', 'Перевод', 'Пример'],
          rows: [
            ['helfen', 'помогать', 'Ich helfe **dir**.'],
            ['danken', 'благодарить', 'Ich danke **Ihnen**.'],
            ['antworten', 'отвечать', 'Er antwortet **mir**.'],
            ['gefallen', 'нравиться', 'Berlin gefällt **mir**.'],
            ['gehören', 'принадлежать', 'Das Buch gehört **dem Kind**.'],
            ['schmecken', 'быть вкусным', 'Die Suppe schmeckt **mir**.'],
            ['passen', 'подходить', 'Das Kleid passt **ihr**.'],
            ['gratulieren', 'поздравлять', 'Ich gratuliere **dir**.'],
          ],
        },
      },
      {
        heading: 'Предлоги, всегда требующие Dativ',
        table: {
          head: ['Предлог', 'Перевод', 'Пример'],
          rows: [
            ['mit', 'с', 'mit **dem** Bus'],
            ['nach', 'после; в (город)', 'nach **der** Arbeit'],
            ['aus', 'из', 'aus **der** Schweiz'],
            ['zu', 'к, в', 'zu **dem** Arzt (zum Arzt)'],
            ['bei', 'у, при', 'bei **meinen** Eltern'],
            ['seit', 'с (о времени)', 'seit **einem** Jahr'],
            ['von', 'от, о', 'von **der** Arbeit'],
            ['gegenüber', 'напротив', 'gegenüber **dem** Bahnhof'],
            ['ab', 'начиная с', 'ab **dem** 1. Mai'],
          ],
        },
      },
    ],
    pitfalls: [
      '«Я помогаю тебе» → Ich helfe **dir** (не dich). Помощь, благодарность, ответ — всегда Dativ.',
      '«Мне нравится Берлин» → Berlin gefällt **mir**. Подлежащее — Берлин, а не я. Предложение строится «наоборот».',
      'Русский «звонить кому-то» — Dativ (я звоню тебе). В немецком anrufen требует Akkusativ: Ich rufe **dich** an. Исключение!',
    ],
    tips: ['Мнемоника для предлогов Dativ: **«mit, nach, aus, zu, von, bei, seit, gegenüber, ab»** — пропойте как ритм.'],
    drills: ['case-choice', 'article', 'conjugation'],
  },

  {
    id: 'genitiv',
    title: 'Genitiv',
    titleRu: 'Родительный падеж',
    level: 'A1+',
    summary: 'Падеж принадлежности («чей?»). В разговорной речи его часто заменяют на von + Dativ, но в письменной он обязателен.',
    sections: [
      {
        heading: 'Формы',
        table: {
          head: ['Род', 'Артикль', 'Существительное', 'Пример'],
          rows: [
            ['мужской', 'des', '+ -s / -es', 'das Auto **des** Vaters'],
            ['женский', 'der', '—', 'die Farbe **der** Wand'],
            ['средний', 'des', '+ -s / -es', 'das Ende **des** Jahres'],
            ['мн. число', 'der', '—', 'die Spielzeuge **der** Kinder'],
          ],
        },
        body: ['Имена собственные получают -s без артикля: **Peters Auto**, **Annas Buch**.'],
      },
      {
        heading: 'Genitiv или von + Dativ?',
        body: ['Оба варианта правильны, но с разной стилистикой.'],
        examples: [
          { de: 'Das ist das Haus meines Bruders.', ru: 'Это дом моего брата. (книжно)' },
          { de: 'Das ist das Haus von meinem Bruder.', ru: 'Это дом моего брата. (разговорно)' },
          { de: 'Die Farbe des Autos ist rot.', ru: 'Цвет машины — красный.' },
        ],
      },
      {
        heading: 'Предлоги с Genitiv',
        body: ['Устойчивые сочетания, которые нужно знать на A1+ уровне.'],
        table: {
          head: ['Предлог', 'Перевод', 'Пример'],
          rows: [
            ['wegen', 'из-за', 'wegen **des** Wetters'],
            ['trotz', 'несмотря на', 'trotz **der** Kälte'],
            ['während', 'во время', 'während **der** Pause'],
            ['statt', 'вместо', 'statt **des** Autos'],
          ],
        },
      },
    ],
    pitfalls: [
      'Русский родительный падеж употребляется гораздо шире немецкого. «У меня нет времени» — это НЕ Genitiv, а Dativ: Ich habe keine Zeit.',
      'Не забывайте -s у существительных мужского и среднего рода: das Auto **des** Vater**s**.',
    ],
    drills: ['case-choice'],
  },

  {
    id: 'possessiv',
    title: 'Possessivartikel',
    titleRu: 'Притяжательные местоимения',
    level: 'A1',
    summary: '«Мой, твой, его…» — это артикли, а не самостоятельные слова. Они склоняются по тому же образцу, что ein/kein.',
    sections: [
      {
        heading: 'Основа притяжательного местоимения',
        table: {
          head: ['Кто владеет', 'Основа', 'Пример', 'Перевод'],
          rows: [
            ['ich', 'mein-', 'mein Buch', 'моя книга'],
            ['du', 'dein-', 'dein Buch', 'твоя книга'],
            ['er / es', 'sein-', 'sein Buch', 'его книга'],
            ['sie', 'ihr-', 'ihr Buch', 'её книга'],
            ['wir', 'unser-', 'unser Buch', 'наша книга'],
            ['ihr', 'euer-', 'euer Buch', 'ваша (мн.) книга'],
            ['sie', 'ihr-', 'ihr Buch', 'их книга'],
            ['Sie', 'Ihr-', 'Ihr Buch', 'Ваша книга'],
          ],
        },
      },
      {
        heading: 'Склонение по родам',
        body: ['Окончание зависит от рода существительного, а не от владельца: mein **Vater**, mein**e** Mutter, mein Buch.'],
        table: {
          caption: 'mein- в трёх падежах',
          head: ['Род', 'Nominativ', 'Akkusativ', 'Dativ'],
          rows: [
            ['мужской', 'mein Vater', 'meinen Vater', 'meinem Vater'],
            ['женский', 'meine Mutter', 'meine Mutter', 'meiner Mutter'],
            ['средний', 'mein Kind', 'mein Kind', 'meinem Kind'],
            ['мн. число', 'meine Eltern', 'meine Eltern', 'meinen Eltern'],
          ],
        },
      },
      {
        heading: 'Особенности euer',
        body: ['У euer выпадает внутреннее -e-, когда добавляется окончание.'],
        examples: [
          { de: 'euer Haus', ru: 'ваш дом' },
          { de: 'eure Mutter', ru: 'ваша мама' },
          { de: 'eure Eltern', ru: 'ваши родители' },
        ],
      },
    ],
    pitfalls: [
      'sein может значить «его», а ihr — «её» ИЛИ «их». Контекст решает: Sein Buch (его книга) / Ihr Buch (её или их книга).',
      'В Dativ множественного числа существительное получает -n: mit mein**en** Freund**en**.',
    ],
    drills: ['article', 'case-choice', 'typing-de'],
  },

  {
    id: 'praepositionen',
    title: 'Präpositionen',
    titleRu: 'Предлоги и падежи',
    level: 'A1',
    summary: 'Три группы предлогов: всегда с Akkusativ, всегда с Dativ, и «двусторонние» (Wechselpräpositionen), падеж которых зависит от смысла.',
    sections: [
      {
        heading: 'Группа 1: только Akkusativ',
        table: {
          head: ['Предлог', 'Перевод', 'Пример'],
          rows: [
            ['durch', 'через, сквозь', 'durch **den** Park'],
            ['für', 'для, за', 'für **meine** Mutter'],
            ['gegen', 'против', 'gegen **die** Wand'],
            ['ohne', 'без', 'ohne **einen** Kaffee'],
            ['um', 'вокруг, в (о времени)', 'um **den** Tisch / um 8 Uhr'],
            ['entlang', 'вдоль', 'die Straße entlang'],
          ],
        },
      },
      {
        heading: 'Группа 2: только Dativ',
        table: {
          head: ['Предлог', 'Перевод', 'Пример'],
          rows: [
            ['mit', 'с', 'mit **dem** Freund'],
            ['nach', 'после; в (город/страна)', 'nach **dem** Essen'],
            ['aus', 'из', 'aus **der** Ukraine'],
            ['zu', 'к, в', 'zu **der** Arbeit'],
            ['von', 'от, о', 'von **dem** Chef'],
            ['bei', 'у, при', 'bei **meiner** Tante'],
            ['seit', 'с (время)', 'seit **einem** Monat'],
            ['gegenüber', 'напротив', 'gegenüber **der** Bank'],
          ],
        },
      },
      {
        heading: 'Группа 3: Wechselpräpositionen — падеж зависит от смысла',
        body: [
          'Девять предлогов: **in, an, auf, über, unter, vor, hinter, neben, zwischen**.',
          '**Wo?** (где — место) → Dativ. **Wohin?** (куда — направление) → Akkusativ.',
          'Это работает как в русском: «стоять в комнате» (где) vs «войти в комнату» (куда).',
        ],
        table: {
          head: ['Предлог', 'Wo? + Dativ', 'Wohin? + Akkusativ'],
          rows: [
            ['in', 'Ich bin **im** Haus.', 'Ich gehe **ins** Haus.'],
            ['an', 'Das Bild hängt **an der** Wand.', 'Ich hänge das Bild **an die** Wand.'],
            ['auf', 'Das Buch liegt **auf dem** Tisch.', 'Ich lege das Buch **auf den** Tisch.'],
            ['über', 'Die Lampe hängt **über dem** Tisch.', 'Ich hänge die Lampe **über den** Tisch.'],
            ['unter', 'Die Katze ist **unter dem** Bett.', 'Die Katze läuft **unter das** Bett.'],
            ['vor', 'Das Auto steht **vor dem** Haus.', 'Ich fahre **vor das** Haus.'],
            ['hinter', 'Der Garten ist **hinter dem** Haus.', 'Ich gehe **hinter das** Haus.'],
            ['neben', 'Ich sitze **neben der** Tür.', 'Ich setze mich **neben die** Tür.'],
            ['zwischen', 'Das Café ist **zwischen den** Häusern.', 'Ich stelle es **zwischen die** Häuser.'],
          ],
        },
      },
      {
        heading: 'Слияния (сокращения)',
        body: ['В разговорной речи предлог и артикль часто сливаются. Это норма, а не сленг.'],
        table: {
          head: ['Полная форма', 'Сокращение', 'Пример'],
          rows: [
            ['in dem', 'im', 'im Haus'],
            ['in das', 'ins', 'ins Kino'],
            ['an dem', 'am', 'am Montag'],
            ['an das', 'ans', 'ans Meer'],
            ['auf das', 'aufs', 'aufs Land'],
            ['zu dem', 'zum', 'zum Arzt'],
            ['zu der', 'zur', 'zur Arbeit'],
            ['bei dem', 'beim', 'beim Essen'],
            ['von dem', 'vom', 'vom Bahnhof'],
          ],
        },
      },
    ],
    pitfalls: [
      '«в» переводится тремя способами: **in** (внутри), **an** (у, при), **auf** (на открытой поверхности). Русское «на работе» → **bei der Arbeit**, не «auf der Arbeit» (хотя в разговорной речи это уже допустимо).',
      '«nach» используется для городов и стран без артикля: nach Berlin, nach Russland. Но **in die** Schweiz, **in die** Türkei (со артиклем).',
      'С «домой» — nach Hause (движение), «дома» — zu Hause (место).',
    ],
    tips: ['Заучите Dativ-предлоги как считалку: «mit, nach, aus, zu, von, bei, seit, gegenüber, ab». Все остальные либо Akkusativ, либо Wechselpräposition.'],
    drills: ['case-choice', 'sentence-order'],
  },

  {
    id: 'perfekt',
    title: 'Perfekt',
    titleRu: 'Прошедшее время (разговорное)',
    level: 'A1',
    summary: 'Главное прошедшее время разговорной речи. Строится из haben/sein + Partizip II в конце предложения.',
    sections: [
      {
        heading: 'Формула',
        body: ['**haben/sein (2-е место) + … + Partizip II (конец предложения)**. Рамка та же, что у модальных глаголов.'],
        table: {
          head: ['Лицо', 'haben', 'sein', 'Перевод'],
          rows: [
            ['ich', 'habe gemacht', 'bin gegangen', 'я сделал / я пошёл'],
            ['du', 'hast gemacht', 'bist gegangen', 'ты сделал / ты пошёл'],
            ['er/sie/es', 'hat gemacht', 'ist gegangen', 'он сделал / он пошёл'],
            ['wir', 'haben gemacht', 'sind gegangen', 'мы сделали / мы пошли'],
            ['ihr', 'habt gemacht', 'seid gegangen', 'вы сделали / вы пошли'],
            ['sie/Sie', 'haben gemacht', 'sind gegangen', 'они сделали / Вы пошли'],
          ],
        },
      },
      {
        heading: 'haben или sein?',
        body: ['Правило простое: **sein** — с глаголами движения и изменения состояния + три особых глагола. Всё остальное — **haben**.'],
        table: {
          head: ['С sein', 'С haben'],
          rows: [
            ['gehen, kommen, fahren, fliegen, laufen, reisen', 'все переходные: machen, kaufen, lesen, essen, trinken'],
            ['aufstehen, einschlafen, aufwachen', 'все возвратные: sich freuen, sich treffen'],
            ['bleiben, werden, sein (особые)', 'все модальные: können, müssen, wollen'],
            ['passieren, sterben, wachsen', 'большинство остальных'],
          ],
        },
      },
      {
        heading: 'Как образовать Partizip II',
        table: {
          head: ['Тип глагола', 'Схема', 'Пример'],
          rows: [
            ['слабый (правильный)', 'ge- + основа + -t', 'machen → **gemacht**; kaufen → **gekauft**'],
            ['сильный (неправильный)', 'ge- + (изменённая основа) + -en', 'sprechen → **gesprochen**; lesen → **gelesen**'],
            ['смешанный', 'ge- + изменённая основа + -t', 'bringen → **gebracht**; denken → **gedacht**'],
            ['с неотделяемой приставкой', 'без ge-', 'verstehen → **verstanden**; bezahlen → **bezahlt**'],
            ['с отделяемой приставкой', 'приставка + ge- + основа', 'aufstehen → **aufgestanden**; einkaufen → **eingekauft**'],
            ['на -ieren', 'без ge-', 'studieren → **studiert**; telefonieren → **telefoniert**'],
          ],
        },
      },
      {
        heading: 'Примеры в контексте',
        examples: [
          { de: 'Ich habe gestern einen Film gesehen.', ru: 'Вчера я посмотрел фильм.' },
          { de: 'Wir sind nach Berlin gefahren.', ru: 'Мы поехали в Берлин.' },
          { de: 'Hast du schon gegessen?', ru: 'Ты уже поел?' },
          { de: 'Sie hat mir geholfen.', ru: 'Она мне помогла.' },
          { de: 'Ich bin um sieben aufgestanden.', ru: 'Я встал в семь.' },
        ],
      },
    ],
    pitfalls: [
      'Не забудьте ge- у правильных глаголов: «Ich habe macht» — ошибка, нужно **gemacht**.',
      'С неотделяемыми приставками (be-, ge-, er-, ver-, zer-, ent-) ge- НЕ добавляется: verstanden, bezahlt, erklärt.',
      'sein для движения — но только если есть направление. «Я бегал в парке» → Ich bin im Park gelaufen (движение). «Я ждал» → Ich habe gewartet (haben).',
      'Partizip II всегда в конце, а не сразу после вспомогательного: Ich habe **gestern** einen Film **gesehen**.',
    ],
    tips: ['Учите глагол сразу в трёх формах: **sprechen — sprach — gesprochen**. Тогда Perfekt и Präteritum соберутся сами.'],
    drills: ['perfekt', 'sentence-order'],
  },

  {
    id: 'praeteritum',
    title: 'Präteritum',
    titleRu: 'Прошедшее время (книжное)',
    level: 'A1+',
    summary: 'Простое прошедшее. В разговоре используется редко, но sein, haben и модальные глаголы в устной речи — почти всегда в Präteritum.',
    sections: [
      {
        heading: 'Слабые глаголы',
        body: ['Основа + **-te** + личное окончание. Формы ich и er/sie/es совпадают.'],
        table: {
          caption: 'machen — делать',
          head: ['Лицо', 'Форма', 'Перевод'],
          rows: [
            ['ich', 'machte', 'я делал'],
            ['du', 'machtest', 'ты делал'],
            ['er/sie/es', 'machte', 'он делал'],
            ['wir', 'machten', 'мы делали'],
            ['ihr', 'machtet', 'вы делали'],
            ['sie/Sie', 'machten', 'они делали'],
          ],
        },
      },
      {
        heading: 'Обязательные к запоминанию',
        body: ['Эти формы в устной речи употребляются постоянно — их нужно знать как таблицу умножения.'],
        table: {
          head: ['Инфинитив', 'ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'],
          rows: [
            ['sein', 'war', 'warst', 'war', 'waren', 'wart', 'waren'],
            ['haben', 'hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'],
            ['werden', 'wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'],
            ['können', 'konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'],
            ['müssen', 'musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'],
            ['wollen', 'wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'],
            ['sollen', 'sollte', 'solltest', 'sollte', 'sollten', 'solltet', 'sollten'],
            ['dürfen', 'durfte', 'durftest', 'durfte', 'durften', 'durftet', 'durften'],
            ['wissen', 'wusste', 'wusstest', 'wusste', 'wussten', 'wusstet', 'wussten'],
          ],
        },
      },
      {
        heading: 'Perfekt или Präteritum?',
        table: {
          head: ['Ситуация', 'Что выбрать', 'Пример'],
          rows: [
            ['разговор, устная речь', 'Perfekt', 'Ich habe gestern gearbeitet.'],
            ['письменный рассказ, литература', 'Präteritum', 'Er arbeitete den ganzen Tag.'],
            ['sein, haben, модальные — всегда', 'Präteritum', 'Ich war müde. Ich hatte Zeit. Ich musste gehen.'],
            ['новости, репортаж', 'Präteritum', 'Der Minister sagte…'],
          ],
        },
      },
    ],
    pitfalls: [
      'В устной речи «Ich war» звучит естественно, а «Ich bin gewesen» — тяжеловесно. Для sein/haben выбирайте Präteritum.',
      'Формы ich и er/sie/es в Präteritum ВСЕГДА совпадают (кроме sein) — контекст различает их.',
    ],
    drills: ['conjugation', 'perfekt'],
  },

  {
    id: 'imperativ',
    title: 'Imperativ',
    titleRu: 'Повелительное наклонение',
    level: 'A1',
    summary: 'Три формы обращения: du, ihr, Sie. У du-формы отбрасывается окончание -st, у ihr — только меняется порядок.',
    sections: [
      {
        heading: 'Образование',
        table: {
          head: ['К кому', 'Схема', 'lernen', 'kommen', 'fahren', 'sein'],
          rows: [
            ['du', 'основа без -e (без du)', 'Lern!', 'Komm!', 'Fahr!', 'Sei!'],
            ['ihr', 'форма ihr без местоимения', 'Lernt!', 'Kommt!', 'Fahrt!', 'Seid!'],
            ['Sie', 'инфинитив + Sie', 'Lernen Sie!', 'Kommen Sie!', 'Fahren Sie!', 'Seien Sie!'],
          ],
        },
        body: [
          'Сильные глаголы **сохраняют** смену гласной e → i/ie: **Sprich!** (не «sprech»), **Lies!** (не «les»), **Nimm!**, **Gib!**, **Iss!**.',
          'Но умлаут a → ä **исчезает**: Fahr! (не «fähr»), Schlaf! (не «schläf»), Lauf! (не «läuf»).',
        ],
      },
      {
        heading: 'Вежливость и смягчение',
        body: ['Императив без смягчителей звучит резко. В нормальной речи добавляют bitte, mal, doch.'],
        examples: [
          { de: 'Gib mir bitte das Salz.', ru: 'Передай мне, пожалуйста, соль.' },
          { de: 'Warte mal kurz!', ru: 'Подожди-ка минутку!' },
          { de: 'Kommen Sie doch herein!', ru: 'Заходите же!' },
          { de: 'Setzen Sie sich, bitte.', ru: 'Садитесь, пожалуйста.' },
        ],
      },
      {
        heading: 'Отделяемые приставки',
        body: ['Приставка уходит в конец — как и в обычном предложении.'],
        examples: [
          { de: 'Steh bitte auf!', ru: 'Вставай, пожалуйста!' },
          { de: 'Ruf mich morgen an!', ru: 'Позвони мне завтра!' },
          { de: 'Mach das Fenster zu!', ru: 'Закрой окно!' },
        ],
      },
    ],
    pitfalls: [
      'Для вежливого «Вы» НИКОГДА не используется форма du: «Komm!» незнакомцу — грубость. Нужно «Kommen Sie!».',
      '«Seien Sie so nett» — вежливая формула с необычной формой seien. Запомните её как исключение.',
      'В немецком императив не имеет отдельного слова «пожалуйста» в начале — bitte ставится после глагола или в конце.',
    ],
    drills: ['typing-de', 'sentence-order'],
  },

  {
    id: 'trennbare-verben',
    title: 'Trennbare Verben',
    titleRu: 'Отделяемые приставки',
    level: 'A1',
    summary: 'У многих глаголов приставка отделяется и уезжает в конец предложения. Это одна из самых характерных черт немецкого синтаксиса.',
    sections: [
      {
        heading: 'Отделяемые приставки',
        body: ['Всегда ударные и всегда отделяются: **auf-, an-, aus-, ein-, mit-, zu-, vor-, ab-, bei-, fern-, los-, zurück-, weg-, her-, hin-**.'],
        table: {
          head: ['Глагол', 'Перевод', 'Пример'],
          rows: [
            ['aufstehen', 'вставать', 'Ich stehe um 7 Uhr **auf**.'],
            ['einkaufen', 'делать покупки', 'Ich kaufe im Supermarkt **ein**.'],
            ['anrufen', 'звонить', 'Ich rufe dich morgen **an**.'],
            ['mitkommen', 'идти вместе', 'Kommst du **mit**?'],
            ['aufmachen', 'открывать', 'Mach die Tür **auf**!'],
            ['fernsehen', 'смотреть ТВ', 'Wir sehen abends **fern**.'],
            ['einladen', 'приглашать', 'Ich lade dich **ein**.'],
            ['zuhören', 'слушать', 'Hör mir bitte **zu**!'],
          ],
        },
      },
      {
        heading: 'Неотделяемые приставки',
        body: ['Всегда безударные и НИКОГДА не отделяются: **be-, ge-, er-, ver-, zer-, ent-, emp-, miss-**. Ударение падает на корень.'],
        table: {
          head: ['Глагол', 'Перевод', 'Partizip II'],
          rows: [
            ['bekommen', 'получать', 'bekommen (без ge-)'],
            ['verstehen', 'понимать', 'verstanden'],
            ['erklären', 'объяснять', 'erklärt'],
            ['bezahlen', 'платить', 'bezahlt'],
            ['gefallen', 'нравиться', 'gefallen'],
            ['entschuldigen', 'извинять', 'entschuldigt'],
          ],
        },
      },
      {
        heading: 'Отделяемые приставки в разных временах',
        table: {
          head: ['Время', 'Схема', 'Пример с aufstehen'],
          rows: [
            ['Präsens', 'глагол + … + приставка', 'Ich **stehe** um 7 **auf**.'],
            ['Präteritum', 'глагол + … + приставка', 'Ich **stand** um 7 **auf**.'],
            ['Perfekt', 'приставка + ge + основа', 'Ich bin um 7 **aufgestanden**.'],
            ['с модальным', 'модальный + … + инфинитив', 'Ich muss um 7 **aufstehen**.'],
            ['с zu', 'приставка + zu + основа', 'Ich habe keine Lust **aufzustehen**.'],
          ],
        },
      },
    ],
    pitfalls: [
      'Если забыть отделить приставку, смысл меняется или предложение становится неграмотным: «Ich aufstehe um 7» — ошибка.',
      'Неотделяемые приставки всегда безударны — это ключ к определению. Скажите вслух: verˈstehen (ударение на корне) → неотделяемая; ˈaufstehen (ударение на приставке) → отделяемая.',
      'В Perfekt приставка «заходит внутрь»: an**ge**rufen, auf**ge**standen, ein**ge**kauft.',
    ],
    tips: ['Определяйте приставку по ударению, а не по смыслу. Ударная — отделяется, безударная — нет.'],
    drills: ['sentence-order', 'perfekt'],
  },

  {
    id: 'nebensatz',
    title: 'Nebensätze',
    titleRu: 'Придаточные предложения',
    level: 'A1+',
    summary: 'После союзов weil, dass, wenn, ob, obwohl глагол уходит в самый конец. Это второе главное правило немецкого синтаксиса.',
    sections: [
      {
        heading: 'Подчинительные союзы',
        table: {
          head: ['Союз', 'Перевод', 'Пример'],
          rows: [
            ['weil', 'потому что', 'Ich bleibe zu Hause, weil ich krank **bin**.'],
            ['dass', 'что', 'Ich weiß, dass du Recht **hast**.'],
            ['wenn', 'если, когда (повтор.)', 'Wenn es regnet, **bleibe** ich zu Hause.'],
            ['ob', 'ли', 'Ich weiß nicht, ob er **kommt**.'],
            ['obwohl', 'хотя', 'Obwohl es kalt ist, **gehe** ich spazieren.'],
            ['damit', 'чтобы', 'Ich lerne, damit ich die Prüfung **bestehe**.'],
            ['als', 'когда (однократно в прошлом)', 'Als ich klein **war**, wohnte ich in Moskau.'],
          ],
        },
      },
      {
        heading: 'Правило глагола в конце',
        body: [
          'В придаточном предложении спрягаемый глагол занимает **последнее место**. Если есть модальный или Perfekt — на последнем месте вспомогательный/модальный, а инфинитив или Partizip II перед ним.',
        ],
        examples: [
          { de: 'Ich komme nicht, weil ich keine Zeit **habe**.', ru: 'Я не приду, потому что у меня нет времени.' },
          { de: 'Sie sagt, dass sie morgen **kommen kann**.', ru: 'Она говорит, что может прийти завтра.' },
          { de: 'Er ist traurig, weil er die Prüfung nicht **bestanden hat**.', ru: 'Он грустный, потому что не сдал экзамен.' },
        ],
      },
      {
        heading: 'Придаточное на первом месте',
        body: ['Если придаточное стоит перед главным, то главное начинается с глагола — придаточное занимает «позицию 1».'],
        examples: [
          { de: 'Wenn ich Zeit habe, **komme** ich zu dir.', ru: 'Если у меня будет время, я приду к тебе.' },
          { de: 'Weil es regnet, **bleibe** ich zu Hause.', ru: 'Поскольку идёт дождь, я остаюсь дома.' },
        ],
      },
    ],
    pitfalls: [
      'weil и denn значат «потому что», но denn НЕ меняет порядок слов: Ich bleibe zu Hause, **denn** ich **bin** krank. С weil — Ich bleibe zu Hause, weil ich krank **bin**.',
      'wenn (если/повторяющееся) ≠ als (однократное в прошлом). «Когда я был маленьким» → **Als** ich klein war. «Когда идёт дождь» → **Wenn** es regnet.',
      'Порядок слов в придаточном с модальным: сначала инфинитив, потом модальный — «dass ich kommen kann», не «kann kommen».',
    ],
    tips: ['Проговорите: «после weil глагол — в хвост». Это правило стоит выучить первым из всей сложной грамматики.'],
    drills: ['sentence-order'],
  },

  {
    id: 'komparativ',
    title: 'Komparativ & Superlativ',
    titleRu: 'Степени сравнения',
    level: 'A1+',
    summary: '«Быстрее, самый быстрый». Komparativ — основа + -er, Superlativ — am + основа + -sten.',
    sections: [
      {
        heading: 'Образование',
        table: {
          head: ['Положительная', 'Сравнительная', 'Превосходная', 'Перевод'],
          rows: [
            ['schnell', 'schneller', 'am schnellsten', 'быстрый / быстрее / самый быстрый'],
            ['schön', 'schöner', 'am schönsten', 'красивый / красивее / самый красивый'],
            ['alt', 'älter', 'am ältesten', 'старый / старше / самый старый'],
            ['groß', 'größer', 'am größten', 'большой / больше / самый большой'],
            ['jung', 'jünger', 'am jüngsten', 'молодой / моложе / самый молодой'],
            ['gern', 'lieber', 'am liebsten', 'охотно / охотнее / больше всего'],
            ['gut', 'besser', 'am besten', 'хороший / лучше / самый лучший'],
            ['viel', 'mehr', 'am meisten', 'много / больше / больше всего'],
          ],
        },
        body: ['У односложных прилагательных с a, o, u часто появляется умлаут: alt → **ä**lter, groß → gr**ö**ßer, jung → j**ü**nger.'],
      },
      {
        heading: 'Сравнение: als и wie',
        table: {
          head: ['Конструкция', 'Смысл', 'Пример'],
          rows: [
            ['Komparativ + **als**', '«чем» — неравенство', 'Ich bin älter **als** du.'],
            ['so + Positiv + **wie**', '«такой же, как» — равенство', 'Er ist **so** groß **wie** ich.'],
            ['nicht so + Positiv + **wie**', '«не такой, как»', 'Sie ist **nicht so** schnell **wie** er.'],
          ],
        },
      },
      {
        heading: 'Склонение в превосходной степени',
        body: ['Перед существительным используется форма **der/die/das + -ste**.'],
        examples: [
          { de: 'Das ist der beste Film.', ru: 'Это лучший фильм.' },
          { de: 'Sie ist die jüngste Studentin.', ru: 'Она самая молодая студентка.' },
          { de: 'Am liebsten trinke ich Tee.', ru: 'Больше всего я люблю пить чай.' },
        ],
      },
    ],
    pitfalls: [
      'Русское «более» нельзя передать словом mehr перед прилагательным. Только окончание -er: «более быстрый» → **schneller**, не «mehr schnell».',
      'als — «чем», wie — «как». Путаница приводит к смысловой ошибке: älter als du (старше тебя) / so alt wie du (такой же старый, как ты).',
      'Прилагательное перед существительным склоняется: ein schnell**er** Zug, ein älter**er** Mann.',
    ],
    drills: ['ru-de-choice'],
  },

  {
    id: 'zahlen-uhrzeit',
    title: 'Zahlen & Uhrzeit',
    titleRu: 'Числа и время',
    level: 'A1',
    summary: 'Числа читаются «наоборот»: 21 = einundzwanzig («один и двадцать»). Время в разговоре — halb означает половину ДО следующего часа.',
    sections: [
      {
        heading: 'Числа от 13 до 99',
        body: ['Правило: единицы + **und** + десятки. Слитно, одним словом.'],
        table: {
          head: ['Цифра', 'Немецки', 'Дословно'],
          rows: [
            ['13', 'dreizehn', 'три-десять'],
            ['21', 'einundzwanzig', 'один и двадцать'],
            ['32', 'zweiunddreißig', 'два и тридцать'],
            ['45', 'fünfundvierzig', 'пять и сорок'],
            ['99', 'neunundneunzig', 'девять и девяносто'],
            ['100', 'hundert', 'сто'],
            ['101', 'hunderteins', 'сто один'],
            ['1 000', 'tausend', 'тысяча'],
          ],
        },
      },
      {
        heading: 'Официальное время (24 часа)',
        body: ['В расписаниях, на вокзале, в документах — только 24-часовой формат.'],
        table: {
          head: ['Время', 'Немецки'],
          rows: [
            ['09:00', 'neun Uhr'],
            ['09:15', 'neun Uhr fünfzehn'],
            ['09:30', 'neun Uhr dreißig'],
            ['09:45', 'neun Uhr fünfundvierzig'],
            ['17:20', 'siebzehn Uhr zwanzig'],
            ['21:00', 'einundzwanzig Uhr'],
          ],
        },
      },
      {
        heading: 'Разговорное время — ловушка halb',
        body: ['**halb** в немецком означает половину ДО следующего часа, а не после текущего!'],
        table: {
          head: ['Разговорная форма', 'Дословно', 'Реальное время'],
          rows: [
            ['halb acht', 'половина (к) восьми', '07:30'],
            ['halb neun', 'половина (к) девяти', '08:30'],
            ['Viertel nach acht', 'четверть после восьми', '08:15'],
            ['Viertel vor neun', 'четверть до девяти', '08:45'],
            ['fünf vor halb neun', 'пять до половины девятого', '08:25'],
            ['fünf nach halb neun', 'пять после половины девятого', '08:35'],
          ],
        },
      },
    ],
    pitfalls: [
      '**halb acht = 7:30**, а не 8:30! Это самая частая ошибка русскоязычных. Думайте: «половина пути к восьми».',
      'Числа читаются от единиц к десяткам: 21 = einundzwanzig. Русский читает от десятков.',
      'Год называется не как число, а «тысячами»: 1990 = **neunzehnhundertneunzig**, 2024 = **zweitausendvierundzwanzig** (или zwanzigvierundzwanzig в разговоре).',
    ],
    tips: ['Проверьте себя: если немец говорит «halb sieben», он имеет в виду 6:30. Это не интуитивно — просто запомните.'],
    drills: ['de-ru-choice', 'typing-de'],
  },

  {
    id: 'reflexive',
    title: 'Reflexive Verben',
    titleRu: 'Возвратные глаголы',
    level: 'A1+',
    summary: 'Глаголы с sich: действие направлено на самого себя. Возвратное местоимение склоняется по Akkusativ или Dativ.',
    sections: [
      {
        heading: 'Возвратные местоимения',
        table: {
          head: ['Лицо', 'Akkusativ', 'Dativ', 'Пример'],
          rows: [
            ['ich', 'mich', 'mir', 'Ich freue **mich**. / Ich wasche **mir** die Hände.'],
            ['du', 'dich', 'dir', 'Du freust **dich**.'],
            ['er/sie/es', 'sich', 'sich', 'Er freut **sich**.'],
            ['wir', 'uns', 'uns', 'Wir freuen **uns**.'],
            ['ihr', 'euch', 'euch', 'Ihr freut **euch**.'],
            ['sie/Sie', 'sich', 'sich', 'Sie freuen **sich**.'],
          ],
        },
        body: ['Akkusativ используется по умолчанию. Dativ — когда в предложении уже есть прямое дополнение (Akkusativ).'],
      },
      {
        heading: 'Важные возвратные глаголы',
        table: {
          head: ['Глагол', 'Перевод', 'Пример'],
          rows: [
            ['sich freuen', 'радоваться', 'Ich freue mich über das Geschenk.'],
            ['sich interessieren für', 'интересоваться', 'Ich interessiere mich für Musik.'],
            ['sich erinnern an', 'вспоминать', 'Ich erinnere mich an dich.'],
            ['sich treffen', 'встречаться', 'Wir treffen uns um sechs.'],
            ['sich fühlen', 'чувствовать себя', 'Ich fühle mich gut.'],
            ['sich beeilen', 'спешить', 'Beeil dich!'],
            ['sich ausruhen', 'отдыхать', 'Ich ruhe mich aus.'],
            ['sich vorstellen', 'представляться', 'Darf ich mich vorstellen?'],
          ],
        },
      },
      {
        heading: 'sich freuen: über или auf?',
        body: ['Разница важна: **über** — радость о произошедшем, **auf** — предвкушение.'],
        examples: [
          { de: 'Ich freue mich über dein Geschenk.', ru: 'Я радуюсь твоему подарку (уже получил).' },
          { de: 'Ich freue mich auf den Urlaub.', ru: 'Я с нетерпением жду отпуска (ещё впереди).' },
        ],
      },
    ],
    pitfalls: [
      'Русский и немецкий не совпадают: «Я чувствую себя хорошо» → Ich fühle **mich** gut (не «Ich fühle gut»).',
      'Некоторые глаголы возвратны только в немецком: sich erholen (отдыхать), sich erkälten (простудиться), sich verabschieden (прощаться).',
      'В Perfekt возвратное местоимение идёт после вспомогательного: Ich habe **mich** gefreut.',
    ],
    drills: ['typing-de', 'ru-de-choice'],
  },

  {
    id: 'hoeflichkeit',
    title: 'Höflichkeit',
    titleRu: 'Вежливость и речевой этикет',
    level: 'A1',
    summary: 'Немцы ценят прямоту, но у вежливости есть свои устойчивые формулы. Императив без смягчения звучит как приказ.',
    sections: [
      {
        heading: 'Смягчение просьбы',
        body: ['От самого прямого к самому вежливому:'],
        table: {
          head: ['Фраза', 'Степень вежливости', 'Перевод'],
          rows: [
            ['Gib mir das Buch.', 'грубо', 'Дай мне книгу.'],
            ['Gib mir bitte das Buch.', 'нейтрально', 'Дай мне, пожалуйста, книгу.'],
            ['Kannst du mir bitte das Buch geben?', 'вежливо', 'Можешь дать мне книгу?'],
            ['Könntest du mir bitte das Buch geben?', 'очень вежливо', 'Не мог бы ты дать мне книгу?'],
            ['Würden Sie mir bitte das Buch geben?', 'официально', 'Не могли бы Вы дать мне книгу?'],
          ],
        },
      },
      {
        heading: 'Устойчивые формулы',
        table: {
          head: ['Ситуация', 'Немецкая фраза', 'Перевод'],
          rows: [
            ['просьба', 'Könnten Sie mir bitte helfen?', 'Не могли бы Вы помочь?'],
            ['благодарность', 'Vielen Dank! / Danke schön!', 'Большое спасибо!'],
            ['извинение', 'Entschuldigung! / Es tut mir leid.', 'Извините! / Мне жаль.'],
            ['привлечь внимание', 'Entschuldigen Sie bitte!', 'Простите, пожалуйста!'],
            ['согласие', 'Gerne! / Ja, gern.', 'С удовольствием!'],
            ['отказ', 'Leider geht es nicht.', 'К сожалению, не получится.'],
            ['тост', 'Prost! / Zum Wohl!', 'За здоровье!'],
            ['за столом', 'Guten Appetit!', 'Приятного аппетита!'],
            ['чихание', 'Gesundheit!', 'Будьте здоровы!'],
            ['день рождения', 'Herzlichen Glückwunsch!', 'Поздравляю!'],
          ],
        },
      },
      {
        heading: 'Вежливые конструкции с Konjunktiv II',
        body: ['Формы könnte, hätte, wäre, würde звучат мягче и часто используются в вежливой речи.'],
        examples: [
          { de: 'Könnten Sie das bitte wiederholen?', ru: 'Не могли бы Вы это повторить?' },
          { de: 'Ich hätte eine Frage.', ru: 'У меня был бы вопрос.' },
          { de: 'Wäre es möglich, morgen zu kommen?', ru: 'Было бы возможно прийти завтра?' },
          { de: 'Ich würde gern einen Kaffee bestellen.', ru: 'Я хотел бы заказать кофе.' },
        ],
      },
    ],
    pitfalls: [
      'Прямой императив незнакомцу — социальная ошибка. Всегда добавляйте bitte или переходите на вопрос.',
      'Русское «ничего страшного» → **Macht nichts** или **Kein Problem**.',
      'Обращение по фамилии требует титула: Herr Müller, Frau Schmidt. Просто «Müller» — фамильярно.',
    ],
    tips: ['Заучите три формулы-спасателя: «Könnten Sie bitte…?», «Ich hätte eine Frage», «Entschuldigung, ich verstehe nicht».'],
    drills: ['ru-de-choice', 'sentence-order'],
  },

  {
    id: 'lernen-strategie',
    title: 'Lernstrategie',
    titleRu: 'Как учить: стратегия для русскоязычных',
    level: 'A1',
    summary: 'План работы с тренажёром: что делать каждый день, в каком порядке и на что обратить особое внимание.',
    sections: [
      {
        heading: 'Порядок освоения',
        table: {
          head: ['Этап', 'Что делать', 'Модуль тренажёра'],
          rows: [
            ['1. Неделя 1–2', 'Алфавит и правила чтения. Читать вслух каждый день по 10 минут.', 'Фонетика'],
            ['2. Неделя 1–2', 'sein, haben, werden + модальные. Это 80% бытовых фраз.', 'Глаголы'],
            ['3. Неделя 3–4', 'Приветствия, числа, семья, еда — первые 4 колоды.', 'Лексика'],
            ['4. Неделя 3–4', 'Род существительных и артикли. Учить слова вместе с артиклем.', 'Грамматика'],
            ['5. Неделя 5–6', 'Правильные глаголы в Präsens, порядок слов, вопросы.', 'Грамматика'],
            ['6. Неделя 7–8', 'Perfekt, отделяемые приставки, все колоды лексики.', 'Грамматика + Лексика'],
          ],
        },
      },
      {
        heading: 'Что делать каждый день',
        table: {
          head: ['Активность', 'Время', 'Зачем'],
          rows: [
            ['Повторение по SRS', '10–15 мин', 'Удержание слов в памяти — самое важное'],
            ['Аудирование (кнопка 🔊)', '5 мин', 'Связь «звук ↔ смысл» без русского посредника'],
            ['Вслух вслед за диктором', '5 мин', 'Фонетика: немецкие звуки требуют тренировки артикуляции'],
            ['Одна тема грамматики', '10 мин', 'Понимание системы, а не зазубривание'],
            ['Набор слов на клавиатуре', '5 мин', 'Письмо закрепляет орфографию: умлауты, ß, удвоения'],
          ],
        },
      },
      {
        heading: 'Что русскоязычным особенно трудно',
        table: {
          head: ['Трудность', 'Причина', 'Решение'],
          rows: [
            ['Род существительных', 'Не совпадает с русским', 'Учить слово всегда с артиклем и цветом'],
            ['Артикли', 'В русском их нет', 'Считать артикль частью слова'],
            ['Порядок слов', 'Глагол обязан быть вторым', 'Проверять каждое предложение на позицию глагола'],
            ['Долгота гласных', 'Не различается в русском', 'Тренировать пары: Stadt/Staat, offen/Ofen'],
            ['Звук [ç] (ich-Laut)', 'Нет в русском', 'Слушать и повторять: ich, mich, Milch, Mädchen'],
            ['Картавое r', 'Русское «р» раскатистое', 'Расслабить язык, звук идёт из горла'],
            ['Смена гласной в глаголах', 'В русском такого нет', 'Учить глагол сразу в трёх формах'],
            ['Предлоги с падежами', 'Логика другая', 'Заучивать предлог вместе с падежом'],
          ],
        },
      },
      {
        heading: 'Правила эффективного повторения',
        body: [
          '**Короткие сессии лучше долгих.** 15 минут каждый день дают больше, чем 2 часа раз в неделю.',
          '**Активное вспоминание важнее перечитывания.** Не смотрите на перевод — попробуйте вспомнить сами, потом проверьте.',
          '**Интервалы.** Этот тренажёр сам планирует повторения: слово возвращается перед тем, как вы его забудете.',
          '**Контекст обязателен.** Слово без предложения не закрепляется. Читайте примеры вслух.',
          '**Проговаривайте вслух.** Немецкая артикуляция — это навык мышц, а не только памяти.',
        ],
      },
    ],
    tips: [
      'Цель первого месяца: 300 слов + 20 глаголов в Präsens и Perfekt + уверенный порядок слов.',
      'Не гонитесь за идеальным произношением с первого дня. Понимаемость важнее акцента.',
      'Возвращайтесь к грамматике циклично: то, что непонятно сейчас, станет очевидным после 200 слов практики.',
    ],
    drills: ['de-ru-choice'],
  },
]

export const grammarById = new Map(grammarTopics.map((t) => [t.id, t]))
