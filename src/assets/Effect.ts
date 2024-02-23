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
    context: CanvasRenderingContext2D;
  
      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = ctx;
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
        this.debug = true;
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
      drawText() {
        this.context.font = '500px Impact';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('JS', this.width * 0.5, this.height * 0.5);
      }
      init() {
        //create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        //draw text
        this.drawText();

        //scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height);
        console.log(pixels);

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
      drawGrid() {
        this.context.save();
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 0.4;
        for ( let c = 0; c < this.cols; c++) {
          this.context.beginPath();
          this.context.moveTo(this.cellSize * c, 0);
          this.context.lineTo(this.cellSize * c, this.height);
          this.context.stroke();
        }
        for ( let r = 0; r < this.rows; r++) {
          this.context.beginPath();
          this.context.moveTo(0, this.cellSize * r);
          this.context.lineTo(this.width, this.cellSize * r);
          this.context.stroke();
        }
        this.context.restore();
      }
      resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height =this.canvas. height;
        this.init();
      }
      render(){
        if (this.debug) {
          this.drawGrid();
          this.drawText();
        } 
        this.particles.forEach(particle => {
          particle.draw(this.context);
          particle.update();
        })
      }
  }
  