export default function Content(){
    return(
        <div>
        <section id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-3 ab">
            <i className="bi bi-tools"></i>
            <h4>Aparatura de ultima generatie</h4>
          </div>
          <div className="col-md-3 ab">
            <i className="bi bi-chat-dots"></i>
            <h4>Suport rapid atat telefonic cat si pe Email sau Whatsapp</h4>
          </div>
          <div className="col-md-3 ab">
            <i className="bi bi-award"></i>
            <h4>Personal calificat si cu experienta</h4>
          </div>
        </div>
        <h1>Despre Noi</h1>
        <div className="col-md-10 offset-md-1">
          <p>
            Dolor sit amet, consectetur adipiscing elit, dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </p>
        </div>
      </div>
    </section>
        <section id="servicii" className="servicii">
        <div className="container">
          <h1>Ce facem?</h1>
          <div className="row justify-content-center">
            <p>
              Realizăm inspecții și remedieri pentru toate mărcile și tipurile de
              vehicule, asigurând garanția serviciilor prestate și concentrându-ne
              pe minimizarea cheltuielilor pentru clienții noștri.
            </p>
            <div className="col-md-5 serv">
              <img src="/img/atelr.jpg" />
              <div className="overlay">
                <h4>Revizii tehnice complete</h4>
              </div>
            </div>
            <div className="col-md-5 serv">
              <img src="/img/atelr.jpg" />
              <div className="overlay">
                <h4>Diagnoza computerizata</h4>
              </div>
            </div>
            <div className="col-md-5 serv">
              <img src="/img/atelr.jpg" />
              <div className="overlay">
                <h4>Service instalatii climatizare</h4>
              </div>
            </div>
            <div className="col-md-5 serv">
              <img src="/img/atelr.jpg" />
              <div className="overlay">
                <h4>Tinichigerie si Vopsitorie</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}