function Line(x, y, radius, spacing, color, speed, orient) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.spacing = spacing;
  this.spacing2 = spacing * (Math.random() * 2);
  this.color = color;
  this.speed = speed;
  this.rotation = 0;
  this.orientation = orient;
  this.lineWidth = 5 + Math.random() * 10;
}

Line.prototype.draw = function(ctx) {
  ctx.save();
  ctx.lineWidth = this.lineWidth;
  ctx.lineCap = 'round';
  ctx.setLineDash([this.spacing, this.spacing2]);
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation * 180 / Math.PI)
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.restore();
}

function Rainbow() {
  this.lines = [];
  this.colors = ['#f1c40f', '#f39c12', '#e67e22', '#d35400', '#e74c3c', '#c0392b'];
}

Rainbow.prototype = {
  constructor: Rainbow,
  init: function() {
    this.populateLines(width / 3, width / 50);
  },
  populateLines: function(num, spacing) {
    var i, line, orientCounter = 0, len = this.colors.length - 1;
    for (i = 0; i <= num; i += spacing) {
      if (orientCounter % 2 == 0) {
        line = new Line(width / 2, height, i, 10 + Math.random() * 50, this.colors[Math.floor(Math.random() * len)], 0.0001 + Math.random() * 0.0001, 1);
      } else if (orientCounter % 2 !== 0) {
        line = new Line(width / 2, height, i, 10 + Math.random() * 50, this.colors[Math.floor(Math.random() * len)], 0.0001 + Math.random() * 0.0001, 0);
      }
      orientCounter++;
      this.lines.push(line);
    }
  },
  render: function(ctx) {
    this.lines.forEach(renderLine);

    function renderLine(line) {
      if (line.orientation == 1) {
        line.rotation += line.speed;
      } else if (line.orientation == 0) {
        line.rotation -= line.speed;
      }
      line.draw(ctx);
    }


  }
}

var canvas, ctx, width, height, rainbow;

init();
function init() {
  canvas = document.getElementById('bottomCanvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  rainbow = new Rainbow();

  rainbow.init(width, height);

  ctx.fillStyle = '#FFF';
  renderFrame();
}

function renderFrame() {
  window.requestAnimationFrame(renderFrame, canvas);
  ctx.fillRect(0, 0, width, height);
  rainbow.render(ctx);
}