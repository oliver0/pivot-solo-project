CREATE TABLE phrasal_verbs (
  id SERIAL PRIMARY KEY,
  phrasal_verb VARCHAR(30) NOT NULL,
  base VARCHAR(30) NOT NULL,
  preposition VARCHAR(30) NOT NULL,
  definition VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE sentences(
sentence_id SERIAL PRIMARY KEY,
sentence text NOT NULL,
verb_id INTEGER NOT NULL REFERENCES phrasal_verbs(id)
);

SElECT sentence, phrasal_verb, base, preposition
FROM phrasal_verbs
JOIN sentences ON phrasal_verbs.id = sentences.verb_id
GROUP BY sentence, phrasal_verb, base, preposition;

-- test data

INSERT INTO phrasal_verbs (phrasal_verb, base, preposition, definition)
VALUES ('break up', 'break', 'up', 'To come to an end (marriage, relationship)'),
('check in', 'check', 'in', 'To register at a hotel or airport'),
('calm down', 'calm', 'down', 'To become more relaxed, less angry or upset'),
('drop off', 'drop', 'off', 'To deliver someone or something'),
('call off', 'call', 'off', 'To cancel'),
('count on', 'count', 'on', 'To rely or depend on (for help)'),
('find out', 'find', 'out', 'To discover or obtain information'),
('get together', 'get', 'together', 'To meet each other'),
('get up', 'get', 'up', 'To rise, leave bed'),
('make up', 'make', 'up', 'To invent (excuse, story)'),
('make up', 'make', 'up', 'To reconcile');

INSERT INTO phrasal_verbs (phrasal_verb, base, preposition, definition)
VALUES ('hold on', 'hold', 'on', 'To wait'),
('hold on', 'hold', 'on', 'To grip tightly'),
('put off', 'put', 'off', 'To postpone, arrange a later date'),
('put on', 'put', 'on', 'To turn on, switch on'),
('put out', 'put', 'out', 'To extinguish'),
('point out', 'point', 'out', 'To indicate/direct attention to something'),
('run out', 'run', 'out', 'To have no more of something.'),
('set up', 'set', 'up', 'To start a business'),
('show off', 'show', 'off', 'To brag or want to be admired'),
('wear out', 'wear', 'out', 'To become unusable'),
('wear out', 'wear', 'out', 'To become very tired');

INSERT INTO sentences (sentence, verb_id)
VALUES ('Lisa and John decided to _ _ when Lisa moved country.', 16),
('If she loves him she wont _ _ with him.', 16),
('They didnt _ _ to the hotel on time because their flight was delayed.', 17),
('The flight leaves at 3pm so we should _ _ around 2pm.', 17),
('It took him a few minutes to _ _ after hearing the bad news.', 18),
('I meditate when I need to _ _.', 18),
('Can you _ _ my parents at the airport?', 19),
('They had to _ _ the match because of the snow storm.', 20),
('Can I _ _ you to get the project finished on time?', 21),
('If they _ _ the truth we will be in a lot of trouble.', 22),
('Lets _ _ next weekend to talk about your idea.', 23),
('My family tries to _ _ at least once a year.', 23),
('On Sundays I prefer to lie in bed than _ _ immediately.', 24),
('Children often _ _ stories to entertain themselves.', 25),
('It is usually better to tell the truth than _ _ an excuse.', 25),
('Whenever I have an argument with someone I try to _ _ with them later in the day.', 26),
('Can you please _ _ for 5 minutes while I finish getting ready?', 27),
('Please _ _ and a representative will answer your call.', 27),
('You should _ _ to the steering wheel with both hands.', 28),
('Don’t _ _ until tomorrow, what you can do today.', 29);
