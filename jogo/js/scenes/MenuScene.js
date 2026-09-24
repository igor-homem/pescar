// ========================================
// MENUSCENE.JS
// Menu inicial do jogo
// ========================================

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() {

        this.load.image(
            'background_menu',
            'assets/menu_background.png'
        );

    }


    // ====================================
    // CREATE
    // ====================================

    create() {

        const width = this.scale.width;
        const height = this.scale.height;


        // ====================================
        // FUNDO
        // ====================================

        this.add.image(
            width / 2,
            height / 2,
            'background_menu'
        )
        .setDisplaySize(width, height);


        // ====================================
        // TÍTULO
        // ====================================

        this.add.text(
            width / 2,
            180,
            'MONTAGEM DE PC',
            {
                fontFamily: 'Arial',
                fontSize: '56px',
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }
        )
        .setOrigin(0.5);


        // ====================================
        // SUBTÍTULO
        // ====================================

        this.add.text(

            width / 2,

            250,

            'Aprenda a montar um computador',

            {
                fontFamily: 'Arial',
                fontSize: '26px',
                color: '#fff',
                align: 'center',

                // Borda
                stroke: '#000000',
                strokeThickness: 5

            }

        )
        .setOrigin(0.5);



        // ====================================
        // BOTÃO JOGAR
        // ====================================

        const playButton = this.add.rectangle(
            width / 2,
            390,
            280,
            80,
            0x2563eb
        );

        playButton.setInteractive({
            useHandCursor: true
        });


        // ====================================
        // TEXTO DO BOTÃO
        // ====================================

        const playText = this.add.text(
            width / 2,
            390,
            'JOGAR',
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                fontStyle: 'bold',
                color: '#ffffff'
            }
        )
        .setOrigin(0.5);


        // ====================================
        // EFEITO DO BOTÃO
        // ====================================

        playButton.on('pointerover', () => {

            playButton.setFillStyle(0x3b82f6);

            playText.setScale(1.05);

        });


        playButton.on('pointerout', () => {

            playButton.setFillStyle(0x2563eb);

            playText.setScale(1);

        });


        // ====================================
        // CLIQUE
        // ====================================

        playButton.on('pointerdown', () => {

            this.scene.start(
                'CharacterSelectScene'
            );

        });


        // ====================================
        // INFORMAÇÃO
        // ====================================

        this.add.text(
            width / 2,
            570,
            'Use o teclado para controlar o personagem',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#fff',
                align: 'center',

                // Borda 
                stroke: '#000000', 
                strokeThickness: 3

            }
        )
        .setOrigin(0.5);

    }

}