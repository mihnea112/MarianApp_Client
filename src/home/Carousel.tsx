import Carousel from 'react-bootstrap/Carousel';
export default function CarouselHero() {
  return (
    <section className="carousel">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="/img/service.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Transformare digitală în industria auto</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="/img/service.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Eficiență și transparență</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="/img/service.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Inovație și competitivitate</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
