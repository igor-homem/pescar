export default class RoomScene extends Phaser.Scene {

    constructor() {
        super('RoomScene');
    }

    init(data) {

        // ==========================================
        // PERSONAGEM
        // ==========================================

        this.selectedCharacter = data.character || 'João';

        // Posição preservada ao voltar do PCBuildScene
        this.playerX = data.playerX ?? 320;
        this.playerY = data.playerY ?? 250;

        // Direção preservada
        this.playerDirection = data.playerDirection || 'down';
    }

    preload() {

        // ==========================================
        // PERSONAGENS
        // ==========================================

        this.load.spritesheet(
            'joaoSprite',
            'assets/characters/joao_sprite.png',
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );

        this.load.spritesheet(
            'vitoriaSprite',
            'assets/characters/vitoria_sprite.png',
            {
                frameWidth: 32,
                frameHeight: 32
            }
        );

        // ==========================================
        // MÚSICA
        // ==========================================

        this.load.audio(
            'musicaRoom',
            'audio/dreamy_rabbit-8-bit-game-music-122259.mp3'
        );

        // ==========================================
        // MAPA TILED
        // ==========================================

        this.load.tilemapTiledJSON(
            'classroomMap',
            'maps/classroom.json'
        );

        // ==========================================
        // TILESET
        // ==========================================

        this.load.image(
            'classroomTiles',
            'tilesets/classroom.png'
        );
    }

    create() {

        // ==========================================
        // MÚSICA DA SALA
        // ==========================================

        this.roomMusic = this.sound.add(
            'musicaRoom',
            {
                loop: true,
                volume: 0.5
            }
        );

        this.roomMusic.play();

        // ==========================================
        // MAPA TILED
        // ==========================================

        this.map = this.make.tilemap({
            key: 'classroomMap'
        });

        this.tileset = this.map.addTilesetImage(
            'classroom_tiles',
            'classroomTiles'
        );

        // ==========================================
        // VERIFICAÇÃO DO TILESET
        // ==========================================

        if (!this.tileset) {

            console.error(
                'Erro: o tileset "classroom_tiles" não foi encontrado.'
            );

            return;
        }

        // ==========================================
        // TAMANHO DO MAPA
        // ==========================================

        this.roomWidth = this.map.widthInPixels;
        this.roomHeight = this.map.heightInPixels;

        // ==========================================
        // CENTRALIZAR MAPA NA TELA
        // ==========================================

       this.mapOffsetX = Math.max(
            0,
            (this.scale.width - this.roomWidth) / 2
        );

        this.mapOffsetY = Math.max(
            0,
            (this.scale.height - this.roomHeight) / 2
        );

        // ==========================================
        // CAMADAS
        // ==========================================

        this.backgroundLayer = this.map.createLayer(
            'background',
            this.tileset,
            this.mapOffsetX,
            this.mapOffsetY
        );

        this.wallLayer = this.map.createLayer(
            'wall',
            this.tileset,
            this.mapOffsetX,
            this.mapOffsetY
        );

        this.decorationLayer = this.map.createLayer(
            'decoration',
            this.tileset,
            this.mapOffsetX,
            this.mapOffsetY
        );

        this.borderLayer = this.map.createLayer(
            'border',
            this.tileset,
            this.mapOffsetX,
            this.mapOffsetY
        );

        // ==========================================
        // LIMITES DO MUNDO FÍSICO
        // ==========================================

        this.physics.world.setBounds(
            this.mapOffsetX,
            this.mapOffsetY,
            this.roomWidth,
            this.roomHeight
        );

        // ==========================================
        // COLISÕES DOS TILES
        // ==========================================

        this.wallLayer.forEachTile(tile => {

            if (
                tile.properties &&
                tile.properties.colides === true
            ) {

                tile.setCollision(true);
            }
        });

        this.decorationLayer.forEachTile(tile => {

            if (
                tile.properties &&
                tile.properties.colides === true
            ) {

                tile.setCollision(true);
            }
        });

        // ==========================================
        // LOCALIZAR COMPUTADOR
        // ==========================================

        const computerTile =
            this.decorationLayer.findTile(
                tile =>
                    tile.properties &&
                    tile.properties.computer === true
            );

        if (computerTile) {

            this.computerX =
                computerTile.getCenterX();

            this.computerY =
                computerTile.getCenterY();

            console.log(
                'Computador encontrado em:',
                this.computerX,
                this.computerY
            );

        } else {

            console.warn(
                'Nenhum tile com computer=true foi encontrado no mapa.'
            );

            // Posição de segurança
            this.computerX =
                this.mapOffsetX + 320;

            this.computerY =
                this.mapOffsetY + 272;
        }

        // ==========================================
        // ANIMAÇÕES
        // ==========================================

        this.createCharacterAnimations();

        // ==========================================
        // PLAYER
        // ==========================================

        const characterTexture =
            this.selectedCharacter === 'João'
                ? 'joaoSprite'
                : 'vitoriaSprite';

        this.player =
            this.physics.add.sprite(
                this.playerX + this.mapOffsetX,
                this.playerY + this.mapOffsetY,
                characterTexture,
                4
            );

        this.player.setDisplaySize(
            64,
            64
        );

        // ==========================================
        // CORPO FÍSICO
        // ==========================================

        this.player.body.setSize(
            20,
            22
        );

        this.player.body.setOffset(
            6,
            8
        );

        this.player.body.setCollideWorldBounds(
            true
        );

        // ==========================================
        // FRAME INICIAL
        // ==========================================

        this.setIdleFrame();

        // ==========================================
        // COLISÃO PLAYER × WALL
        // ==========================================

        this.physics.add.collider(
            this.player,
            this.wallLayer
        );

        // ==========================================
        // COLISÃO PLAYER × DECORAÇÃO
        // ==========================================

        this.physics.add.collider(
            this.player,
            this.decorationLayer
        );

        // ==========================================
        // TÍTULO DA SALA
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

        this.roomNameText
            .setScrollFactor(0)
            .setDepth(100);

        // ==========================================
        // CONTROLES
        // ==========================================

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keys =
            this.input.keyboard.addKeys({
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

        this.interactionText
            .setDepth(100)
            .setVisible(false);

        // ==========================================
        // NOME DO PERSONAGEM
        // ==========================================

        this.characterText = this.add.text(
            30,
            30,
            `Jogador: ${this.selectedCharacter}`,
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

        this.camera = this.cameras.main;

        this.camera.stopFollow();

        // A câmera começa no topo do mapa.
        // X = 0 porque o mapa já está centralizado
        // através do mapOffsetX.
        this.camera.setScroll(
            0,
            this.mapOffsetY
        );

        // ==========================================
        // INSTRUÇÃO
        // ==========================================

        this.instructionText = this.add.text(
            this.scale.width / 2,
            this.scale.height - 40,
            'WASD ou SETAS para andar',
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#dddddd'
            }
        ).setOrigin(0.5);

        this.instructionText
            .setScrollFactor(0)
            .setDepth(100);

        // ==========================================
        // LIMPAR MÚSICA AO SAIR
        // ==========================================

        this.events.once(
            'shutdown',
            () => {

                if (this.roomMusic) {

                    this.roomMusic.stop();
                    this.roomMusic.destroy();

                    this.roomMusic = null;
                }

            }
        );
    }

    // ==========================================
    // ANIMAÇÕES
    // ==========================================

    createCharacterAnimations() {

        this.createAnimationsForCharacter(
            'joaoSprite'
        );

        this.createAnimationsForCharacter(
            'vitoriaSprite'
        );
    }

    createAnimationsForCharacter(texture) {

        // ==========================================
        // DIREITA
        // ==========================================

        this.anims.create({
            key: `${texture}-right`,
            frames: this.anims.generateFrameNumbers(
                texture,
                {
                    start: 0,
                    end: 3
                }
            ),
            frameRate: 8,
            repeat: -1
        });

        // ==========================================
        // BAIXO
        // ==========================================

        this.anims.create({
            key: `${texture}-down`,
            frames: this.anims.generateFrameNumbers(
                texture,
                {
                    start: 4,
                    end: 5
                }
            ),
            frameRate: 6,
            repeat: -1
        });

        // ==========================================
        // CIMA
        // ==========================================

        this.anims.create({
            key: `${texture}-up`,
            frames: this.anims.generateFrameNumbers(
                texture,
                {
                    start: 6,
                    end: 7
                }
            ),
            frameRate: 6,
            repeat: -1
        });
    }

    // ==========================================
    // UPDATE
    // ==========================================

    update() {

        if (!this.player || !this.player.body) {
            return;
        }

        const speed = 150;

        this.player.body.setVelocity(
            0,
            0
        );

        // ==========================================
        // HORIZONTAL
        // ==========================================

        if (
            this.cursors.left.isDown ||
            this.keys.A.isDown
        ) {

            this.player.body.setVelocityX(
                -speed
            );

            this.player.anims.play(
                `${this.getCharacterTexture()}-right`,
                true
            );

            this.player.setFlipX(true);

            this.playerDirection = 'left';

        }

        else if (
            this.cursors.right.isDown ||
            this.keys.D.isDown
        ) {

            this.player.body.setVelocityX(
                speed
            );

            this.player.anims.play(
                `${this.getCharacterTexture()}-right`,
                true
            );

            this.player.setFlipX(false);

            this.playerDirection = 'right';
        }

        // ==========================================
        // VERTICAL
        // ==========================================

        if (
            this.cursors.up.isDown ||
            this.keys.W.isDown
        ) {

            this.player.body.setVelocityY(
                -speed
            );

            this.player.anims.play(
                `${this.getCharacterTexture()}-up`,
                true
            );

            this.player.setFlipX(false);

            this.playerDirection = 'up';

        }

        else if (
            this.cursors.down.isDown ||
            this.keys.S.isDown
        ) {

            this.player.body.setVelocityY(
                speed
            );

            this.player.anims.play(
                `${this.getCharacterTexture()}-down`,
                true
            );

            this.player.setFlipX(false);

            this.playerDirection = 'down';
        }

        // ==========================================
        // DIAGONAL
        // ==========================================

        if (
            this.player.body.velocity.x !== 0 &&
            this.player.body.velocity.y !== 0
        ) {

            this.player.body.velocity
                .normalize()
                .scale(speed);
        }

        // ==========================================
        // PARADO
        // ==========================================

        if (
            this.player.body.velocity.x === 0 &&
            this.player.body.velocity.y === 0
        ) {

            this.player.anims.stop();

            this.setIdleFrame();
        }

        // ==========================================
        // DISTÂNCIA DO COMPUTADOR
        // ==========================================

        const distance =
            Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.computerX,
                this.computerY
            );

        // ==========================================
        // INTERAÇÃO
        // ==========================================

        if (distance < 100) {

            this.interactionText.setVisible(
                true
            );

            this.interactionText.setPosition(
                this.player.x,
                this.player.y - 70
            );

            // ==========================================
            // PRESSIONAR E
            // ==========================================

            if (
                Phaser.Input.Keyboard.JustDown(
                    this.keys.E
                )
            ) {

                this.scene.start(
                    'PCBuildScene',
                    {
                        character:
                            this.selectedCharacter,

                        // Remove o deslocamento do mapa
                        // antes de salvar a posição
                        playerX:
                            this.player.x -
                            this.mapOffsetX,

                        playerY:
                            this.player.y -
                            this.mapOffsetY,

                        playerDirection:
                            this.playerDirection
                    }
                );
            }

        }

        else {

            this.interactionText.setVisible(
                false
            );
        }

        // ==========================================
        // CÂMERA — SEGUE O PLAYER APENAS NA VERTICAL
        // ==========================================

        const cameraHeight = this.camera.height;

        // ==========================================
        // LIMITE SUPERIOR
        // ==========================================

        const minCameraY = this.mapOffsetY;

        // ==========================================
        // LIMITE INFERIOR
        // ==========================================

        const maxCameraY = Math.max(
            minCameraY,
            this.mapOffsetY +
            this.roomHeight -
            cameraHeight
        );

        // ==========================================
        // TENTA CENTRALIZAR O PLAYER VERTICALMENTE
        // ==========================================

        let targetCameraY =
            this.player.y -
            cameraHeight / 2;

        // ==========================================
        // IMPEDE A CÂMERA DE SAIR DO MAPA
        // ==========================================

        targetCameraY = Phaser.Math.Clamp(
            targetCameraY,
            minCameraY,
            maxCameraY
        );

        // ==========================================
        // APLICA A POSIÇÃO
        // ==========================================
        //
        // X = 0 → não acompanha horizontalmente
        // Y = targetCameraY → acompanha verticalmente

        this.camera.setScroll(
            0,
            targetCameraY
        );

    }

    // ==========================================
    // TEXTURE DO PERSONAGEM
    // ==========================================

    getCharacterTexture() {

        return this.selectedCharacter === 'João'
            ? 'joaoSprite'
            : 'vitoriaSprite';
    }

    // ==========================================
    // FRAME PARADO
    // ==========================================

    setIdleFrame() {

        if (
            this.playerDirection === 'left'
        ) {

            this.player.setFrame(0);
            this.player.setFlipX(true);

        }

        else if (
            this.playerDirection === 'right'
        ) {

            this.player.setFrame(0);
            this.player.setFlipX(false);

        }

        else if (
            this.playerDirection === 'down'
        ) {

            this.player.setFrame(4);
            this.player.setFlipX(false);

        }

        else if (
            this.playerDirection === 'up'
        ) {

            this.player.setFrame(6);
            this.player.setFlipX(false);
        }
    }
}