export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyTexture')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
    this.setVelocityX(50)
  }

  update() {
    // Example: Turn around when hitting world bounds
    if (this.body.blocked.right || this.body.blocked.left) {
      this.setVelocityX(-this.body.velocity.x)
    }
  }
}
