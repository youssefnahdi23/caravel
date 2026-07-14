export function Arrow({ down = false }) {
  return <svg viewBox="0 0 24 24" className={`arrow${down ? ' down' : ''}`} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function Spark() {
  return <svg viewBox="0 0 32 32" className="spark" aria-hidden="true"><path d="M16 1c.9 9.4 5.6 14.1 15 15-9.4.9-14.1 5.6-15 15C15.1 21.6 10.4 16.9 1 16 10.4 15.1 15.1 10.4 16 1Z" /></svg>;
}
