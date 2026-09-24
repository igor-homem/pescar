// ========================================
// CHARACTERSELECTSCENE.JS
// Escolha do personagem
// ========================================

export default class CharacterSelectScene extends Phaser.Scene {

    constructor() {
        super('CharacterSelectScene');
    }

    // ====================================
    // PRELOAD
    // ====================================

    preload() { 

        this.load.image( 
            'joao', 
            'assets/joao_selecao.png' 
        ); 
        this.load.image( 
            'vitoria', 
            'assets/vitoria_selecao.png' 
        ); 
        this.load.image( 
            'background_image', 
            'assets/classroom_background.png' 
        ); 
        this.load.audio(
            'musicaSelecao',
            'audio/retro-bgm-chan-select-your-name-516295.mp3'
        );
    }

    // ====================================
    // CREATE
    // ====================================

    create() {

        this.musica = this.sound.add(
            'musicaSelecao',
            {
                volume: 0.5,
                loop: true
            }
        );

        this.musica.play();

        const width = this.scale.width;
        const height = this.scale.height;

        // Personagem atualmente selecionado
        this.selectedCharacter = null;

        // Guarda os cards para podermos resetá-los 
        this.characterCards = [];


        // ====================================
        // FUNDO
        // ====================================

        this.add.image(
            width / 2,
            height / 2,
            'background_image'
        ).setDisplaySize(
            width,
            height
        );

        // ====================================
        // TÍTULO
        // ====================================

        this.add.text(
            width / 2,
            80,
            'ESCOLHA SEU PERSONAGEM',
            {
                fontFamily: 'Arial',
                fontSize: '42px',
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
            130,
            'Os personagens possuem as mesmas características',
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#fff',
                align: 'center'
            }
        )
        .setOrigin(0.5);


        const centerX = width / 2;

        // Distância entre o centro da tela e cada personagem
        const cardOffset = Math.min(width * 0.19, 240);

        // Personagem 1
        this.createCharacterCard(
            centerX - cardOffset,
            height * 0.49,
            'personagem1',
            'JOÃO MESQUITA',
            'joao'
        );

        // Personagem 2
        this.createCharacterCard(
            centerX + cardOffset,
            height * 0.49,
            'personagem2',
            'VITÓRIA TEIXEIRA',
            'vitoria'
        );


        // ====================================
        // BOTÃO JOGAR
        // ====================================

        this.playButton = this.add.rectangle(
            width / 2,
            height * 0.86,
            320,
            65,
            0x333333
        );

        this.playButton.setInteractive({
            useHandCursor: true
        });


        this.playText = this.add.text(
            width / 2,
            height * 0.86,
            'ESCOLHA UM PERSONAGEM',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                fontStyle: 'bold',
                color: '#777777',
                align: 'center'
            }
        )
        .setOrigin(0.5);


        // ====================================
        // BOTÃO
        // ====================================

        this.playButton.on(
            'pointerdown',
            () => {

                if (!this.selectedCharacter) {
                    return;
                }

                // Para a música da seleção
                if (this.musica) {
                    this.musica.stop();
                }

                // Vai para a próxima cena
                this.scene.start('RoomScene', {
                    character: this.selectedCharacter === 'personagem1'
                        ? 'João'
                        : 'Vitória'
                });
            }
        );


        // ====================================
        // VOLTAR
        // ====================================

