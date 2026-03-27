import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="w-full px-6 lg:px-10">
      <h1>404</h1>
      <p className="lead">Страница не найдена.</p>
      <p className="muted">
        <Link to="/">Вернуться на главную</Link>
      </p>
    </section>
  );
}
