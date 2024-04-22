import "./Footer.css";

function Footer() {
  return (
    <footer className="footer page__footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__subtitle">&copy;2024</p>
        <nav className="footer__links">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
