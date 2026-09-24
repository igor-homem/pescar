
export default class PCBuildScene extends Phaser.Scene {

    constructor() {
        super('PCBuildScene');
    }

    init(data) {

        this.selectedCharacter = data.character || 'João';

        this.returnPlayerX = data.playerX ?? 400;
        this.returnPlayerY = data.playerY ?? 450;

    }

    preload() {
        this.load.audio(
            'musicaQuiz',
            'audio/backgroundmusicmaster-quiz-master-382651.mp3'
        );
        this.load.image( 
            'background_computer', 
            'assets/computer_background.png' 
        ); 
    }

    create() {

        this.musicaQuiz = this.sound.add(
            'musicaQuiz',
            {
                volume: 0.5,
                loop: true
            }
        );

        this.musicaQuiz.play();

        const width = this.scale.width;
        const height = this.scale.height;

        // ==============================
        // ESTADO DA MONTAGEM
        // ==============================

        this.currentStep = 0;

        this.mistakes = 0;

        this.gameOver = false;

        // ==============================
        // COMPONENTES
        // ==============================

        this.components = [
            'Placa-mãe',
            'Processador',
            'Memória RAM',
            'SSD',
            'Placa de vídeo',
            'Fonte'
        ];

        // ==============================
        // DICAS
        // ==============================

        this.hints = {

            'Placa-mãe': [
                'Dica 1: É a principal placa do computador.',
                'Dica 2: Outros componentes são conectados nela.',
                'Dica 3: Ela serve como base para os demais componentes.'
            ],

            'Processador': [
                'Dica 1: É considerado o cérebro do computador.',
                'Dica 2: Ele executa instruções e processa dados.',
                'Dica 3: É instalado diretamente na placa-mãe.'
            ],

            'Memória RAM': [
                'Dica 1: Ela ajuda o computador a trabalhar com dados temporariamente.',
                'Dica 2: É uma memória rápida usada durante a execução dos programas.',
                'Dica 3: Ela é instalada nos slots de memória da placa-mãe.'
            ],

            'SSD': [
                'Dica 1: É usado para armazenar arquivos e programas.',
                'Dica 2: Ele é um dispositivo de armazenamento.',
                'Dica 3: Seus dados permanecem armazenados mesmo quando o computador é desligado.'
            ],

            'Placa de vídeo': [
                'Dica 1: É responsável pelo processamento gráfico.',
                'Dica 2: É muito utilizada em jogos e aplicações gráficas.',
                'Dica 3: Também é conhecida como GPU.'
            ],

            'Fonte': [
                'Dica 1: Ela fornece energia para os componentes.',
                'Dica 2: É conectada à tomada.',
                'Dica 3: Ela distribui energia elétrica para o computador.'
            ]
        };

        // ==============================
        // FUNDO
        // ==============================

        this.add.image(
            width / 2,
            height / 2,
            'background_computer'
        ).setDisplaySize(
            width,
            height
        );

        // ==============================
        // TÍTULO
        // ==============================

        this.add.text(
            width / 2,
            55,
            'MONTAGEM DO COMPUTADOR',
            {
                fontFamily: 'Arial',
                fontSize: '38px',
                fontStyle: 'bold',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // ==============================
        // INSTRUÇÃO
        // ==============================

        this.instructionText = this.add.text(
            width / 2,
            110,
            '',
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: '#cccccc'
            }
        ).setOrigin(0.5);

        // ==============================
        // ÁREA DO GABINETE
        // ==============================

        this.add.rectangle(
            850,
            390,
            400,
            430,
            0x202020
        ).setStrokeStyle(
            4,
            0x444444
        );

        this.add.text(
            850,
            205,
            'COMPUTADOR',
            {
                fontFamily: 'Arial',
                fontSize: '28px',
                fontStyle: 'bold',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // ==============================
        // LISTA DE COMPONENTES
        // ==============================

        this.componentButtons = [];

        this.createComponentButtons();

        // ==============================
        // BOTÃO VOLTAR
        // ==============================

        const backButton = this.add.text(
            40,
            35,
            '← VOLTAR',
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: '#cccccc'
            }
        );

        backButton.setInteractive({
            useHandCursor: true
        });

        backButton.on('pointerdown', () => {

            if (this.gameOver) {
                return;
            }
            this.stopMusic();
            this.scene.start(
                'RoomScene',
                {
                    character: this.selectedCharacter,
                    playerX: this.returnPlayerX,
                    playerY: this.returnPlayerY
                }
            );

        });

        // ==============================
        // INICIAR
        // ==============================

        this.updateStep();
    }


    // ==============================
    // CRIAR COMPONENTES
    // ==============================

    createComponentButtons() {

        const startX = 280;
        const startY = 210;

        // Criar uma cópia para não alterar
        // a ordem original dos componentes.
        const shuffledComponents = Phaser.Utils.Array.Shuffle(
            [...this.components]
        );

        shuffledComponents.forEach(
            (component, index) => {

                const y =
                    startY + index * 65;

                const button =
                    this.add.rectangle(
                        startX,
                        y,
                        360,
                        50,
                        0x292929
                    );

                button.setStrokeStyle(
                    2,
                    0x444444
                );

                button.setInteractive({
                    useHandCursor: true
                });

                const text =
                    this.add.text(
                        startX,
                        y,
                        component,
                        {
                            fontFamily: 'Arial',
                            fontSize: '20px',
                            color: '#ffffff'
                        }
                    ).setOrigin(0.5);

                // Guardar qual componente
                // esse botão representa.
                button.component = component;

                button.textObject = text;

                // ==============================
                // HOVER
                // ==============================

                button.on('pointerover', () => {

                    if (this.gameOver) {
                        return;
                    }

                    button.setFillStyle(
                        0x333333
                    );

                });

                button.on('pointerout', () => {

                    if (this.gameOver) {
                        return;
                    }

                    button.setFillStyle(
                        0x292929
                    );

                });

                // ==============================
                // CLIQUE
                // ==============================

                button.on('pointerdown', () => {

                    if (this.gameOver) {
                        return;
                    }

                    this.installComponent(
                        component,
                        button,
                        text
                    );

                });

                this.componentButtons.push(
                    button
                );
            }
        );
    }


    // ==============================
    // INSTALAR COMPONENTE
    // ==============================

    installComponent( component, button, text ) { 
        // ============================== 
        // PEÇA CORRETA DA ETAPA 
        // ============================== 
        const correctComponent = this.components[this.currentStep]; 
        // ============================== 
        // ACERTOU 
        // ============================== 
        if (component === correctComponent) {
            button.setFillStyle( 0x166534 ); 
            button.setStrokeStyle( 3, 0x22c55e ); 
            text.setText( '✓ ' + component ); 
            text.setColor( '#86efac' ); 
            button.disableInteractive(); 
            this.currentStep++; 
            this.updateStep(); return; 
        } 
        // ============================== 
        // ERRO 
        // ============================== 
        this.mistakes++; 
        // ============================== 
        // 1º, 2º E 3º ERRO 
        // ============================== 
        if (this.mistakes <= 3) { 
            const hint = this.hints[correctComponent][ this.mistakes - 1 ]; 
            // Destaca temporariamente 
            // a peça escolhida errada 
            button.setFillStyle( 0x7f1d1d ); 
            button.setStrokeStyle( 3, 0xef4444 ); 
            this.showMessage( hint, 0xffcc00 ); 
            // Volta para o estado normal 
            this.time.delayedCall( 800, () => { 
                if ( button.input && button.input.enabled && !this.gameOver ) {
                    button.setFillStyle( 0x292929 ); 
                    button.setStrokeStyle( 2, 0x444444 ); 
                } 
            } ); return; 
        } 
        // ============================== 
        // 4º ERRO 
        // ============================== 
        this.gameOverBuild(); 
    }


    // ==============================
    // ATUALIZAR ETAPA
    // ==============================

    updateStep() { 
        // ============================== 
        // TERMINOU 
        // ============================== 
        if ( this.currentStep >= this.components.length ) {
            this.finishBuild(); return; 
        } 
        // ============================== 
        // PRÓXIMA ETAPA 
        // ============================== 
        this.instructionText.setText( 'Escolha o próximo componente' ); 
        // ============================== 
        // DEIXAR AS PEÇAS NEUTRAS 
        // ============================== 
        this.componentButtons.forEach( (button) => { 
            if ( button.input && button.input.enabled ) { 
                button.setFillStyle( 0x292929 ); 
                button.setStrokeStyle( 2, 0x444444 ); 
            } 
        } ); 
    }


    // ==============================
    // MENSAGEM / DICA
    // ==============================

    showMessage(
        message,
        color
    ) {

        // Remover mensagem anterior
        if (this.messageText) {
            this.messageText.destroy();
        }

        this.messageText =
            this.add.text(
                this.scale.width / 2,
                660,
                message,
                {
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    fontStyle: 'bold',
                    color:
                        Phaser.Display.Color
                            .IntegerToColor(color)
                            .rgba,
                    align: 'center'
                }
            ).setOrigin(0.5);

        this.messageText.setDepth(100);
    }


    // ==============================
    // GAME OVER
    // ==============================

    gameOverBuild() {

        this.gameOver = true;

        this.instructionText.setText(
            'VOCÊ ERROU 4 VEZES!'
        );

        this.instructionText.setColor(
            '#ef4444'
        );

        // Desativar peças
        this.componentButtons.forEach(
            (button) => {

                button.disableInteractive();

            }
        );

        // ==============================
        // MENSAGEM
        // ==============================

        this.add.text(
            850,
            350,
            'MONTAGEM\nINCORRETA',
            {
                fontFamily: 'Arial',
                fontSize: '42px',
                fontStyle: 'bold',
                color: '#ef4444',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.add.text(
            850,
            450,
            'Você atingiu o limite de erros.',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#cccccc'
            }
        ).setOrigin(0.5);

        // ==============================
        // JOGAR NOVAMENTE
        // ==============================

        const restartButton =
            this.add.rectangle(
                850,
                550,
                280,
                65,
                0x2563eb
            );

        restartButton.setInteractive({
            useHandCursor: true
        });

        const restartText =
            this.add.text(
                850,
                550,
                'JOGAR NOVAMENTE',
                {
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    fontStyle: 'bold',
                    color: '#ffffff'
                }
            ).setOrigin(0.5);

        restartButton.on(
            'pointerover',
            () => {

                restartButton.setFillStyle(
                    0x3b82f6
                );

            }
        );

        restartButton.on(
            'pointerout',
            () => {

                restartButton.setFillStyle(
                    0x2563eb
                );

            }
        );

        restartButton.on(
            'pointerdown',
            () => {

                this.scene.restart();

            }
        );
    }


    // ==============================
    // FINALIZAÇÃO
    // ==============================

    finishBuild() {

        this.instructionText.setText(
            '✓ COMPUTADOR MONTADO!'
        );

        this.instructionText.setColor(
            '#22c55e'
        );

        this.componentButtons.forEach(
            (button) => {

                button.disableInteractive();

            }
        );

        this.add.text(
            850,
            390,
            'PC\nMONTADO!',
            {
                fontFamily: 'Arial',
                fontSize: '46px',
                fontStyle: 'bold',
                color: '#22c55e',
                align: 'center'
            }
        ).setOrigin(0.5);

        // ==============================
        // BOTÃO VOLTAR PARA A SALA
        // ==============================

        const roomButton =
            this.add.rectangle(
                850,
                650,
                260,
                60,
                0x2563eb
            );

        roomButton.setInteractive({
            useHandCursor: true
        });

        this.add.text(
            850,
            650,
            'VOLTAR PARA A SALA',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                fontStyle: 'bold',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        roomButton.on(
            'pointerdown',
            () => {
                this.stopMusic();
                this.scene.start(
                    'RoomScene',
                    {
                        character: this.selectedCharacter,
                        playerX: this.returnPlayerX,
                        playerY: this.returnPlayerY
                    }
                );

            }
        );
    }

    // ==============================
    // PARAR MUSICA
    // ==============================

    stopMusic() {
        if (this.musicaQuiz) {
            this.musicaQuiz.stop();
            this.musicaQuiz.destroy();
            this.musicaQuiz = null;
        }
    }

    shutdown() {
        this.stopMusic();
    }

}


