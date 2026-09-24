export default class RoomScene extends Phaser.Scene {

    constructor() {
        super('RoomScene');
    }

    init(data) {
        // Personagem escolhido na tela anterior
        this.selectedCharacter = data.character || 'João';
        this.playerX = data.playerX ?? 400;
        this.playerY = data.playerY ?? 450;
    }

    preload() {
        this.load.spritesheet( 
            'joaoSprite', 
            'assets/characters/joao_sprite.png',
            { frameWidth: 32, frameHeight: 32 }
        ); 

        this.load.spritesheet( 
            'vitoriaSprite', 
            'assets/characters/vitoria_sprite.png',
            { frameWidth: 32, frameHeight: 32 }
        ); 
        this.load.audio(
            'musicaRoom',
            'audio/dreamy_rabbit-8-bit-game-music-122259.mp3'
        );
        this.load.tilemapTiledJSON(
            'classroomMap',
            'assets/maps/classroom.json'
        );

        this.load.image(
            'classroomTiles',
            'assets/tilesets/classroom.png'
        );
    }

    create() {

        // ==========================================
        // MÚSICA DA SALA
        // ==========================================

        this.roomMusic = this.sound.add('musicaRoom', {
            loop: true,
            volume: 0.5
        });

        this.roomMusic.play();

        // ==========================================
        // CONFIGURAÇÕES DA SALA
        // ==========================================

        this.roomWidth = 1600;
        this.roomHeight = 896;

        // Fundo
        this.add.rectangle(
            this.roomWidth / 2,
            this.roomHeight / 2,
            this.roomWidth,
            this.roomHeight,
            0x20252b
        );

        // Piso
        this.add.rectangle(
            this.roomWidth / 2,
            this.roomHeight / 2 + 40,
            1500,
            780,
            0x343a40
        );

        // ==========================================
        // PAREDES
        // ==========================================

        this.wallTop = this.physics.add.staticImage(
            this.roomWidth / 2,
            60
        )
        .setSize(1500, 40)
        .setVisible(false);

        this.wallBottom = this.physics.add.staticImage(
            this.roomWidth / 2,
            this.roomHeight - 60
        )
        .setSize(1500, 40)
        .setVisible(false);

        this.wallLeft = this.physics.add.staticImage(
            60,
            this.roomHeight / 2
        )
        .setSize(40, 800)
        .setVisible(false);

        this.wallRight = this.physics.add.staticImage(
            this.roomWidth - 60,
            this.roomHeight / 2
        )
        .setSize(40, 800)
        .setVisible(false);

        // ==========================================
        // DECORAÇÃO DA SALA
        // ==========================================

        this.roomNameText = this.add.text(
            this.scale.width / 2,
            30,
            'SALA DE TECNOLOGIA',
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.roomNameText.setScrollFactor(0);
        this.roomNameText.setDepth(100);

        // Mesa
        this.add.rectangle(
            1050,
            420,
            420,
            100,
            0x5b4636
        );

        this.add.rectangle(
            1050,
            470,
            40,
            100,
            0x3a2c22
        );

        this.add.rectangle(
            1410,
            470,
            40,
            100,
            0x3a2c22
        );

        // Computador
        this.add.rectangle(
            1050,
            365,
            180,
            100,
            0x111111
        );

        this.add.rectangle(
            1050,
            365,
            160,
            80,
            0x162d3d
        );

        this.add.text(
            1050,
            365,
            'PC',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#4fc3f7',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Teclado
        this.add.rectangle(
            1050,
            430,
            100,
            25,
            0x222222
        );

        // Cadeira
        this.add.rectangle(
            1050,
            540,
            90,
            90,
            0x1976d2
        );

        this.add.text(
            1050,
            540,
            'CADEIRA',
            {
                fontFamily: 'Arial',
                fontSize: '13px',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // ==========================================
        // ÁREA DE INTERAÇÃO
        // ==========================================

        this.computerX = 1050;
        this.computerY = 540;

        // Área invisível próxima à cadeira
        this.interactionZone = this.add.rectangle(
            this.computerX,
            this.computerY,
            180,
            150,
            0x00ff00,
            0
        );

        // ========================================== 
        // ANIMAÇÕES DOS PERSONAGENS 
        // ========================================== 
        this.createCharacterAnimations();

        // ==========================================
        // PLAYER
        // ==========================================

        const characterTexture = this.selectedCharacter === 'João' ? 'joaoSprite' : 'vitoriaSprite';

        this.player = this.physics.add.sprite(
            this.playerX,
            this.playerY,
            characterTexture,
            4
        );

        // Tamanho visual do personagem 
        this.player.setDisplaySize( 64, 64 );
        
        // Configuração física 
        //this.player.body.setSize( 36, 45 );
        //this.player.body.setOffset( 14, 17 ); 

        this.player.body.setSize(20, 22);
        this.player.body.setOffset(6, 8);
        
        this.player.body.setCollideWorldBounds( true ); 
        // Direção inicial 
        this.playerDirection = 'down';

        // ==========================================
        // COLISÃO COM AS PAREDES
        // ==========================================

        this.physics.add.collider(
            this.player,
            this.wallTop
        );

        this.physics.add.collider(
            this.player,
            this.wallBottom
        );

        this.physics.add.collider(
            this.player,
            this.wallLeft
        );

        this.physics.add.collider(
            this.player,
            this.wallRight
        );

        // ==========================================
        // CONTROLES
        // ==========================================

        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            E: Phaser.Input.Keyboard.KeyCodes.E
        });

        // ==========================================
        // TEXTO DE INTERAÇÃO
        // ==========================================

        this.interactionText = this.add.text(
            0,
            0,
            'E — Sentar e montar PC',
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: '#ffffff',
                backgroundColor: '#111111',
                padding: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }
        );

        this.interactionText.setDepth(100);
        this.interactionText.setVisible(false);

        // ==========================================
        // INFORMAÇÃO DO PERSONAGEM
        // ==========================================
        const characterName = this.selectedCharacter;

        this.characterText = this.add.text(
            30,
            30,
            `Jogador: ${characterName}`,
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ffffff'
            }
        );

        this.characterText
            .setScrollFactor(0)
            .setDepth(100);

        // ==========================================
        // CÂMERA
        // ==========================================

        this.cameras.main.setBounds(
            0,
            0,
            this.roomWidth,
            this.roomHeight
        );

        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );

        // ==========================================
        // MENSAGEM INICIAL
        // ==========================================

        this.instructionText = this.add.text(
            this.roomWidth / 2,
            this.roomHeight - 40,
            'WASD ou SETAS para andar',
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#dddddd'
            }
        ).setOrigin(0.5);

        this.instructionText.setScrollFactor(0);
        this.instructionText.setDepth(100);

        // ==========================================
        // LIMPAR MÚSICA AO SAIR DA CENA
        // ==========================================

        this.events.once('shutdown', () => {

            if (this.roomMusic) {
                this.roomMusic.stop();
                this.roomMusic.destroy();
                this.roomMusic = null;
            }

        });

    }

    // ========================================== 
    // CRIAR ANIMAÇÕES 
    // ========================================== 
    createCharacterAnimations() { 
        // ====================================== 
        // JOÃO 
        // ====================================== 
        this.createAnimationsForCharacter('joaoSprite'); 
        // ====================================== 
        // VITÓRIA 
        // ====================================== 
        this.createAnimationsForCharacter('vitoriaSprite'); 
    } 
    
    // ========================================== 
    // ANIMAÇÕES DE UM PERSONAGEM 
    // ========================================== 
    createAnimationsForCharacter(texture) { 
        // ====================================== 
        // DIREITA 
        // Frames 0 → 3 
        // ====================================== 
        this.anims.create({ key: `${texture}-right`, frames: this.anims.generateFrameNumbers( texture, { start: 0, end: 3 } ), frameRate: 8, repeat: -1 }); 
        // ====================================== 
        // BAIXO 
        // Frames 4 → 5 
        // ====================================== 
        this.anims.create({ key: `${texture}-down`, frames: this.anims.generateFrameNumbers( texture, { start: 4, end: 5 } ), frameRate: 6, repeat: -1 });
        // ====================================== 
        // CIMA 
        // Frames 6 → 7 
        // ====================================== 
        this.anims.create({ key: `${texture}-up`, frames: this.anims.generateFrameNumbers( texture, { start: 6, end: 7 } ), frameRate: 6, repeat: -1 }); 
    } 
        
    // ========================================== 
    // UPDATE 
    // ==========================================


    update() {

        if (!this.player || !this.player.body) {
            return;
        }

        const speed = 220;

        // Zera o movimento
        this.player.body.setVelocity(0);

        // ==========================================
        // MOVIMENTO HORIZONTAL
        // ==========================================

        if ( this.cursors.left.isDown || this.keys.A.isDown ) {
            this.player.body.setVelocityX(-speed); 
            // Usa animação para direita 
            this.player.anims.play( `${this.getCharacterTexture()}-right`, true ); 
            // Flip para esquerda 
            this.player.setFlipX(true); 
            this.playerDirection = 'left'; 
        } else if ( this.cursors.right.isDown || this.keys.D.isDown ) {
            this.player.body.setVelocityX(speed); 
            // Animação direita 
            this.player.anims.play( `${this.getCharacterTexture()}-right`, true ); 
            // Remove flip 
            this.player.setFlipX(false); 
            this.playerDirection = 'right'; 
        }

        // ==========================================
        // MOVIMENTO VERTICAL
        // ==========================================

        if ( this.cursors.up.isDown || this.keys.W.isDown ) { 
            this.player.body.setVelocityY(-speed); 
            this.player.anims.play( `${this.getCharacterTexture()}-up`, true ); 
            this.player.setFlipX(false); 
            this.playerDirection = 'up'; 
        } else if ( this.cursors.down.isDown || this.keys.S.isDown ) { 
            this.player.body.setVelocityY(speed); 
            this.player.anims.play( `${this.getCharacterTexture()}-down`, true ); 
            this.player.setFlipX(false); this.playerDirection = 'down'; 
        }

        // ==========================================
        // NORMALIZA VELOCIDADE DIAGONAL
        // ==========================================

        this.player.body.velocity.normalize().scale(speed);

        // ========================================== 
        // PARADO 
        // ========================================== 
        if ( this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 ) { 
            this.player.anims.stop(); 
            this.setIdleFrame(); 
        }

        // ==========================================
        // DISTÂNCIA ATÉ A CADEIRA
        // ==========================================

        const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.computerX,
            this.computerY
        );

        // ==========================================
        // MOSTRAR INTERAÇÃO
        // ==========================================

        if (distance < 120) {

            this.interactionText.setVisible(true);

            this.interactionText.setPosition(
                this.player.x,
                this.player.y - 70
            );

            // ======================================
            // PRESSIONOU E
            // ======================================

            if (
                Phaser.Input.Keyboard.JustDown(this.keys.E)
            ) {

                this.scene.start(
                    'PCBuildScene',
                    {
                        character: this.selectedCharacter,
                        playerX: this.player.x,
                        playerY: this.player.y
                    }
                );
            }

        } else {

            this.interactionText.setVisible(false);
        }
    }

    // ========================================== 
    // TEXTURE DO PERSONAGEM ATUAL 
    // ========================================== 
    getCharacterTexture() { 
        return this.selectedCharacter === 'João' ? 'joaoSprite' : 'vitoriaSprite'; 
    }

    // ========================================== 
    // FRAME PARADO 
    // ==========================================
    setIdleFrame() { 
        const texture = this.getCharacterTexture(); 
        if (this.playerDirection === 'left') { 
            this.player.setFrame(0); 
            this.player.setFlipX(true); 
        } else if ( this.playerDirection === 'right' ) {
            this.player.setFrame(0); 
            this.player.setFlipX(false); 
        } else if ( this.playerDirection === 'down' ) {
            this.player.setFrame(4); 
            this.player.setFlipX(false); 
        } else if ( this.playerDirection === 'up' ) {
            this.player.setFrame(6); 
            this.player.setFlipX(false); 
        } 
    }


}