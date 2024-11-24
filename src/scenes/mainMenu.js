export class MainMenu extends Phaser.Scene
{
    constructor() {
        super("mainMenu")
    }
    
    create() {

        this.mainMenuUI = this.add.container(0, 0);
        this.optionsMenuUI = this.add.container(0, 0);
        this.difficultyMenuUI = this.add.container(0, 0);

        this.createMainMenuUI();
        this.createOptionsMenuUI();
        this.createDifficultyMenuUI();

        // Optionally, set the container to be visible initially
        this.mainMenuUI.setVisible(true);
        this.optionsMenuUI.setVisible(false);
        this.difficultyMenuUI.setVisible(false);
    }

    createMainMenuUI() {
        this.playButton = this.add.text(400, 200, "Start Game", menuStyle).setOrigin(0.5, 0.5);
        this.playButton.setInteractive();
        this.playButton.on('pointerover', () => this.enterButtonHoverState(this.playButton) );
        this.playButton.on('pointerout', () => this.enterButtonOutState(this.playButton) );
        this.playButton.on('pointerdown', () => this.enterPlayButtonClicked() );

        this.mainMenuUI.add(this.playButton);

        this.optionsButton = this.add.text(400, 400, "Options (WIP)", menuStyle).setOrigin(0.5, 0.5);
        this.optionsButton.setInteractive();        
        this.optionsButton.on('pointerover', () => this.enterButtonHoverState(this.optionsButton) );
        this.optionsButton.on('pointerout', () => this.enterButtonOutState(this.optionsButton) );
        this.optionsButton.on('pointerdown', () => this.enterOptionsButtonClicked() );

        this.mainMenuUI.add(this.optionsButton);
    }

    createDifficultyMenuUI() {
        this.difficulty = this.add.text(400, 100, "Choose Dificulty:", menuStyle).setOrigin(0.5, 0.5);

        this.difficultyMenuUI.add(this.difficulty);

        this.easyButton = this.add.text(400, 200, "Easy", menuStyle).setOrigin(0.5, 0.5);
        this.easyButton.setInteractive();
        this.easyButton.on('pointerover', () => this.enterButtonHoverState(this.easyButton) );
        this.easyButton.on('pointerout', () => this.enterButtonOutState(this.easyButton) );
        this.easyButton.on('pointerdown', () => this.enterDifficultyButtonClicked("easy") );

        this.difficultyMenuUI.add(this.easyButton);

        this.mediumButton = this.add.text(400, 300, "Medium", menuStyle).setOrigin(0.5, 0.5);
        this.mediumButton.setInteractive();
        this.mediumButton.on('pointerover', () => this.enterButtonHoverState(this.mediumButton) );
        this.mediumButton.on('pointerout', () => this.enterButtonOutState(this.mediumButton) );
        this.mediumButton.on('pointerdown', () => this.enterDifficultyButtonClicked("medium") );

        this.difficultyMenuUI.add(this.mediumButton);

        this.hardButton = this.add.text(400, 400, "Hard", menuStyle).setOrigin(0.5, 0.5);
        this.hardButton.setInteractive();
        this.hardButton.on('pointerover', () => this.enterButtonHoverState(this.hardButton) );
        this.hardButton.on('pointerout', () => this.enterButtonOutState(this.hardButton) );
        this.hardButton.on('pointerdown', () => this.enterDifficultyButtonClicked("hard") );

        this.difficultyMenuUI.add(this.hardButton);
    }

    createOptionsMenuUI() {
        this.placeholder = this.add.text(400, 300, "TBD OPTIONS", menuStyle).setOrigin(0.5, 0.5);
        
        this.optionsMenuUI.add(this.placeholder);

        this.back_button = this.add.text(400, 500, "Back", menuStyle).setOrigin(0.5, 0.5);
        this.back_button.setInteractive();
        this.back_button.on('pointerover', () => this.enterButtonHoverState(this.back_button) );
        this.back_button.on('pointerout', () => this.enterButtonOutState(this.back_button) );
        this.back_button.on('pointerdown', () => this.enterBackButtonClicked() );

        this.optionsMenuUI.add(this.back_button);
    }

    enterButtonHoverState(button) {
        button.setStyle({ ...menuStyle, fill: '#86711d' });
    }

    enterButtonOutState(button) {
        button.setStyle({ ...menuStyle, fill: '#ffcc00' });
    }

    enterPlayButtonClicked() {
        this.mainMenuUI.setVisible(false);
        this.difficultyMenuUI.setVisible(true);
    }

    enterDifficultyButtonClicked(difficulty) {
        this.scene.start('game', { difficulty });
    }

    enterOptionsButtonClicked() {
        this.mainMenuUI.setVisible(false);
        this.optionsMenuUI.setVisible(true);
    }

    enterBackButtonClicked() {
        this.mainMenuUI.setVisible(true);
        this.optionsMenuUI.setVisible(false);
    }
}

const menuStyle = {
    fontFamily: '"Press Start 2P", Arial',
    fontSize: '38px',
    fill: '#ffcc00',
    stroke: '#000',
    strokeThickness: 6,
    shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#333',
        blur: 4,
        stroke: true,
        fill: true,
    },
};