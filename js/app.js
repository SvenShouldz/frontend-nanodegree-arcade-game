
var conf = {
    "colWidth":100,
    "rowHeight":100,
    "enemySpeed":300,
    "enemyLimit":10,
    "topLanes":[110,210],
    "bottomLanes":[310,410],
    "playerSpeed":200,
    "collision":true,
    "endScreen":false
};
    conf.canvasWidth = Math.floor(8 * conf.colWidth);
    conf.canvasHeight = Math.floor(6 * conf.rowHeight);

// Enemies our player must avoid
var Enemy = function(dir, y, id, sprite) {
    this.id = id;
    this.width = 135;
    this.height = 84;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    this.sprite = sprite;
    this.speed = conf.enemySpeed;
    this.x = dir;
    this.y = y;
};

Enemy.prototype = {

    update: function(dt) {
        if(this.y > 300){
            this.x = this.x + this.speed * dt;
            
        }else{
            this.x = this.x - this.speed * dt;
            
        }

        // COLLISION

        if(conf.collision === true){
            if (this.getTop() > player.getTop() && this.getTop() < player.getBottom() || this.getBottom() > player.getTop() && this.getBottom() < player.getBottom() ){
                if( this.getLeft() > player.getLeft() && this.getLeft() < player.getRight() || this.getRight() > player.getLeft() && this.getRight() < player.getRight() ){
                    player.sprite = 'images/dead.png';
                    player.move = false;
                    console.log("collision on:" + player.x + " " + player.y);
                    conf.endScreen = true;  
                }
            }   
        }
    },

    render: function() {
        // ctx.fillStyle = "#FF0000";
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        //console.log(this.id);
    },

    rnd: function(min, max){
        return Math.ceil(Math.random() * (max - min) + min);
    },

    reset: function(){
        //Restart Screen
        player.collect = 0;
        conf.endScreen = false;
        allEnemies = [];
        player = new Player();

        console.log("------RESET------");
    },

    generate: function(){
        var id = 0;
        window.setInterval(function(){

            if(allEnemies.length >= conf.enemyLimit){
                allEnemies.splice(0, 5);
                //console.log(allEnemies);
            }

                var y, sprite, 
                rnd = enemy.rnd(-1,1),
                dir = Math.random() < 0.5 ? conf.canvasWidth : -100;

                if(dir > 100){
                    var topLane = conf.topLanes[rnd];
                    y = topLane;
                    sprite = ['images/red-car-left.png','images/blue-car-left.png','images/green-car-left.png'];
                    //console.log(topLane);
                    //console.log("topLane: " + topLane + "y: " + y + "dir: " + dir);
                    id++;
                    setTimeout(function(){
                        console.log(sprite[enemy.rnd(-1,2)]);
                       allEnemies.push(new Enemy(dir, y, id, sprite[enemy.rnd(-1,2)])); 
                    }, enemy.rnd(0,200));
                }else{
                    var bottomLane = conf.bottomLanes[rnd];
                    y = bottomLane;
                    sprite = ['images/red-car.png','images/blue-car.png','images/green-car.png'];
                    //console.log(bottomLane);
                    id++;
                    setTimeout(function(){
                       allEnemies.push(new Enemy(dir, y, id, sprite[enemy.rnd(-1,2)])); 
                    }, enemy.rnd(0,200));
                }

                //console.log(dir);
                //console.log("new enemy");
        }, 700);
    },

    getMidX: function() {
        return this.halfWidth + this.x;
    },

    getMidY: function() {
        return this.halfHeight + this.y;
    },

    getTop: function() {
        return this.y;
    },

    getLeft: function() {
        return this.x;
    },

    getRight: function() {
        return this.x + this.width;
    },

    getBottom: function() {
        return this.y + this.height;
    }

};

var Player = function(){
    this.width = 58;
    this.height = 29;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    this.sprite = 'images/char-up2.png';
    this.speed = conf.playerSpeed;
    this.x = Math.floor(conf.canvasWidth / 2 - this.width / 2);
    this.y = Math.floor(conf.canvasHeight - this.height - 30);
    this.collect = 0;
    this.dir = "stop";
    this.move = true;
};

