// c:\Users\power\Desktop\Repos\fighttter\client\common\classes.js

class sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framemax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framemax = framemax;
    this.framecurrent = 1;
    this.framelapsed = 0;
    this.framehold = 5;
    this.offset = offset;
  }

  draw() {
    if (!this.image) return;
    C.drawImage(
      this.image,
      this.framecurrent * (this.image.width / this.framemax),
      0,
      this.image.width / this.framemax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framemax) * this.scale,
      this.image.height * this.scale
    );

    if (this.enemy) {
      C.fillStyle = "red";
      C.fillRect(this.position.x, this.position.y - 40, this.no, 10);
      C.fillStyle = "green";
      C.fillRect(this.position.x, this.position.y - 40, this.health, 10);
    }
  }

  animateframe() {
    this.framelapsed++;
    if (this.framelapsed % this.framehold === 0) {
      if (this.framecurrent < this.framemax - 1) {
        this.framecurrent++;
      } else {
        this.framecurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateframe();
  }
}

class Fighter extends sprite {
  constructor({
    position,
    velocity = { x: 0, y: 0 },
    color = "red",
    imageSrc,
    scale = 1,
    framemax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackbox = { offset: {}, width: undefined, height: undefined },
    enemy,
    health,
    no,
    damage,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framemax,
      offset,
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastkey = "";
    this.attackbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackbox.offset,
      width: attackbox.width,
      height: attackbox.height,
    };
    this.color = color;
    this.isattacking = false;
    this.health = health;
    this.framecurrent = 0;
    this.framelapsed = 0;
    this.framehold = 5;
    this.sprites = sprites;
    this.dead = false;
    this.enemy = enemy;
    this.no = no;
    this.damage = damage;

    for (const Sprite in this.sprites) {
      if (this.sprites[Sprite].imageSrc) {
        this.sprites[Sprite].image = new Image();
        this.sprites[Sprite].image.src = this.sprites[Sprite].imageSrc;
      }
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateframe();

    this.attackbox.position.x = this.position.x + this.attackbox.offset.x;
    this.attackbox.position.y = this.position.y + this.attackbox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += gravity;
  }

  attack2() {
    this.switchsprite("attack2");
    this.isattacking = true;
  }

  attack1() {
    this.switchsprite("attack1");
    this.isattacking = true;
  }

  takehit() {
    this.switchsprite("takehit");
    this.health -= this.damage;
    if (this.health <= 0) {
      this.switchsprite("death");
    }
  }

  switchsprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framecurrent === this.sprites.death.framemax - 1)
        this.dead = true;
      return;
    }

    if (
      (this.image === this.sprites.attack1.image &&
        this.framecurrent < this.sprites.attack1.framemax - 1) ||
      (this.image === this.sprites.attack2.image &&
        this.framecurrent < this.sprites.attack2.framemax - 1) ||
      (this.image === this.sprites.takehit.image &&
        this.framecurrent < this.sprites.takehit.framemax - 1)
    ) {
      return;
    }

    if (this.sprites[sprite] && this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.framemax = this.sprites[sprite].framemax;
      this.framecurrent = 0;
    }
  }
}
