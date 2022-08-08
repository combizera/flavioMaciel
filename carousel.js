export class Carousel {
  constructor(ant, prox, listProdutos, nav) {
    this.ant = document.querySelector(ant);
    this.prox = document.querySelector(prox);
    this.listProdutos = document.querySelector(listProdutos);
    this.nav = document.querySelector(nav);

    this.slides = this.getListaSlides();
    this.indicadores = this.getListaIndicadores();
    this.tamanhoSlide = this.getTamanhoSlide();

    this.indiceDoSlideAtual = 0;

    this.prox.addEventListener("click", this.proximoSlide.bind(this));

    this.ant.addEventListener("click", this.slideAnterior.bind(this));

    this.nav.addEventListener("click", this.pularParaSlide.bind(this));

    this.preparaSlides();
  }

  getListaSlides() {
    return Array.from(this.listProdutos.children);
  }

  getListaIndicadores() {
    return Array.from(this.nav.children);
  }

  getTamanhoSlide() {
    return this.slides[0].getBoundingClientRect().width;
  }

  getSlideAtual() {
    return this.slides[this.indiceDoSlideAtual];
  }

  getIndiceAtual() {
    return this.indicadores[this.indiceDoSlideAtual];
  }

  proximoSlide() {
    let proximaPosicao = this.indiceDoSlideAtual + 1;
    if (proximaPosicao > this.slides.length - 1) {
      proximaPosicao = 0;
    }

    this.vaParaSlide(proximaPosicao);
  }

  slideAnterior() {
    let posicaoAnterior = this.indiceDoSlideAtual - 1;
    if (posicaoAnterior < 0) {
      posicaoAnterior = this.slides.length - 1;
    }
    this.vaParaSlide(posicaoAnterior);
  }

  vaParaSlide(posicao) {
    const indicadorAtual = this.getIndiceAtual();
    this.indiceDoSlideAtual = posicao;
    const indicadorSelecionado = this.getIndiceAtual();

    this.scrollParaSlide(this.getSlideAtual());
    this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);
  }

  scrollParaSlide(slideSelecionado) {
    this.listProdutos.style.transform =
      "translateX(-" + slideSelecionado.style.left + ")";
  }

  atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
    indicadorAtual.classList.remove("carousel__indicador-ativo");

    indicadorSelecionado.classList.add("carousel__indicador-ativo");
  }

  pularParaSlide(evento) {
    if (evento.target === evento.currentTarget) return;
    const indicadorSelecionado = evento.target.getAttribute("data-indicador");
    this.vaParaSlide(parseInt(indicadorSelecionado));
  }

  preparaSlides() {
    this.slides.forEach((slide, i) => {
      slide.style.left = this.tamanhoSlide * i + "px";
    });
  }
}
