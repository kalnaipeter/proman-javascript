ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;

DROP TABLE IF EXISTS public.boards;
CREATE TABLE boards (
    id serial,
    title text,
    columns text[]
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
    title text
);


ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id),
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) references boards(id),
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) references statuses(id);


