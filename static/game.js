function start () {   
    var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 1200,
        fps: {
            target: 20,
            forceSetTimeOut: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    return new Phaser.Game(config);
}
function preload ()
{
    this.load.image('potat', 'static/potat.png');
    this.load.image('potat_highlight', 'static/potat_highlight.png');
    this.load.image('background', 'static/grass_background_numGrid.png');
    this.load.image('blank_tile', 'static/blank.png');
    this.load.image('blue_tile', 'static/blue.png');
    this.load.image('red_tile', 'static/red_tile.png');
}

function create ()
{
    scene_ = this; // don't really know what "this" is, but make it avaliable globally
    this.add.image(600, 600, 'background');

    board = init_board(16,16);
    this.input.on('pointerdown', function (pointer) {

        handle_click(pointer);

    }, this);

}