class Boid {
  constructor() {
    this.posicion = createVector(random(width), random(height));
    this.velocidad = p5.Vector.random2D();
    this.velocidad.setMag(random(2, 5));
    this.aceleracion = createVector();
    this.fuerzaMaxima = 0.1;
    this.velocidadMaxima = 5;
    this.r = 2;
    this.ColorBase = color(0, 30, 30);
  }

  bordes() {
    if (this.posicion.x > width + 10) {
      this.posicion.x = -10;
    } else if (this.posicion.x < -10) {
      this.posicion.x = width + 10;
    }

    if (this.posicion.y > height + 10) {
      this.posicion.y = -10;
    } else if (this.posicion.y < -10) {
      this.posicion.y = height + 10;
    }
  }

  alinear(boids) {
    let radio = 49;
    let deseo = createVector();
    let total = 0;
    for (let otro of boids) {
      let d = dist(
        this.posicion.x,
        this.posicion.y,
        otro.posicion.x,
        otro.posicion.y
      );
      if (otro != this && d < radio) {
        deseo.add(otro.velocidad);
        total++;
      }
    }
    if (total > 0) {
      deseo.div(total);
      deseo.setMag(this.velocidadMaxima);
      deseo.sub(this.velocidad);
      deseo.limit(this.fuerzaMaxima);
    }
    return deseo;
  }

  conjuntar(boids) {
    let radio = 50;
    let deseo = createVector();
    let total = 0;
    for (let otro of boids) {
      let d = dist(
        this.posicion.x,
        this.posicion.y,
        otro.posicion.x,
        otro.posicion.y
      );
      if (otro != this && d < radio) {
        deseo.add(otro.posicion);
        total++;
      }
    }
    if (total > 0) {
      deseo.div(total);
      deseo.sub(this.posicion);
      deseo.setMag(this.velocidadMaxima);
      deseo.sub(this.velocidad);
      deseo.limit(this.fuerzaMaxima);
    }
    return deseo;
  }

  separacion(boids) {
    let radio = 100;
    let deseo = createVector();
    let total = 0;
    for (let otro of boids) {
      let d = dist(
        this.posicion.x,
        this.posicion.y,
        otro.posicion.x,
        otro.posicion.y
      );
      if (otro != this && d < radio) {
        let diferencia = p5.Vector.sub(this.posicion, otro.posicion);
        diferencia.div(d);
        deseo.add(diferencia);
        total++;
      }
    }
    if (total > 0) {
      deseo.div(total);
      // deseo.sub(this.posicion);
      deseo.setMag(this.velocidadMaxima);
      deseo.sub(this.velocidad);
      deseo.limit(this.fuerzaMaxima);
    }
    return deseo;
  }

  flock(boids) {
    let alineacion = this.alinear(boids);
    let conjuntar = this.conjuntar(boids);
    let separacion = this.separacion(boids);

    this.aceleracion.add(alineacion);
    this.aceleracion.add(conjuntar);
    this.aceleracion.add(separacion);
  }

  actualizar() {
    this.posicion.add(this.velocidad);
    this.velocidad.add(this.aceleracion);
    this.velocidad.limit(this.velocidadMaxima);

    this.aceleracion.mult(0);
  }

  cambiarColor(colorNuevo) {
    this.ColorBase = colorNuevo;
  }

  dibujar() {
    push();
    stroke(this.ColorBase);
    strokeWeight(10);
    let teta = this.velocidad.heading() + radians(90);
    translate(this.posicion.x, this.posicion.y);
    rotate(teta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
