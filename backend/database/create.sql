drop schema public cascade;
create schema public;

create table public.item (
  id_item serial primary key,
  category text,
  description text,
  price real,
  width integer,
  height integer,
  length integer,
  weight integer
);

insert into public.item (id_item, category, description, price, width, height, length, weight) values (1, 'Music', 'CD', 30, 30, 30, 10, 0.5);
insert into public.item (id_item, category, description, price, width, height, length, weight) values (2, 'Video', 'DVD', 50, 40, 20, 10, 0.5);
insert into public.item (id_item, category, description, price, width, height, length, weight) values (3, 'Video', 'VHD', 10, 40, 20, 10, 0.5);
insert into public.item (id_item, category, description, price, width, height, length, weight) values (4, 'Musical Instruments', 'Guitar', 1000, 100, 30, 10, 3);
insert into public.item (id_item, category, description, price, width, height, length, weight) values (5, 'Musical Instruments', 'Amplifier', 5000, 100, 50, 50, 20);
insert into public.item (id_item, category, description, price, width, height, length, weight) values (6, 'Accessories', 'Cable', 30, 10, 10, 10, 0.9);

create table public.coupon (
  code text,
  percentage numeric,
  expire_date timestamp,
  primary key (code)
);

insert into public.coupon (code, percentage, expire_date) values ('VALE20', 20, '2023-10-10T10:00:00');
insert into public.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table public.order (
  id_order serial,
  coupon text,
  code text,
  cpf text,
  issue_date timestamp,
  freight numeric,
  sequence integer,
  total numeric,
  primary key (id_order)
);

create table public.order_item (
  id_order integer,
  id_item integer,
  price numeric,
  quantity integer,
  primary key (id_order, id_item)
);

create table public.stock_entry (
  id_stock_entry serial,
  id_item integer,
  operation text,
  quantity integer,
  date timestamp,
  primary key (id_stock_entry)
);
