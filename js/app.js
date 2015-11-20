
var conf = {
    "colWidth":"101",
    "rowHeight":"85",
    "enemySpeed":"100",
    "enemyLanes":[[110,150],[190, 230],[270,320],[360, 410]],
    "hitBox":"20"
};
    conf.canvasWidth = Math.floor((window.innerWidth / 1.5) / conf.colWidth) * conf.colWidth,
    conf.canvasHeight = Math.floor((window.innerHeight / 1.5) / conf.rowHeight) * conf.rowHeight;

// Enemies our player must avoid
var Enemy = function(y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = -100;
    this.y = y;
};

Enemy.prototype = {

    update: function(dt) {
    this.x = this.x + this.speed * dt;
    //console.log("enemy-x:" + this.x);
    //console.log("enemy-y:" + this.y);
    // console.log("player-x:" + player.x);
    // console.log("player-y:" + player.y);
    // if(player.x >= this.x - conf.hitBox && player.y <= this.y - conf.hitBox){
    //     if(player.x >= this.x + conf.hitBox && player.y <= this.y + conf.hitBox){
    //         this.reset();
    //     }
    // }
    },

    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x,this.y,5,5);
    },

    rnd: function(min, max){
        return Math.ceil(Math.random() * (max - min) + min);
    },

    reset: function(){
        allEnemies = [];
        player = new Player();
        console.log("------RESET------");
    },

    generate: function(){
        window.setInterval(function(){
            var rndLane = conf.enemyLanes[enemy.rnd(-1,2)];
            //console.log(rndLane);
            allEnemies.push(new Enemy(enemy.rnd(rndLane[0], rndLane[1]), enemy.rnd(50, 100)));
        }, 1500);
    }
};

var Player = function(){
    this.width = 70;
    this.height = 80;
    this.sprite = 'images/char-boy.png';
    this.speed = 100;
    this.x = Math.floor(conf.canvasWidth / 2 - this.width / 2);
    this.y = Math.floor(conf.canvasHeight - this.height);
};

Player.prototype = {

    update: function(){
    },

    render: function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x,this.y,5,5);
    },

    handleInput: function(e){
       switch(e){
            case 'left':
                this.x = this.x - 10;
                break;
            case 'right':
                this.x = this.x + 10;
                break;
            case 'up':
                this.y = this.y - 10;
                break;
            case 'down':
                this.y = this.y + 10;
                break;
       }
       console.log('x:' + this.x + 'y:' + this.y);
    }

};

var player = new Player();
var enemy = new Enemy();

var allEnemies = [];

enemy.generate();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
