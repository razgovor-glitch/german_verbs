import type { Level } from '../types'

export interface DialogueLine {
  /** Кто говорит: A или B */
  speaker: 'A' | 'B'
  de: string
  ru: string
  /** Грамматическая или культурная сноска */
  note?: string
}

export interface Dialogue {
  id: string
  icon: string
  title: string
  titleRu: string
  level: Level
  /** Где происходит и что нужно знать */
  situation: string
  lines: DialogueLine[]
  /** Устойчивые фразы, которые стоит выучить наизусть */
  phrases: { de: string; ru: string }[]
}

/**
 * Разговорник: 12 бытовых сцен.
 * Каждая сцена — короткий диалог с переводом и набор готовых фраз.
 * Это то, что реально нужно в первые месяцы в Германии.
 */
export const dialogues: Dialogue[] = [
  {
    id: 'cafe',
    icon: '☕',
    title: 'Im Café',
    titleRu: 'В кафе',
    level: 'A1',
    situation:
      'Заказ в кафе или пекарне — самая частая ситуация. Обратите внимание на «möchten» (вежливое «хотел бы») — в заказе используется почти всегда именно оно, а не «wollen».',
    lines: [
      { speaker: 'A', de: 'Guten Tag! Was möchten Sie?', ru: 'Добрый день! Что вы хотели бы?' },
      { speaker: 'B', de: 'Ich möchte einen Kaffee mit Milch, bitte.', ru: 'Я хотел бы кофе с молоком, пожалуйста.', note: 'möchten + Akkusativ: einen Kaffee.' },
      { speaker: 'A', de: 'Klein oder groß?', ru: 'Маленький или большой?' },
      { speaker: 'B', de: 'Groß, bitte. Und ein Stück Kuchen.', ru: 'Большой, пожалуйста. И кусок пирога.' },
      { speaker: 'A', de: 'Möchten Sie den Kuchen mit Sahne?', ru: 'Пирог со взбитыми сливками?' },
      { speaker: 'B', de: 'Nein, danke, ohne Sahne.', ru: 'Нет, спасибо, без сливок.', note: 'ohne всегда требует Akkusativ: ohne Sahne.' },
      { speaker: 'A', de: 'Das macht zusammen sechs Euro fünfzig.', ru: 'Итого шесть евро пятьдесят.' },
      { speaker: 'B', de: 'Hier bitte. Stimmt so.', ru: 'Вот, пожалуйста. Сдачи не надо.', note: '«Stimmt so» — «сдачи не нужно». Говорят, оставляя чаевые.' },
      { speaker: 'A', de: 'Vielen Dank! Guten Appetit!', ru: 'Большое спасибо! Приятного аппетита!' },
    ],
    phrases: [
      { de: 'Ich möchte…, bitte.', ru: 'Я хотел бы…, пожалуйста.' },
      { de: 'Ich nehme das.', ru: 'Я возьму это.' },
      { de: 'Was empfehlen Sie?', ru: 'Что вы порекомендуете?' },
      { de: 'Zum Mitnehmen, bitte.', ru: 'С собой, пожалуйста.' },
      { de: 'Zahlen, bitte!', ru: 'Счёт, пожалуйста!' },
      { de: 'Stimmt so.', ru: 'Сдачи не надо.' },
      { de: 'Guten Appetit!', ru: 'Приятного аппетита!' },
    ],
  },
  {
    id: 'supermarkt',
    icon: '🛒',
    title: 'Im Supermarkt',
    titleRu: 'В супермаркете',
    level: 'A1',
    situation:
      'В Германии кассир почти всегда спрашивает про карту клиента и пакет. Здесь же пригодится «wo finde ich…» — самый полезный вопрос в магазине.',
    lines: [
      { speaker: 'B', de: 'Entschuldigung, wo finde ich die Milch?', ru: 'Извините, где найти молоко?', note: 'wo finde ich…? — универсальный вопрос в магазине.' },
      { speaker: 'A', de: 'Die Milch ist dort hinten rechts, im Kühlregal.', ru: 'Молоко вон там сзади справа, в холодильной витрине.' },
      { speaker: 'B', de: 'Danke. Und haben Sie frisches Brot?', ru: 'Спасибо. А у вас есть свежий хлеб?' },
      { speaker: 'A', de: 'Ja, das Brot ist gleich am Eingang.', ru: 'Да, хлеб сразу у входа.' },
      { speaker: 'B', de: 'Gut. Ich brauche noch Eier und Käse.', ru: 'Хорошо. Мне ещё нужны яйца и сыр.' },
      { speaker: 'A', de: 'Die Eier sind im Angebot: zehn Stück für zwei Euro.', ru: 'Яйца по акции: десять штук за два евро.', note: 'im Angebot — «по акции», очень частое слово в немецких магазинах.' },
      { speaker: 'B', de: 'Dann nehme ich zwei Packungen.', ru: 'Тогда я возьму две упаковки.' },
      { speaker: 'A', de: 'Möchten Sie eine Tüte?', ru: 'Вам нужен пакет?' },
      { speaker: 'B', de: 'Nein, danke, ich habe eine Tasche dabei.', ru: 'Нет, спасибо, у меня с собой сумка.' },
      { speaker: 'A', de: 'Haben Sie eine Kundenkarte?', ru: 'У вас есть карта клиента?' },
      { speaker: 'B', de: 'Nein, leider nicht. Kann ich mit Karte bezahlen?', ru: 'Нет, к сожалению. Можно оплатить картой?' },
      { speaker: 'A', de: 'Ja, natürlich. Das macht zwölf Euro dreißig.', ru: 'Да, конечно. Итого двенадцать евро тридцать.' },
    ],
    phrases: [
      { de: 'Wo finde ich…?', ru: 'Где найти…?' },
      { de: 'Haben Sie…?', ru: 'У вас есть…?' },
      { de: 'Ich brauche noch…', ru: 'Мне ещё нужно…' },
      { de: 'Im Angebot', ru: 'По акции' },
      { de: 'Eine Tüte, bitte.', ru: 'Пакет, пожалуйста.' },
      { de: 'Kann ich mit Karte bezahlen?', ru: 'Можно оплатить картой?' },
      { de: 'Nur bar.', ru: 'Только наличными.' },
    ],
  },
  {
    id: 'weg-fragen',
    icon: '🧭',
    title: 'Nach dem Weg fragen',
    titleRu: 'Как пройти',
    level: 'A1',
    situation:
      'Направление задаётся двумя разными вопросами: «wo?» (где находиться) и «wohin?» (куда идти). Здесь используется второй — поэтому «zum Bahnhof».',
    lines: [
      { speaker: 'B', de: 'Entschuldigung, können Sie mir helfen? Ich suche den Bahnhof.', ru: 'Извините, можете мне помочь? Я ищу вокзал.' },
      { speaker: 'A', de: 'Ja, gern. Der Bahnhof ist nicht weit von hier.', ru: 'Да, охотно. Вокзал недалеко отсюда.' },
      { speaker: 'B', de: 'Wie komme ich am besten dorthin?', ru: 'Как мне лучше туда добраться?' },
      { speaker: 'A', de: 'Gehen Sie hier geradeaus bis zur Ampel, dann links.', ru: 'Идите здесь прямо до светофора, потом налево.', note: 'bis zur Ampel — Dativ, потому что «до» указывает на конечную точку пути.' },
      { speaker: 'B', de: 'Geradeaus bis zur Ampel, dann links. Und dann?', ru: 'Прямо до светофора, потом налево. А потом?' },
      { speaker: 'A', de: 'Dann die zweite Straße rechts. Der Bahnhof ist auf der linken Seite.', ru: 'Потом вторая улица направо. Вокзал на левой стороне.' },
      { speaker: 'B', de: 'Ist es weit zu Fuß?', ru: 'Это далеко пешком?' },
      { speaker: 'A', de: 'Nein, etwa zehn Minuten.', ru: 'Нет, минут десять.' },
      { speaker: 'B', de: 'Vielen Dank für Ihre Hilfe!', ru: 'Большое спасибо за помощь!' },
      { speaker: 'A', de: 'Gern geschehen. Gute Reise!', ru: 'Не за что. Хорошей поездки!' },
    ],
    phrases: [
      { de: 'Können Sie mir helfen?', ru: 'Можете мне помочь?' },
      { de: 'Wie komme ich zum Bahnhof / zur Post?', ru: 'Как пройти к вокзалу / к почте?' },
      { de: 'Gehen Sie geradeaus / links / rechts.', ru: 'Идите прямо / налево / направо.' },
      { de: 'Bis zur Ampel, dann um die Ecke.', ru: 'До светофора, потом за угол.' },
      { de: 'Ist es weit?', ru: 'Это далеко?' },
      { de: 'Ich habe mich verlaufen.', ru: 'Я заблудился.' },
      { de: 'Ich suche…', ru: 'Я ищу…' },
    ],
  },
  {
    id: 'restaurant',
    icon: '🍽',
    title: 'Im Restaurant',
    titleRu: 'В ресторане',
    level: 'A1',
    situation:
      'Ключевая немецкая деталь — в конце ужина официант спросит «Zusammen oder getrennt?» (вместе или раздельно). Это вопрос про то, как делить счёт.',
    lines: [
      { speaker: 'A', de: 'Guten Abend! Haben Sie reserviert?', ru: 'Добрый вечер! Вы бронировали?' },
      { speaker: 'B', de: 'Ja, auf den Namen Ivanov, für zwei Personen.', ru: 'Да, на имя Иванов, на двоих.', note: 'auf den Namen + Akkusativ — «на имя».' },
      { speaker: 'A', de: 'Einen Moment bitte… Ja, hier entlang. Möchten Sie die Speisekarte?', ru: 'Минутку… Да, сюда. Вам меню?' },
      { speaker: 'B', de: 'Danke. Was empfehlen Sie?', ru: 'Спасибо. Что вы порекомендуете?' },
      { speaker: 'A', de: 'Unser Schnitzel mit Kartoffeln ist sehr beliebt.', ru: 'Наш шницель с картофелем очень популярен.' },
      { speaker: 'B', de: 'Dann nehme ich das Schnitzel. Und meine Frau nimmt den Fisch.', ru: 'Тогда я возьму шницель. А моя жена возьмёт рыбу.' },
      { speaker: 'A', de: 'Und was möchten Sie trinken?', ru: 'А что будете пить?' },
      { speaker: 'B', de: 'Ein Wasser und ein Glas Rotwein, bitte.', ru: 'Воду и бокал красного вина, пожалуйста.' },
      { speaker: 'B', de: 'Die Rechnung, bitte!', ru: 'Счёт, пожалуйста!' },
      { speaker: 'A', de: 'Zusammen oder getrennt?', ru: 'Вместе или раздельно?' },
      { speaker: 'B', de: 'Zusammen, bitte. Das Essen war sehr gut.', ru: 'Вместе, пожалуйста. Еда была очень вкусной.' },
      { speaker: 'A', de: 'Das freut mich. Kommen Sie bald wieder!', ru: 'Очень рад. Приходите снова!' },
    ],
    phrases: [
      { de: 'Ich habe einen Tisch reserviert.', ru: 'Я забронировал столик.' },
      { de: 'Die Speisekarte, bitte.', ru: 'Меню, пожалуйста.' },
      { de: 'Was empfehlen Sie?', ru: 'Что порекомендуете?' },
      { de: 'Ich nehme…', ru: 'Я возьму…' },
      { de: 'Die Rechnung, bitte.', ru: 'Счёт, пожалуйста.' },
      { de: 'Zusammen oder getrennt?', ru: 'Вместе или раздельно?' },
      { de: 'Zum Wohl! / Prost!', ru: 'За здоровье! / Будем!' },
    ],
  },
  {
    id: 'arzt',
    icon: '🩺',
    title: 'Beim Arzt',
    titleRu: 'У врача',
    level: 'A1',
    situation:
      'Главная фраза немецкой медицины — «Was fehlt Ihnen?» («Что вас беспокоит?»). Ответ строится через «Ich habe …schmerzen» или «Mir tut … weh».',
    lines: [
      { speaker: 'A', de: 'Guten Tag, haben Sie einen Termin?', ru: 'Добрый день, у вас есть запись?' },
      { speaker: 'B', de: 'Nein, ich brauche einen Termin. Es geht mir nicht gut.', ru: 'Нет, мне нужна запись. Я плохо себя чувствую.' },
      { speaker: 'A', de: 'Was fehlt Ihnen denn?', ru: 'Что вас беспокоит?', note: 'Дословно «чего вам недостаёт» — стандартный вопрос врача.' },
      { speaker: 'B', de: 'Ich habe Kopfschmerzen und Fieber. Und ich huste viel.', ru: 'У меня болит голова и температура. И я много кашляю.' },
      { speaker: 'A', de: 'Haben Sie auch Halsschmerzen?', ru: 'Горло тоже болит?' },
      { speaker: 'B', de: 'Ja, ein bisschen. Und meine Nase ist verstopft.', ru: 'Да, немного. И у меня заложен нос.' },
      { speaker: 'A', de: 'Kommen Sie morgen um zehn Uhr. Bringen Sie Ihre Versichertenkarte mit.', ru: 'Приходите завтра в десять. Возьмите с собой страховую карту.', note: 'mitbringen — отделяемая приставка: Bringen Sie … mit.' },
      { speaker: 'B', de: 'Muss ich nüchtern kommen?', ru: 'Нужно приходить натощак?' },
      { speaker: 'A', de: 'Nein, das ist nicht nötig.', ru: 'Нет, это не обязательно.' },
      { speaker: 'B', de: 'Vielen Dank. Bis morgen.', ru: 'Большое спасибо. До завтра.' },
    ],
    phrases: [
      { de: 'Ich brauche einen Termin.', ru: 'Мне нужна запись на приём.' },
      { de: 'Ich habe Kopfschmerzen / Fieber / Halsschmerzen.', ru: 'У меня болит голова / температура / болит горло.' },
      { de: 'Mir ist schlecht.', ru: 'Мне плохо (тошнит).' },
      { de: 'Es tut hier weh.', ru: 'Здесь болит.' },
      { de: 'Meine Nase ist verstopft.', ru: 'У меня заложен нос.' },
      { de: 'Ich bin versichert bei…', ru: 'Я застрахован в…' },
      { de: 'Gute Besserung!', ru: 'Выздоравливайте!' },
    ],
  },
  {
    id: 'wohnung',
    icon: '🏠',
    title: 'Wohnung suchen',
    titleRu: 'Поиск квартиры',
    level: 'A1+',
    situation:
      'Немецкие объявления о жилье полны сокращений: «warm» и «kalt» — это про коммунальные платежи, «Kaution» — залог, «Nebenkosten» — дополнительные расходы. Без этих слов разговор не имеет смысла.',
    lines: [
      { speaker: 'B', de: 'Guten Tag, ich rufe wegen der Anzeige an. Ist die Wohnung noch frei?', ru: 'Добрый день, я звоню по объявлению. Квартира ещё свободна?', note: 'wegen + Genitiv: wegen der Anzeige.' },
      { speaker: 'A', de: 'Ja, die Wohnung ist noch verfügbar.', ru: 'Да, квартира ещё доступна.' },
      { speaker: 'B', de: 'Wie groß ist sie und wie hoch ist die Miete?', ru: 'Какая у неё площадь и сколько составляет аренда?' },
      { speaker: 'A', de: 'Sie hat zwei Zimmer, 58 Quadratmeter. Die Miete ist 750 Euro warm.', ru: 'Две комнаты, 58 квадратных метров. Аренда 750 евро «тёплыми».', note: '«warm» = с коммунальными, «kalt» = без них.' },
      { speaker: 'B', de: 'Warm heißt mit Nebenkosten?', ru: '«Тёплыми» значит с дополнительными расходами?' },
      { speaker: 'A', de: 'Genau, Heizung und Wasser sind inklusive.', ru: 'Точно, отопление и вода включены.' },
      { speaker: 'B', de: 'Ab wann ist sie frei?', ru: 'С какого числа она свободна?' },
      { speaker: 'A', de: 'Ab dem ersten Oktober. Die Kaution beträgt drei Monatsmieten.', ru: 'С первого октября. Залог — три месячные аренды.', note: 'Kaution — обязательный залог, обычно 2–3 месячные аренды.' },
      { speaker: 'B', de: 'Gibt es einen Balkon?', ru: 'Есть балкон?' },
      { speaker: 'A', de: 'Ja, und einen Keller. Wann möchten Sie sie besichtigen?', ru: 'Да, и подвал. Когда вы хотели бы её посмотреть?' },
      { speaker: 'B', de: 'Am besten am Samstag, wenn es passt.', ru: 'Лучше всего в субботу, если удобно.' },
      { speaker: 'A', de: 'Samstag um elf passt gut. Bis dann!', ru: 'Суббота, одиннадцать — отлично. До встречи!' },
    ],
    phrases: [
      { de: 'Ich rufe wegen der Anzeige an.', ru: 'Я звоню по объявлению.' },
      { de: 'Ist die Wohnung noch frei?', ru: 'Квартира ещё свободна?' },
      { de: 'Wie hoch ist die Miete?', ru: 'Сколько составляет аренда?' },
      { de: 'warm / kalt', ru: 'с коммунальными / без коммунальных' },
      { de: 'Die Nebenkosten / Die Kaution', ru: 'Доп. расходы / Залог' },
      { de: 'Wann kann ich sie besichtigen?', ru: 'Когда можно её посмотреть?' },
      { de: 'Ab wann ist sie frei?', ru: 'С какого числа свободна?' },
    ],
  },
  {
    id: 'bahnhof',
    icon: '🚆',
    title: 'Am Bahnhof',
    titleRu: 'На вокзале',
    level: 'A1',
    situation:
      'Покупка билета: «einfach» — в одну сторону, «hin und zurück» — туда и обратно, «Gleis» — путь, «umsteigen» — пересадка. Четыре слова, без которых не уехать.',
    lines: [
      { speaker: 'B', de: 'Guten Tag, ich möchte eine Fahrkarte nach Hamburg.', ru: 'Добрый день, я хотел бы билет до Гамбурга.' },
      { speaker: 'A', de: 'Einfach oder hin und zurück?', ru: 'В одну сторону или туда и обратно?' },
      { speaker: 'B', de: 'Hin und zurück, bitte. Für heute.', ru: 'Туда и обратно, пожалуйста. На сегодня.' },
      { speaker: 'A', de: 'Wann möchten Sie fahren?', ru: 'Когда вы хотели бы поехать?' },
      { speaker: 'B', de: 'Am liebsten mit dem Zug um vierzehn Uhr.', ru: 'Лучше всего поездом в четырнадцать часов.', note: 'am liebsten — «больше всего хотелось бы», превосходная степень от gern.' },
      { speaker: 'A', de: 'Das kostet 89 Euro. Mit der Bahncard wäre es billiger.', ru: 'Это стоит 89 евро. С Bahncard было бы дешевле.' },
      { speaker: 'B', de: 'Ich habe keine Bahncard. Von welchem Gleis fährt der Zug?', ru: 'У меня нет Bahncard. С какого пути отправляется поезд?' },
      { speaker: 'A', de: 'Von Gleis sieben. Der Zug hat zehn Minuten Verspätung.', ru: 'С седьмого пути. Поезд опаздывает на десять минут.' },
      { speaker: 'B', de: 'Muss ich umsteigen?', ru: 'Нужно делать пересадку?' },
      { speaker: 'A', de: 'Nein, der Zug fährt direkt.', ru: 'Нет, поезд идёт прямо.' },
      { speaker: 'B', de: 'Danke schön!', ru: 'Большое спасибо!' },
    ],
    phrases: [
      { de: 'Eine Fahrkarte nach…, bitte.', ru: 'Один билет до…, пожалуйста.' },
      { de: 'Einfach / Hin und zurück', ru: 'В одну сторону / Туда и обратно' },
      { de: 'Von welchem Gleis fährt der Zug?', ru: 'С какого пути отправляется поезд?' },
      { de: 'Muss ich umsteigen?', ru: 'Нужна пересадка?' },
      { de: 'Wann fährt der nächste Zug?', ru: 'Когда следующий поезд?' },
      { de: 'Der Zug hat Verspätung.', ru: 'Поезд опаздывает.' },
      { de: 'Ist dieser Platz noch frei?', ru: 'Это место свободно?' },
    ],
  },
  {
    id: 'kennenlernen',
    icon: '🤝',
    title: 'Sich vorstellen',
    titleRu: 'Знакомство',
    level: 'A1',
    situation:
      'Классический первый разговор. Здесь важно не перепутать «ich bin» (я есть) и «ich heiße» (меня зовут) — оба варианта правильны, но второй звучит естественнее.',
    lines: [
      { speaker: 'A', de: 'Hallo! Ich heiße Anna. Und du?', ru: 'Привет! Меня зовут Анна. А тебя?' },
      { speaker: 'B', de: 'Ich bin Ivan. Freut mich!', ru: 'Я Иван. Приятно познакомиться!', note: 'Freut mich — «приятно познакомиться», устойчивая формула.' },
      { speaker: 'A', de: 'Woher kommst du?', ru: 'Откуда ты?' },
      { speaker: 'B', de: 'Ich komme aus Russland, aus Nowosibirsk. Und du?', ru: 'Я из России, из Новосибирска. А ты?', note: 'aus + Dativ для стран и городов. Исключение: in die Schweiz, in die Türkei.' },
      { speaker: 'A', de: 'Ich bin aus Österreich, aber ich wohne seit drei Jahren in Berlin.', ru: 'Я из Австрии, но живу в Берлине уже три года.', note: 'seit + Dativ: seit drei Jahren.' },
      { speaker: 'B', de: 'Was machst du hier?', ru: 'Чем ты здесь занимаешься?' },
      { speaker: 'A', de: 'Ich studiere Medizin. Und was machst du?', ru: 'Я учусь на врача. А ты?' },
      { speaker: 'B', de: 'Ich arbeite als Programmierer. Ich lerne gerade Deutsch.', ru: 'Я работаю программистом. Как раз учу немецкий.' },
      { speaker: 'A', de: 'Dein Deutsch ist schon sehr gut!', ru: 'Твой немецкий уже очень хороший!' },
      { speaker: 'B', de: 'Danke, das ist nett. Ich übe jeden Tag.', ru: 'Спасибо, это мило. Я тренируюсь каждый день.' },
    ],
    phrases: [
      { de: 'Ich heiße… / Ich bin…', ru: 'Меня зовут… / Я…' },
      { de: 'Freut mich!', ru: 'Приятно познакомиться!' },
      { de: 'Woher kommst du?', ru: 'Откуда ты?' },
      { de: 'Ich komme aus…', ru: 'Я из…' },
      { de: 'Ich wohne in…', ru: 'Я живу в…' },
      { de: 'Was machst du?', ru: 'Чем занимаешься?' },
      { de: 'Ich arbeite als…', ru: 'Я работаю…' },
      { de: 'Wie alt bist du?', ru: 'Сколько тебе лет?' },
    ],
  },
  {
    id: 'telefon',
    icon: '📞',
    title: 'Am Telefon',
    titleRu: 'По телефону',
    level: 'A1+',
    situation:
      'По телефону в Германии принято представляться сразу. Фраза «Können Sie das buchstabieren?» спасает, когда диктуют фамилию или адрес.',
    lines: [
      { speaker: 'A', de: 'Guten Tag, Praxis Doktor Weber. Was kann ich für Sie tun?', ru: 'Добрый день, практика доктора Вебера. Чем могу помочь?' },
      { speaker: 'B', de: 'Guten Tag, mein Name ist Ivanov. Ich möchte einen Termin vereinbaren.', ru: 'Добрый день, меня зовут Иванов. Я хотел бы записаться на приём.' },
      { speaker: 'A', de: 'Sind Sie schon bei uns Patient?', ru: 'Вы уже наш пациент?' },
      { speaker: 'B', de: 'Nein, ich bin neu hier.', ru: 'Нет, я здесь новенький.' },
      { speaker: 'A', de: 'Können Sie mir Ihren Namen buchstabieren?', ru: 'Можете продиктовать вашу фамилию по буквам?', note: 'Буквы читаются по-немецки: I-V-A-N-O-V.' },
      { speaker: 'B', de: 'Ja: I-V-A-N-O-V.', ru: 'Да: И-Фау-А-Эн-О-Фау.' },
      { speaker: 'A', de: 'Danke. Passt Ihnen Donnerstag um neun Uhr?', ru: 'Спасибо. Вам подходит четверг в девять?' },
      { speaker: 'B', de: 'Donnerstag um neun ist gut.', ru: 'Четверг в девять — хорошо.' },
      { speaker: 'A', de: 'Dann notiere ich das. Bringen Sie bitte Ihre Versichertenkarte mit.', ru: 'Тогда я это записываю. Возьмите, пожалуйста, страховую карту.' },
      { speaker: 'B', de: 'Mache ich. Vielen Dank. Auf Wiederhören!', ru: 'Сделаю. Большое спасибо. До свидания (по телефону)!', note: 'Auf Wiederhören — только по телефону. Лично — Auf Wiedersehen.' },
    ],
    phrases: [
      { de: 'Was kann ich für Sie tun?', ru: 'Чем могу помочь?' },
      { de: 'Ich möchte einen Termin vereinbaren.', ru: 'Я хотел бы записаться на приём.' },
      { de: 'Können Sie das buchstabieren?', ru: 'Можете продиктовать по буквам?' },
      { de: 'Passt Ihnen…?', ru: 'Вам подходит…?' },
      { de: 'Ich notiere das.', ru: 'Я это запишу.' },
      { de: 'Könnten Sie das wiederholen?', ru: 'Не могли бы вы повторить?' },
      { de: 'Auf Wiederhören!', ru: 'До свидания! (по телефону)' },
    ],
  },
  {
    id: 'buero',
    icon: '💼',
    title: 'Im Büro',
    titleRu: 'На работе',
    level: 'A1+',
    situation:
      'Разговор с коллегой — это в первую очередь small talk о выходных и короткие рабочие уточнения. «Worum geht es?» («о чём речь?») — незаменимая фраза.',
    lines: [
      { speaker: 'A', de: 'Guten Morgen! Wie war dein Wochenende?', ru: 'Доброе утро! Как прошли выходные?' },
      { speaker: 'B', de: 'Guten Morgen. Sehr gut, danke. Wir waren im Park. Und deins?', ru: 'Доброе утро. Очень хорошо, спасибо. Мы были в парке. А твои?', note: 'deins = «твоё/твои» — короткая форма вместо «dein Wochenende».' },
      { speaker: 'A', de: 'Auch gut. Ich habe endlich ausgeschlafen.', ru: 'Тоже хорошо. Я наконец выспался.' },
      { speaker: 'B', de: 'Sag mal, hast du die E-Mail von Herrn Müller gelesen?', ru: 'Слушай, ты читал письмо от господина Мюллера?', note: 'Sag mal — «слушай», вводное слово для начала вопроса.' },
      { speaker: 'A', de: 'Noch nicht. Worum geht es?', ru: 'Ещё нет. О чём речь?' },
      { speaker: 'B', de: 'Um das Meeting am Donnerstag. Es wird auf Freitag verschoben.', ru: 'О совещании в четверг. Его переносят на пятницу.' },
      { speaker: 'A', de: 'Danke für die Info. Ich muss noch einen Bericht fertig machen.', ru: 'Спасибо за информацию. Мне нужно ещё закончить отчёт.' },
      { speaker: 'B', de: 'Brauchst du Hilfe?', ru: 'Нужна помощь?' },
      { speaker: 'A', de: 'Nein, danke, ich schaffe das. Bis später!', ru: 'Нет, спасибо, я справлюсь. До скорого!', note: 'Ich schaffe das — «я с этим справлюсь», разговорное и очень частое.' },
    ],
    phrases: [
      { de: 'Wie war dein Wochenende?', ru: 'Как прошли выходные?' },
      { de: 'Worum geht es?', ru: 'О чём речь?' },
      { de: 'Es geht um…', ru: 'Речь о…' },
      { de: 'Ich muss noch…', ru: 'Мне ещё нужно…' },
      { de: 'Brauchst du Hilfe?', ru: 'Нужна помощь?' },
      { de: 'Ich schaffe das.', ru: 'Я справлюсь.' },
      { de: 'Bis später!', ru: 'До скорого!' },
      { de: 'Können wir das verschieben?', ru: 'Можем перенести?' },
    ],
  },
  {
    id: 'verabredung',
    icon: '🎬',
    title: 'Eine Verabredung',
    titleRu: 'Договориться о встрече',
    level: 'A1',
    situation:
      'Приглашение и согласование времени. Немцы конкретны: время и место называются точно, а «Abgemacht!» закрепляет договорённость.',
    lines: [
      { speaker: 'A', de: 'Hast du am Freitag Zeit? Wir könnten etwas unternehmen.', ru: 'У тебя есть время в пятницу? Мы могли бы что-нибудь придумать.', note: 'könnten — Konjunktiv II, звучит мягче и вежливее, чем können.' },
      { speaker: 'B', de: 'Am Freitag muss ich bis sechs arbeiten. Danach gern.', ru: 'В пятницу мне надо работать до шести. После — с удовольствием.' },
      { speaker: 'A', de: 'Wollen wir ins Kino gehen?', ru: 'Пойдём в кино?' },
      { speaker: 'B', de: 'Gute Idee. Was läuft denn?', ru: 'Хорошая идея. А что идёт?' },
      { speaker: 'A', de: 'Ein neuer Film. Ich habe gehört, er ist spannend.', ru: 'Новый фильм. Я слышал, он захватывающий.' },
      { speaker: 'B', de: 'Dann treffen wir uns um halb sieben vor dem Kino.', ru: 'Тогда встретимся в полседьмого перед кинотеатром.', note: 'halb sieben = 18:30, половина ДО семи!' },
      { speaker: 'A', de: 'Abgemacht. Soll ich die Karten kaufen?', ru: 'Договорились. Мне купить билеты?' },
      { speaker: 'B', de: 'Ja, bitte. Ich überweise dir das Geld.', ru: 'Да, пожалуйста. Я переведу тебе деньги.' },
      { speaker: 'A', de: 'Kein Problem. Bis Freitag!', ru: 'Без проблем. До пятницы!' },
    ],
    phrases: [
      { de: 'Hast du Zeit?', ru: 'У тебя есть время?' },
      { de: 'Wollen wir…?', ru: 'Давай…?' },
      { de: 'Treffen wir uns um…', ru: 'Встретимся в…' },
      { de: 'Abgemacht!', ru: 'Договорились!' },
      { de: 'Soll ich…?', ru: 'Мне…?' },
      { de: 'Es tut mir leid, ich kann nicht.', ru: 'К сожалению, я не могу.' },
      { de: 'Vielleicht ein andermal.', ru: 'Может быть, в другой раз.' },
    ],
  },
  {
    id: 'smalltalk',
    icon: '💬',
    title: 'Small Talk',
    titleRu: 'Светская беседа',
    level: 'A1',
    situation:
      'Погода — универсальная тема для начала разговора в Германии. Обратите внимание на «nicht wahr?» в конце — аналог русского «не так ли?».',
    lines: [
      { speaker: 'A', de: 'Schönes Wetter heute, nicht wahr?', ru: 'Хорошая сегодня погода, не так ли?' },
      { speaker: 'B', de: 'Ja, endlich! Letzte Woche hat es nur geregnet.', ru: 'Да, наконец-то! На прошлой неделе только дождь шёл.', note: 'es hat geregnet — безличное «шёл дождь», подлежащее es.' },
      { speaker: 'A', de: 'Stimmt. Hast du etwas Schönes fürs Wochenende vor?', ru: 'Верно. У тебя есть планы на выходные?', note: 'vorhaben — отделяемая приставка: Hast du … vor?' },
      { speaker: 'B', de: 'Ich fahre mit dem Fahrrad raus an den See. Und du?', ru: 'Я поеду на велосипеде за город к озеру. А ты?' },
      { speaker: 'A', de: 'Ich bleibe zu Hause. Ich muss für die Prüfung lernen.', ru: 'Я остаюсь дома. Мне нужно готовиться к экзамену.' },
      { speaker: 'B', de: 'Ach so. Viel Erfolg! Wann ist die Prüfung?', ru: 'Понятно. Удачи! Когда экзамен?' },
      { speaker: 'A', de: 'Am Montag. Ich bin schon ein bisschen nervös.', ru: 'В понедельник. Я уже немного нервничаю.' },
      { speaker: 'B', de: 'Das wird schon klappen. Du hast viel gelernt.', ru: 'Всё получится. Ты много учил.', note: '«Das wird schon klappen» — «всё образуется», очень частая поддерживающая фраза.' },
      { speaker: 'A', de: 'Danke, das hoffe ich. Dir ein schönes Wochenende!', ru: 'Спасибо, надеюсь. Хороших тебе выходных!' },
      { speaker: 'B', de: 'Dir auch!', ru: 'И тебе!' },
    ],
    phrases: [
      { de: 'Schönes Wetter heute, nicht wahr?', ru: 'Хорошая погода сегодня, не так ли?' },
      { de: 'Es hat geregnet / geschneit.', ru: 'Шёл дождь / снег.' },
      { de: 'Was hast du am Wochenende vor?', ru: 'Какие планы на выходные?' },
      { de: 'Ach so.', ru: 'А, понятно.' },
      { de: 'Viel Erfolg!', ru: 'Удачи!' },
      { de: 'Das wird schon klappen.', ru: 'Всё получится.' },
      { de: 'Dir auch!', ru: 'И тебе тоже!' },
      { de: 'Gute Besserung!', ru: 'Выздоравливай!' },
    ],
  },
]

export const dialogueById = new Map(dialogues.map((d) => [d.id, d]))

export const totalDialogueLines = dialogues.reduce((n, d) => n + d.lines.length, 0)
export const totalPhrases = dialogues.reduce((n, d) => n + d.phrases.length, 0)
