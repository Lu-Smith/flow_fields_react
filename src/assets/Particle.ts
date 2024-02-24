import Effect from "./Effect";

export default class Particle {
    x: number;
    y: number;
    effect: Effect;
    speedX: number;
    speedY: number;
    history: [{x: number, y: number}];
    maxLength: number;
    angle: number;
    speedModifier: number;
    timer: number;
    color: string;
    colors: string[];
  
    constructor(effect: Effect) {
      this.effect = effect;
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
      this.speedX = 0;
      this.speedY = 0;
      this.speedModifier = Math.floor(Math.random() * 5 + 1);
      this.history = [{x: this.x, y: this.y}];
      this.maxLength = Math.floor(Math.random() * 200 + 10);
      this.angle = 0;
      this.timer = this.maxLength * 2;
      this.colors = ['#025919', '#128230', '#42b031', '#6ad15a'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    update() {
      this.timer--;
      if (this.timer >= 1) {
        const x = Math.floor(this.x / this.effect.cellSize);
        const y = Math.floor(this.y / this.effect.cellSize);
        const index = y * this.effect.cols + x;
        
        if(this.effect.flowField[index]) {
          this.angle = this.effect.flowField[index].colorAngle;
        }

        this.speedX = Math.cos(this.angle);
        this.speedY = Math.sin(this.angle);
        this.x += this.speedX * this.speedModifier;
        this.y += this.speedY * this.speedModifier;
    
        this.history.push({x: this.x, y: this.y});
        if( this.history.length > this.maxLength) {
          this.history.shift();
        }
      } else if (this.history.length > 1){
        this.history.shift();
      } else {
        this.reset();
      }
    }
    draw(context: CanvasRenderingContext2D) {
      context.beginPath();
      context.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 0; i < this.history.length; i++) {
        context.lineTo(this.history[i].x, this.history[i].y);
      }
      context.strokeStyle = this.color;
      context.stroke();
    }
    reset() {
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
      this.history = [{x: this.x, y: this.y}];
      this.timer = this.maxLength * 2;
    }
  }