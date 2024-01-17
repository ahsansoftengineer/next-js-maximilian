import sql from 'better-sqlite3';
const db = sql('meals.db');



export function modify(sql) {
  return db.prepare(sql).run();
}
export function get(sql) {
  return db.prepare(sql).get();
}
export function gets(sql) {
  return db.prepare(sql).all();
}