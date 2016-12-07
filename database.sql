CREATE TABLE phrasal_verbs (
  id SERIAL PRIMARY KEY,
  phrasal_verb VARCHAR(30) NOT NULL,
  base VARCHAR(30) NOT NULL,
  preposition VARCHAR(30) NOT NULL,
  definition VARCHAR(200) UNIQUE NOT NULL
);

SELECT *
FROM phrasal_verbs;

-- test data

INSERT INTO phrasal_verbs (phrasal_verb, base, preposition, definition)
VALUES ('break up', 'break', 'up', 'To come to an end (marriage, relationship)'),
('check in', 'call', 'off', 'To register at a hotel or airport'),
('calm down', 'call', 'off', 'To become more relaxed, less angry or upset'),
('drop off', 'drop', 'off', 'To deliver someone or something'),
('call off', 'call', 'off', 'To cancel'),
('count on', 'count', 'on', 'To rely or depend on (for help)'),
('find out', 'find', 'out', 'To discover or obtain information'),
('get together', 'get', 'together', 'To meet each other'),
('get up', 'get', 'up', 'To rise, leave bed'),
('make up', 'make', 'up', 'To invent (excuse, story)'),
('make up', 'make', 'up', 'To reconcile');
