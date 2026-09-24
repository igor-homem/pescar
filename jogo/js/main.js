// ========================================
// MAIN.JS
// Configuração principal do Phaser 3
// ========================================

// Cenas do jogo
import MenuScene from './scenes/MenuScene.js';
import CharacterSelectScene from './scenes/CharacterSelectScene.js';
import RoomScene from './scenes/RoomScene.js';
import PCBuildScene from './scenes/PCBuildScene.js';


// ========================================
// CONFIGURAÇÃO DO PHASER
// ========================================

const config = {

    // Renderização
    type: Phaser.AUTO,

    // Elemento HTML onde o Phaser será criado
    parent: 'game-container',

    // Fundo padrão
    backgroundColor: '#111111',


    // ====================================
    // FÍSICA
    // ====================================

    physics: {

        default: 'arcade',

        arcade: {
            gravity: {
                y: 0
            },

            debug: false
        }
    },


    // ====================================
    // CENAS
    // ====================================

    scene: [

        // 1. Menu inicial
        MenuScene,

        // 2. Escolha do personagem
        CharacterSelectScene,

        // 3. Sala
        RoomScene,

        // 4. Atividade de montagem do PC
        PCBuildScene

    ],


    // ====================================
    // ESCALA
    // ====================================

    scale: {

        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH

    },


    // ====================================
    // INPUT
    // ====================================

    input: {

        keyboard: true,

        mouse: true,

        touch: true

    }

};


// ========================================
// CRIA O JOGO
// ========================================

const game = new Phaser.Game(config);


// ========================================
// OPCIONAL
// Disponibiliza o jogo globalmente
// ========================================

window.game = game;