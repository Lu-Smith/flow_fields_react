import Particle from "./Particle";

export default class Effect {
    width: number;
    height: number;
    particles: Particle[];
    numberOfParticles: number; 
    cellSize: number;
    rows: number;
    cols: number;
    flowField: { x: number, y: number, alpha: number, colorAngle: number}[];
    debug: boolean;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
  
      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.canvas.setAttribute('willReadFrequently', 'true');
        this.context = ctx;
        this.width = this.canvas.width;
        this.height =this.canvas. height;
        this.particles = [];
        this.numberOfParticles = 2800;
        this.cellSize = 5;
        this.rows = 0;
        this.cols = 0;
        this.flowField = [];
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
      drawText() {
        this.context.font = '250px Impact';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        const gradient3 = this.context.createRadialGradient(this.width * 0.5, this.height * 0.5, 10, this.width * 0.5, this.height * 0.5, this.width);
        gradient3.addColorStop(0.15, 'rgb(0, 100, 255)');
        gradient3.addColorStop(0.35, 'rgb(200, 255, 0)');
        gradient3.addColorStop(0.7, 'rgb(50, 0, 255)');
        gradient3.addColorStop(0.9, 'rgb(0, 50, 0)');

        this.context.fillStyle = gradient3;
        this.context.fillText('CAT', this.width * 0.5, this.height * 0.5, this.width * 0.85);
      }
      init() {
        //create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        //draw text
        this.drawText();

        //scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data;
     
        for (let y = 0; y < this.height; y+= this.cellSize) {
          for ( let x = 0; x < this.width; x += this.cellSize) {
            const index = (y * this.width + x) * 4;
            const red = pixels[index];
            const green = pixels[index + 1];
            const blue = pixels[index + 2];
            const alpha = pixels[index + 3];
            const greyscale = ( red + green + blue) / 3;
            const colorAngle = parseFloat(((greyscale/255) * 6.28).toFixed(2));
            this.flowField.push({
              x: x, 
              y: y,
              alpha: alpha,
              colorAngle: colorAngle
            });
          }
        }
        //create particles
        this.particles = [];
        for( let i = 0; i < this.numberOfParticles; i++) {
          this.particles.push(new Particle(this));
        }
        this.particles.forEach(particle => particle.reset());
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
  