import type { LetterEntry } from '../types'

/**
 * Немецкий алфавит: 26 букв + умлауты + ß.
 * «name» — немецкое название буквы, «ru» — как её произносит русскоязычный,
 * «ipa» — реальный звук, который буква даёт в слове.
 */
export const alphabet: LetterEntry[] = [
  { upper: 'A', lower: 'a', name: 'aː', ipa: 'a / aː', ru: 'а', example: 'Apfel', exampleRu: 'яблоко', kind: 'vowel', hint: 'Долгое [aː] в открытом слоге: Tag, Name. Краткое — перед двойной согласной: Mann.' },
  { upper: 'B', lower: 'b', name: 'beː', ipa: 'b / p', ru: 'бэ / б', example: 'Buch', exampleRu: 'книга', kind: 'consonant', hint: 'На конце слова и перед согласной оглушается до [p]: halb = «хальп», gib = «гип».' },
  { upper: 'C', lower: 'c', name: 'tseː', ipa: 'ts / k', ru: 'ц / к', example: 'Computer', exampleRu: 'компьютер', kind: 'consonant', hint: 'Сама по себе даёт [k] (Café). В сочетаниях ch, ck, sch — см. правила чтения.' },
  { upper: 'D', lower: 'd', name: 'deː', ipa: 'd / t', ru: 'дэ / д', example: 'Danke', exampleRu: 'спасибо', kind: 'consonant', hint: 'На конце слова оглушается до [t]: Kind = «кинт», Land = «лант».' },
  { upper: 'E', lower: 'e', name: 'eː', ipa: 'eː / ɛ / ə', ru: 'э', example: 'Esel', exampleRu: 'осёл', kind: 'vowel', hint: 'Долгое [eː] — Seele; краткое [ɛ] — Bett; безударное [ə] — bitte («битэ»).' },
  { upper: 'F', lower: 'f', name: 'ɛf', ipa: 'f', ru: 'эф / ф', example: 'Fisch', exampleRu: 'рыба', kind: 'consonant' },
  { upper: 'G', lower: 'g', name: 'ɡeː', ipa: 'g / k / ç', ru: 'гэ / г', example: 'Garten', exampleRu: 'сад', kind: 'consonant', hint: 'На конце слова — [k]: Tag = «так». В суффиксе -ig — [ç]: wichtig = «вихьтихь».' },
  { upper: 'H', lower: 'h', name: 'haː', ipa: 'h / (немое)', ru: 'ха / х', example: 'Haus', exampleRu: 'дом', kind: 'consonant', hint: 'После гласной h не читается, а удлиняет её: Zahl = «цааль», Uhr = «уа».' },
  { upper: 'I', lower: 'i', name: 'iː', ipa: 'iː / ɪ', ru: 'и', example: 'Insel', exampleRu: 'остров', kind: 'vowel', hint: 'Долгое [iː] — wir, ihn; краткое [ɪ] — mit, Kind.' },
  { upper: 'J', lower: 'j', name: 'jɔt', ipa: 'j', ru: 'йот / й', example: 'Jahr', exampleRu: 'год', kind: 'consonant', hint: 'Никогда не «дж»! Jahr = «йаа», ja = «йа».' },
  { upper: 'K', lower: 'k', name: 'kaː', ipa: 'k', ru: 'ка / к', example: 'Kind', exampleRu: 'ребёнок', kind: 'consonant', hint: 'Придыхательное [kʰ] в начале слова — как английское k.' },
  { upper: 'L', lower: 'l', name: 'ɛl', ipa: 'l', ru: 'эль / ль', example: 'Lampe', exampleRu: 'лампа', kind: 'consonant', hint: 'Всегда мягче русского «л»; слоговое [l̩] в конце: Himmel = «химль».' },
  { upper: 'M', lower: 'm', name: 'ɛm', ipa: 'm', ru: 'эм / м', example: 'Mutter', exampleRu: 'мама', kind: 'consonant' },
  { upper: 'N', lower: 'n', name: 'ɛn', ipa: 'n', ru: 'эн / н', example: 'Name', exampleRu: 'имя', kind: 'consonant' },
  { upper: 'O', lower: 'o', name: 'oː', ipa: 'oː / ɔ', ru: 'о', example: 'Ofen', exampleRu: 'печь', kind: 'vowel', hint: 'Долгое [oː] — Boot, wo; краткое [ɔ] — Sonne, noch.' },
  { upper: 'P', lower: 'p', name: 'peː', ipa: 'p', ru: 'пэ / п', example: 'Papier', exampleRu: 'бумага', kind: 'consonant', hint: 'Придыхательное [pʰ] в начале и перед ударной гласной.' },
  { upper: 'Q', lower: 'q', name: 'kuː', ipa: 'kv', ru: 'ку / кв', example: 'Quelle', exampleRu: 'источник', kind: 'consonant', hint: 'Только в сочетании qu = [kv]: Quelle = «квэле», bequem = «бэквэм».' },
  { upper: 'R', lower: 'r', name: 'ɛʁ', ipa: 'ʁ / ɐ', ru: 'эр / р', example: 'Rot', exampleRu: 'красный', kind: 'consonant', hint: 'Увулярное (картавое) [ʁ], НЕ раскатистое русское «р». В конце слога превращается в [ɐ]: der = «дэа».' },
  { upper: 'S', lower: 's', name: 'ɛs', ipa: 'z / s / ʃ', ru: 'эс / с', example: 'Sonne', exampleRu: 'солнце', kind: 'consonant', hint: 'Перед гласной — звонкое [z]: sagen = «загэн». В конце слова — [s]. В начале перед p/t — [ʃ].' },
  { upper: 'T', lower: 't', name: 'teː', ipa: 't', ru: 'тэ / т', example: 'Tisch', exampleRu: 'стол', kind: 'consonant', hint: 'Придыхательное [tʰ]. Никогда не смягчается: Tisch = «тиш», не «тишь».' },
  { upper: 'U', lower: 'u', name: 'uː', ipa: 'uː / ʊ', ru: 'у', example: 'Uhr', exampleRu: 'часы', kind: 'vowel', hint: 'Долгое [uː] — Buch; краткое [ʊ] — Mutter.' },
  { upper: 'V', lower: 'v', name: 'faʊ', ipa: 'f / v', ru: 'фау / ф', example: 'Vater', exampleRu: 'отец', kind: 'consonant', hint: 'В исконно немецких словах — [f]: Vater, viel, von. В заимствованиях — [v]: Vase, Villa.' },
  { upper: 'W', lower: 'w', name: 'veː', ipa: 'v', ru: 'вэ / в', example: 'Wasser', exampleRu: 'вода', kind: 'consonant', hint: 'Это [v], а не английское [w]! Wein = «вайн», wo = «во».' },
  { upper: 'X', lower: 'x', name: 'ɪks', ipa: 'ks', ru: 'икс / кс', example: 'Xylophon', exampleRu: 'ксилофон', kind: 'consonant' },
  { upper: 'Y', lower: 'y', name: 'ʏpsilɔn', ipa: 'y / ʏ / j', ru: 'ипсилон / ю', example: 'Yoga', exampleRu: 'йога', kind: 'consonant', hint: 'В греческих словах = ü (Physik). В начале слова часто [j]: Yoga = «йога».' },
  { upper: 'Z', lower: 'z', name: 'tsɛt', ipa: 'ts', ru: 'цэт / ц', example: 'Zug', exampleRu: 'поезд', kind: 'consonant', hint: 'Всегда [ts]: Zeit = «цайт». НЕ «з»!' },
  { upper: 'Ä', lower: 'ä', name: 'ɛː', ipa: 'ɛː / ɛ', ru: 'э', example: 'Äpfel', exampleRu: 'яблоки', kind: 'special', hint: 'Ближе к русскому «э», чем к «я». Мädchen = «мэдхен», не «мядхен».' },
  { upper: 'Ö', lower: 'ö', name: 'øː', ipa: 'øː / œ', ru: 'ё (без «й»)', example: 'Öl', exampleRu: 'масло', kind: 'special', hint: 'Губы как для «о», язык как для «э». Öl ≈ «ёль», но без начального «й».' },
  { upper: 'Ü', lower: 'ü', name: 'yː', ipa: 'yː / ʏ', ru: 'ю (без «й»)', example: 'Übung', exampleRu: 'упражнение', kind: 'special', hint: 'Губы как для «у», язык как для «и». Übung ≈ «юбунг» без «й».' },
  { upper: 'ß', lower: 'ß', name: 'ɛsˈtsɛt', ipa: 's', ru: 'эс-цет / сс', example: 'Straße', exampleRu: 'улица', kind: 'special', hint: '«Эсцет» — всегда глухое [s], удлиняет предыдущую гласную. Замена при наборе текста: ss.' },
]

export const letterGroups = [
  {
    id: 'vowels',
    title: 'Гласные',
    titleRu: 'Vokale',
    desc: 'Долгота гласной в немецком меняет смысл слова — это не «акцент», а обязательное правило.',
    letters: alphabet.filter((l) => l.kind === 'vowel'),
  },
  {
    id: 'consonants',
    title: 'Согласные',
    titleRu: 'Konsonanten',
    desc: 'Главные отличия от русского: придыхание, оглушение на конце, отсутствие смягчения.',
    letters: alphabet.filter((l) => l.kind === 'consonant'),
  },
  {
    id: 'special',
    title: 'Умлауты и ß',
    titleRu: 'Umlaute & Eszett',
    desc: 'Три умлаута меняют и звук, и грамматическую форму (a → ä, o → ö, u → ü, ss → ß).',
    letters: alphabet.filter((l) => l.kind === 'special'),
  },
]