        const backButton = this.add.text(
            60,
            40,
            '← VOLTAR',
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#fff'
            }
        );

        backButton.setInteractive({
            useHandCursor: true
        });

        backButton.on('pointerdown', () => {

             // Para a música atual
            if (this.musica) {
                this.musica.stop();
            }

            this.scene.start('MenuScene');

        });

    }


    // ====================================
    // CRIAR CARD
    // ====================================

    createCharacterCard(
        x,
        y,
        characterId,
        characterName,
        imageKey
    ) {

        // ====================================
        // CARD
        // ====================================

        const card = this.add.graphics();

        card.cardX = x;
        card.cardY = y;
        card.cardWidth = 300;
        card.cardHeight = 360;

        card.setPosition(x, y);

        // Desenha o card
        this.drawCard(
            card,
            0x202020,
            0x444444,
            3
        );

        // Área clicável
        const hitArea = new Phaser.Geom.Rectangle(
            -150,
            -180,
            300,
            360
        );

        card.setInteractive(
            hitArea,
            Phaser.Geom.Rectangle.Contains,
            {
                useHandCursor: true
            }
        );

        // Guarda o card
        this.characterCards.push(card);


        // ====================================
        // ÁREA DO PERSONAGEM
        // ====================================

        const characterBox = this.add.graphics();

        this.drawCharacterBox( characterBox, 0x333333, 0x555555, 2 );

        characterBox.setPosition( x, y - 35 );


        // ==================================== 
        // IMAGEM DO PERSONAGEM 
        // ==================================== 
        
        const characterImage = this.add.image( 
            x, 
            y - 35, 
            imageKey 
        ); 
        characterImage.setDisplaySize( 
            150, 
            170 
        );


        // ====================================
        // NOME
        // ====================================

        this.add.text(
            x,
            y + 90,
            characterName,
            {
                fontFamily: 'Arial',
                fontSize: '25px',
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }
        )
        .setOrigin(0.5);


        // ====================================
        // DESCRIÇÃO
        // ====================================

        this.add.text(
            x,
            y + 130,
            'Características iguais',
            {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#aaaaaa',
                align: 'center'
            }
        )
        .setOrigin(0.5);


        // ====================================
        // CLIQUE NO CARD
        // ====================================

        card.on('pointerdown', () => {

            this.selectCharacter(
                characterId,
                card,
                characterBox
            );

        });


        // ====================================
        // EFEITO AO PASSAR O MOUSE
        // ====================================

        card.on('pointerover', () => {

            if (
                this.selectedCharacter !== characterId
            ) {

                this.drawCard(
                    card,
                    0x292929,
                    0x555555,
                    3
                );

            }

        });


        card.on('pointerout', () => {

            if (
                this.selectedCharacter !== characterId
            ) {

                this.drawCard(
                    card,
                    0x202020,
                    0x444444,
                    3
                );

            }

        });

    }

    // ==================================== 
    // DESENHAR CARD 
    // ==================================== 
    drawCard( card, fillColor, strokeColor, strokeWidth ) {
        card.clear(); 
        // Fundo arredondado 
        card.fillStyle( 
            fillColor, 
            1 
        ); 
        card.fillRoundedRect( 
            -150,
            -180, 
            300, 
            360, 
            20 
        ); 
        // Borda arredondada 
        card.lineStyle( 
            strokeWidth, 
            strokeColor, 
            1 ); 
        card.strokeRoundedRect( 
            -150, 
            -180, 
            300, 
            360, 
            20 
        ); 
    }

    // ==================================== 
    // DESENHAR ÁREA DO PERSONAGEM 
    // ==================================== 
    drawCharacterBox( box, fillColor, strokeColor, strokeWidth ) {
        box.clear(); 
        // Fundo box.fillStyle( fillColor, 1 ); 
        box.fillRoundedRect( -75, -90, 150, 180, 15 ); 
        // Borda 
        box.lineStyle( strokeWidth, strokeColor, 1 ); 
        box.strokeRoundedRect( -75, -90, 150, 180, 15 ); 
    }


    // ====================================
    // SELECIONAR PERSONAGEM
    // ====================================

    selectCharacter(
        characterId,
        selectedCard,
        selectedBox
    ) {

        this.selectedCharacter = characterId;


        // ==================================== 
        // RESETAR TODOS OS CARDS 
        // ==================================== 
        this.characterCards.forEach( (card) => { this.drawCard( card, 0x202020, 0x444444, 3 ); } );


        // ==================================== 
        // DESTACAR CARD SELECIONADO 
        // ==================================== 
        this.drawCard( selectedCard, 0x1d3557, 0x3b82f6, 4 );

        // ==================================== 
        // DESTACAR ÁREA DO PERSONAGEM 
        // ==================================== 
        this.drawCharacterBox( selectedBox, 0x333333, 0x3b82f6, 3 );

        // ====================================
        // ATIVA BOTÃO
        // ====================================

        this.playButton.setFillStyle(
            0x2563eb
        );

        this.playText.setText(
            'JOGAR COM ' +
            (
                characterId === 'personagem1'
                    ? 'JOÂO MESQUITA'
                    : 'VITÓRIA TEIXEIRA'
            )
        );

        this.playText.setColor(
            '#ffffff'
        );

    }

}