Player.prototype = {

    render: function(){
        // ctx.fillStyle = "#FF0000";
        // ctx.fillRect(this.x,this.y,this.width,this.height);
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    update: function(dt){
        if(this.move === true){
           switch(this.dir){
            case 'stop':
                this.x = this.x;
                break;
            case 'left':
                if(this.x < 0){
                    this.dir = 'stop';
                }else{
                    this.x = this.x - conf.playerSpeed * dt;
                    this.sprite = 'images/char-left2.png';
                    this.width = 30;
                    this.height = 60;
                }
                break;
            case 'right':
                if(this.x > conf.canvasWidth - player.width){
                    this.dir = 'stop';
                }else{
                    this.x = this.x + conf.playerSpeed * dt;
                    this.sprite = 'images/char-right2.png';
                    this.width = 30;
                    this.height = 60;  
                }
                break;
            case 'up':
                if(this.y < 0){
                    this.dir = 'stop';
                }else{
                    this.y = this.y - conf.playerSpeed * dt;
                    this.sprite = 'images/char-up2.png';
                    this.width = 60;
                    this.height = 30;  
                }
                break;
            case 'down':
                if(this.y > conf.canvasHeight - player.height){
                    this.dir = 'stop';
                }else{
                    this.y = this.y + conf.playerSpeed * dt;
                    this.sprite = 'images/char-down2.png';
                    this.width = 60;
                    this.height = 30;  
                }
                break;
            }  
        } 
    },

    getMidX: function() {
        return this.halfWidth + this.x;
    },

    getMidY: function() {
        return this.halfHeight + this.y;
    },

    getTop: function() {
        return this.y;
    },

    getLeft: function() {
        return this.x;
    },

    getRight: function() {
        return this.x + this.width;
    },

    getBottom: function() {
        return this.y + this.height;
    }

};


var Item = function(tileX, tileY){
    this.width = 40;
    this.height = 40;
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
    this.x = tileX;
    this.y = tileY;
    this.points = 100;
    this.sprite = 'images/coin.png';
    this.active = true;
};

Item.prototype = {

    render: function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },

    collision: function(){

            if (this.getTop() > player.getTop() && this.getTop() < player.getBottom() || this.getBottom() > player.getTop() && this.getBottom() < player.getBottom() ){
                if( this.getLeft() > player.getLeft() && this.getLeft() < player.getRight() || this.getRight() > player.getLeft() && this.getRight() < player.getRight() ){
                    player.collect += this.points;
                    this.active = false;
                    item.generate();
                    console.log("player collected:" + player.collect);  
                }
            }   

    },
    generate:function(){
       var tile = item.tile();
        this.x = tile[0];
        this.y = tile[1];
        this.active = true;
       console.log(tile);
    },

    rnd: function(min, max){
        return Math.ceil(Math.random() * (max - min) + min);
    },

    tile: function(){
        var width = conf.colWidth;
        var height = conf.rowHeight;
        var tileCol = item.rnd(0, Math.floor(conf.canvasWidth / width));
        var tileRow = item.rnd(100,500);

        var tileX = tileCol * width - 100;
        var tileY = tileRow;

        return [tileX, tileY];
    },

    getMidX: function() {
        return this.halfWidth + this.x;
    },

    getMidY: function() {
        return this.halfHeight + this.y;
    },

    getTop: function() {
        return this.y;
    },

    getLeft: function() {
        return this.x;
    },

    getRight: function() {
        return this.x + this.width;
    },

    getBottom: function() {
        return this.y + this.height;
    }


};
var player = new Player();
var enemy = new Enemy();
var item = new Item();

var allEnemies = [];

enemy.generate();
item.generate();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.dir = allowedKeys[e.keyCode];
    e.preventDefault();
    this.addEventListener('keyup', function(e) {
    player.dir = "stop";
    e.preventDefault();
});
});


