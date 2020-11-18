function start () {   
    var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 900,
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

    this.load.image('logo', 'static/potat.png');
}

function create ()
{

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
}