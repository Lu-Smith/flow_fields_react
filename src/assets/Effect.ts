import Particle from "./Particle";

export default class Effect {
    width: number;
    height: number;
    particles: Particle[];
    numberOfParticles: number; 
    cellSize: number;
    rows: number;
    cols: number;
    flowField: number[];
    curve: number;
    zoom: number;
    debug: boolean;
    canvas: HTMLCanvasElement;
  
      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height =this.canvas. height;
        this.particles = [];
        this.numberOfParticles = 1600;
        this.cellSize = 20;
        this.rows = 0;
        this.cols = 0;
        this.flowField = [];
        this.curve = 8.5;
        this.zoom = 0.2;
        this.debug = false;
        this.init();
  
        window.addEventListener('keydown', e => {
          if (e.key === 'd' ) this.debug = !this.debug;
        })
  
        window.addEventListener('resize', e => {
          if (e.target instanceof Window) {
            this.resize(e.target.innerWidth, e.target.innerHeight);
          }
        })
      }
      init() {
        //create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
        for (let y = 0; y <this.rows; y++) {
          for ( let x = 0; x <= this.cols; x++) {
            const angle= (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) + this.curve;
            this.flowField.push(angle);
          }
        }
        //create particles
        this.particles = [];
        for( let i = 0; i < this.numberOfParticles; i++) {
          this.particles.push(new Particle(this));
        }
      }
      drawGrid(context: CanvasRenderingContext2D) {
        context.save();
        context.strokeStyle = 'red';
        context.lineWidth = 0.4;
        for ( let c = 0; c < this.cols; c++) {
          context.beginPath();
          context.moveTo(this.cellSize * c, 0);
          context.lineTo(this.cellSize * c, this.height);
          context.stroke();
        }
        for ( let r = 0; r < this.rows; r++) {
          context.beginPath();
          context.moveTo(0, this.cellSize * r);
          context.lineTo(this.width, this.cellSize * r);
          context.stroke();
        }
        context.restore();
      }
      resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height =this.canvas. height;
        this.init();
      }
      render(context: CanvasRenderingContext2D){
        if (this.debug) this.drawGrid(context);
        this.particles.forEach(particle => {
          particle.draw(context);
          particle.update();
        })
      }
  }
  