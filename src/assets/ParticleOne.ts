import EffectOne from "./EffectOne";

export default class ParticleOne {
    x: number;
    y: number;
    effect: EffectOne;
    speedX: number;
    speedY: number;
    history: [{x: number, y: number}];
    maxLength: number;
    angle: number;
    newAngle: number;
    angleCorrection: number;
    speedModifier: number;
    timer: number;
    color: string;
    colors: string[];
  
    constructor(effect: EffectOne) {
      this.effect = effect;
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
      this.speedX = 0;
      this.speedY = 0;
      this.speedModifier = Math.floor(Math.random() * 2 + 1);
      this.history = [{x: this.x, y: this.y}];
      this.maxLength = Math.floor(Math.random() * 20 + 6);
      this.angle = 0;
      this.newAngle = 0;
      this.angleCorrection = Math.random() * 0.8 + 0.01;
      this.timer = this.maxLength * 2;
      this.colors = ['#4c085e', '#6d1e82', '#9543ab', '#c47ed6', '#c90e40'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    update() {
      this.timer--;
      if (this.timer >= 1) {
        const x = Math.floor(this.x / this.effect.cellSize);
        const y = Math.floor(this.y / this.effect.cellSize);
        const index = y * this.effect.cols + x;
        
        if(this.effect.flowField[index]) {
          this.newAngle = this.effect.flowField[index].colorAngle;
          if ( this.angle > this.newAngle) {
            this.angle -= this.angleCorrection;
          } else if ( this.angle < this.newAngle) {
            this.angle += this.angleCorrection;
          } else {
            this.angle = this.newAngle;
          }
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
      let attemps = 0;
      let resetSuccess = false;

      while (attemps < 10 && ! resetSuccess) {
        attemps++;
        const testIndex = Math.floor(Math.random() * this.effect.flowField.length);
        if (this.effect.flowField[testIndex].alpha > 0) {
          this.x = this.effect.flowField[testIndex].x;
          this.y = this.effect.flowField[testIndex].y;
          this.history = [{x: this.x, y: this.y}];
          this.timer = this.maxLength * 2;
          resetSuccess = true;
        }
      }
      if (!resetSuccess) {
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.history = [{x: this.x, y: this.y}];
        this.timer = this.maxLength * 2;
      }
    }
  }