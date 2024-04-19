'use client'

import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser'

const PhaserGame = () => {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current) {
      const gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.CANVAS,
        width: 800,
        height: 600,
        parent: gameRef.current,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: {
          preload: function () {
            // No assets to load
          },
          create: function () {
            this.player = this.add.rectangle(400, 300, 50, 50, 0x00ff00) // Adding a green square
            this.cursors = this.input.keyboard.createCursorKeys()
          },
          update: function () {
            if (this.cursors.left.isDown) {
              this.player.x -= 5
            } else if (this.cursors.right.isDown) {
              this.player.x += 5
            }
            if (this.cursors.up.isDown) {
              this.player.y -= 5
            } else if (this.cursors.down.isDown) {
              this.player.y += 5
            }
          },
        },
      }

      const game = new Phaser.Game(gameConfig)

      return () => {
        game.destroy(true)
      }
    }
  }, [])

  return <div ref={gameRef} style={{ maxWidth: '800px', maxHeight: '600px' }} />
}

export default PhaserGame
