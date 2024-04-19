export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'playerTexture')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
    this.body.setGravityY(300) // Adjust gravity to fit your game's feel
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.setVelocityX(-160)
    } else if (cursors.right.isDown) {
      this.setVelocityX(160)
    } else {
      this.setVelocityX(0)
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330)
    }
  }
}
