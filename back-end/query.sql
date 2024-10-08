ALTER TABLE users SET password = $2 WHERE username = $1;

select * from scores;
select * from users;
select * from keys_vn;
select * from question_keys;

insert into scores (user_id, score) values (23, 5)
insert into keys_vn (key) values ('táo')
insert into question_keys (word, key_id) values ('apple', 1)

delete from users where user_id = 22

SELECT * FROM users ORDER BY random() LIMIT 1;

SELECT q.word, k.key
FROM question_keys q
JOIN keys_vn k ON q.key_id = k.key_id
