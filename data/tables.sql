ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY  public.usertable DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;

DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards (
    id serial,
    title text
);

DROP TABLE IF EXISTS public,cards;
CREATE TABLE cards (
    id serial,
    board_id integer,
    title text,
    status_id integer,
    _order integer
);

DROP TABLE IF EXISTS public.statuses;
CREATE TABLE statuses (
    id serial,
    title text,
    board_id bigint
);

DROP TABLE IF EXISTS public.usertable;
CREATE TABLE usertable (
    id serial,
    username text,
    password text
);

ALTER TABLE only usertable
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id),
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) references boards(id) ON DELETE CASCADE;

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id),
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) references boards(id),
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) references statuses(id);

INSERT INTO boards (title) VALUES
    ('Teamwork week'),
    ('Self-instructed week');

INSERT INTO statuses (title, board_id) VALUES
('New', 1),
('In Progress', 1),
('Testing', 1),
('Done', 1),
('New', 2),
('In Progress', 2),
('Testing', 2),
('Done', 2);
