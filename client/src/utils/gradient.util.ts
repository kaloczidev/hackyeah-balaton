export class GradientUtil {
  private canvas: HTMLCanvasElement;
  private ctx;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  generate(startColor: string, endColor: string, width: number = 600, height: number = 300) {
    this.canvas.width = width;
    this.canvas.height = height;

    const gradientFill = this.ctx.createLinearGradient(width / 2, 0, height / 2, 0);
    gradientFill.addColorStop(0, startColor);
    gradientFill.addColorStop(1, endColor);
    return gradientFill;
  }
}
