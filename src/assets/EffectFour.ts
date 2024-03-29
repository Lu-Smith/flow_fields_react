import ParticleFour from "./ParticleFour";

export default class EffectFour {
    width: number;
    height: number;
    particles: ParticleFour[];
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
        this.numberOfParticles = 3500;
        this.cellSize = 4;
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
        this.context.font = '200px Impact';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        const gradient1 = this.context.createLinearGradient(0, 0, this.width, this.height);
        gradient1.addColorStop(0.2, 'rgb(155, 50, 255)');
        gradient1.addColorStop(0.4, 'rgb(50, 255, 0)');
        gradient1.addColorStop(0.6, 'rgb(255, 155, 255)');
        gradient1.addColorStop(0.8, 'rgb(155, 255, 50)');

        this.context.fillStyle = gradient1;
        this.context.fillText('LOVE', this.width * 0.5, this.height * 0.5, this.width * 0.85);
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
          this.particles.push(new ParticleFour(this));
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
  