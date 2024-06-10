let tileSpriteSheet
let gamemap
let alienSpriteSheet
let alien
let alienSprites
let rows, cols
let tiles = []
let platforms = []
let rez = 2
let viewX = 0
let viewY = 0
let coins = 0
let usedCoins = 0
let lives = 3
let coinSound, hitSound, musicSound, jumpSound, deathSound
let gameOver = false
let coinsCount = 0
let challengeHeart = 0
let challengeState = false
let challengeChance = 0
let normalWins = 0
let challengeWins = 0
let gameState = "playing"
let enemySpriteSheet, enemySprites, creatureSpriteSheet, creatureSprite
let slimeEnemy1, slimeEnemy2, slimeEnemy3, slimeEnemy4, slimeEnemy5, slimeEnemy6
let fishEnemy1, fishEnemy2, fishEnemy1a
let bugEnemy1, bugEnemy2, bugEnemy3, bugEnemy4
let snailEnemy1, snailEnemy2

const SPACE = 32

const WALKING_SPEED = 3
const JUMP_VELOCITY = 14
const GRAVITY = 0.6

// define player
const PLAYER = '-1'
const ENEMY = '-2'

// define tiles
const TILE_BRICK = '0'
const TILE_EMPTY = '3'

// cloud blocks
const CLOUD_LEFT = '5'
const CLOUD_RIGHT = '6'

// bush blocks
const BUSH_LEFT = '1'
const BUSH_RIGHT = '2'

// mushroom tiles
const MUSHROOM_TOP = '9'
const MUSHROOM_BOTTOM = '10'

// jump block
const JUMP_BLOCK = '4'
const JUMP_BLOCK_HIT = '8'

// pole
const POLE_TOP = '7'
const POLE_MIDDLE = '11'
const POLE_BOT = '15'

// flag
const FLAG_LEFT = '12'
const FLAG_MID = '13'
const FLAG_RIGHT = '14'

const COLLIDABLES = [TILE_BRICK, JUMP_BLOCK, JUMP_BLOCK_HIT, MUSHROOM_TOP, MUSHROOM_BOTTOM, PLAYER, POLE_TOP, POLE_MIDDLE]

// margins
const LEFT_MARGIN = 60
const VERTICAL_MARGIN = 15
const RIGHT_MARGIN = 150

function preload() {
    tileSpriteSheet = loadImage('graphics/spritesheet.png')
    alienSpriteSheet = loadImage('graphics/blue_alien.png')
    creatureSpriteSheet = loadImage('graphics/creatures.png')
    gamemap = loadTable('graphics/gamemap.csv')
    coinSound = loadSound('sounds/coin.wav')
    hitSound = loadSound('sounds/hit.wav')
    jumpSound = loadSound('sounds/jump.wav')
    deathSound = loadSound('sounds/death.wav')
}

function setup() {
    createCanvas(850, 480)
    frameRate(30)

    init()
}

function createAlien() {
    idleAlien = [alienSprites[0]]
    walkingAlien = alienSprites.slice(7, 11)
    jumpingAlien = [alienSprites[3]]

    alien = new AnimatedSprite(idleAlien[0], 32, 220, 'PLAYER', walkingAlien, idleAlien, jumpingAlien)
}

//let idleEnemy... = [creatureSprite[...]]
//let walkingEnemy... = creatureSprite.slice(x, y)
//enemy... = new Enemy(idleEnemy...[0], x, y, BL, BR, ENEMY, idleEnemy..., walkingEnemy...)
function createEnemies() {
    let idleEnemySlime1 = [creatureSprite[0]]
    let walkingEnemySlime1 = creatureSprite.slice(0, 2)
    slimeEnemy1 = new Enemy(idleEnemySlime1[0], 200, 224, 112, 256, ENEMY, idleEnemySlime1, walkingEnemySlime1)

    let idleEnemySlime2 = [creatureSprite[3]]
    let walkingEnemySlime2 = creatureSprite.slice(3, 5)
    slimeEnemy2 = new Enemy(idleEnemySlime2[0], 32, 352, 16, 80, ENEMY, idleEnemySlime2, walkingEnemySlime2)

    let idleEnemySlime3 = [creatureSprite[8]]
    let walkingEnemySlime3 = creatureSprite.slice(8, 10)
    slimeEnemy3 = new Enemy(idleEnemySlime3[0], 160, 352, 128, 192, ENEMY, idleEnemySlime3, walkingEnemySlime3)

    let idleEnemySlime4 = [creatureSprite[11]]
    let walkingEnemySlime4 = creatureSprite.slice(11, 13)
    slimeEnemy4 = new Enemy(idleEnemySlime4[0], 336, 352, 320, 448, ENEMY, idleEnemySlime4, walkingEnemySlime4)

    let idleEnemySlime5 = [creatureSprite[16]]
    let walkingEnemySlime5 = creatureSprite.slice(16, 18)
    slimeEnemy5 = new Enemy(idleEnemySlime5[0], 480, 352, 480, 608, ENEMY, idleEnemySlime5, walkingEnemySlime5)

    let idleEnemySlime6 = [creatureSprite[19]]
    let walkingEnemySlime6 = creatureSprite.slice(19, 21)
    slimeEnemy6 = new Enemy(idleEnemySlime6[0], 0, 64, 0, 80, ENEMY, idleEnemySlime6, walkingEnemySlime6)

    let idleEnemyFish1 = [creatureSprite[24]]
    let walkingEnemyFish1 = creatureSprite.slice(24, 26)
    fishEnemy1 = new Enemy(idleEnemyFish1[0], 282, 240, 272, 312, ENEMY, idleEnemyFish1, walkingEnemyFish1)

    let idleEnemyFish1a = [creatureSprite[24]]
    let walkingEnemyFish1a = creatureSprite.slice(24, 26)
    fishEnemy1a = new Enemy(idleEnemyFish1a[0], 332, 240, 312, 352, ENEMY, idleEnemyFish1a, walkingEnemyFish1a)

    let idleEnemyFish2 = [creatureSprite[27]]
    let walkingEnemyFish2 = creatureSprite.slice(27, 29)
    fishEnemy2 = new Enemy(idleEnemyFish2[0], 400, 240, 400, 512, ENEMY, idleEnemyFish2, walkingEnemyFish2)

    let idleEnemyBug1 = [creatureSprite[32]]
    let walkingEnemyBug1 = creatureSprite.slice(32, 34)
    bugEnemy1 = new Enemy(idleEnemyBug1[0], 200, 152, 192, 256, ENEMY, idleEnemyBug1, walkingEnemyBug1)

    let idleEnemyBug2 = [creatureSprite[35]]
    let walkingEnemyBug2 = creatureSprite.slice(35, 37)
    bugEnemy2 = new Enemy(idleEnemyBug2[0], 250, 132, 192, 256, ENEMY, idleEnemyBug2, walkingEnemyBug2)

    let idleEnemyBug3 = [creatureSprite[40]]
    let walkingEnemyBug3 = creatureSprite.slice(40, 42)
    bugEnemy3 = new Enemy(idleEnemyBug3[0], 400, 80, 384, 496, ENEMY, idleEnemyBug3, walkingEnemyBug3)

    let idleEnemyBug4 = [creatureSprite[43]]
    let walkingEnemyBug4 = creatureSprite.slice(43, 45)
    bugEnemy4 = new Enemy(idleEnemyBug4[0], 304, 48, 288, 400, ENEMY, idleEnemyBug4, walkingEnemyBug4)

    let idleEnemySnail1 = [creatureSprite[48]]
    let walkingEnemySnail1 = creatureSprite.slice(48, 50)
    snailEnemy1 = new Enemy(idleEnemySnail1[0], 192, 96, 192, 288, ENEMY, idleEnemySnail1, walkingEnemySnail1)

    let idleEnemySnail2 = [creatureSprite[52]]
    let walkingEnemySnail2 = creatureSprite.slice(52, 54)
    snailEnemy2 = new Enemy(idleEnemySnail2[0], 80, 64, 80, 176, ENEMY, idleEnemySnail2, walkingEnemySnail2)

    enemies = [slimeEnemy1, slimeEnemy2, slimeEnemy3, slimeEnemy4, slimeEnemy5, slimeEnemy6, fishEnemy1, fishEnemy1a, fishEnemy2, bugEnemy1, bugEnemy2, bugEnemy3, bugEnemy4, snailEnemy1, snailEnemy2]
}

function createPlatforms(gamemap) {
    platforms = []
    coinsCount = 0
    rows = gamemap.getRowCount()
    cols = gamemap.getColumnCount()

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let spriteIndex = gamemap.getString(r, c)
            let sprite = tiles[spriteIndex]
            let tile = new Sprite(sprite, sprite.width * c, sprite.height * r, spriteIndex)
            platforms.push(tile)
            if (spriteIndex == JUMP_BLOCK) {
                coinsCount++
            }
        }
    }
}

function coinLives() {
    if (coins == 5) {
        coins -= 5
        lives++
        usedCoins += 5
    }
}

function init() {
    viewX = 0
    viewY = 0
    coins = 0
    lives = 3

    translate(viewX, viewY)

    tiles = generateTiles(tileSpriteSheet, 16, 16)
    createPlatforms(gamemap)

    alienSprites = generateTiles(alienSpriteSheet, 16, 20)
    createAlien()

    creatureSprite = generateTiles(creatureSpriteSheet, 16, 16)
    createEnemies()
}

function draw() {
    background('#80a1f2')
    scale(rez)
    scroll()

    for (let tile of platforms) {
        tile.display()
    }
    alien.display()
    //Display enemy below
    for (let enemy of enemies) {
        enemy.display()
        enemy.update()
    }

    coinLives()
    resolvePlatformCollisions(alien, platforms)
    displayScore()
    checkGameOver()
    heartChallenge()
}

function heartChallenge() {
    if (gameState == "restarting") {
        if (challengeHeart >= 5) {
            challengeState = true
        }
    }
    if (challengeChance >= 1) {
        if (gameState == "playing") {
            if (lives > 1) {
                lives -= 1
            }
        } else if (gameState == "restarting") {
            challengeChance -= 1
            if (coins + usedCoins == coinsCount) {
                challengeWins++
            }
        }
    }
}

function checkGameOver() {
    if (!gameOver) {
        checkDeath()
    }

    if (lives == 0) {
        fill(255, 0, 0)
        textAlign(CENTER)
        text("Game Over", width / 4 + viewX, height / 4 + viewY)
        text("Click to Restart", width / 4 + viewX, height / 4 + 20 + viewY)
        noLoop()
        gameState = "restarting"
    } else if (coins + usedCoins == coinsCount) {
        fill(255, 0, 0)
        textAlign(CENTER)
        text("You collected all the coins!", width / 4 + viewX, height / 4 + viewY)
        text("Click to Restart", width / 4 + viewX, height / 4 + 20 + viewY)
        gameOver = true
        normalWins++
        noLoop()
        gameState = "restarting"
    }
}

function mousePressed() {
    if (gameOver) {
        gameOver = false
        init()
        loop()
        usedCoins = 0
        challengeHeart = 0
        gameState = "playing"
    }
    if (challengeState == true) {
        challengeChance++
        challengeState = false
    }
}

function checkDeath() {
    if (alien.getTop() > rows * 16 + 48 || checkCollisionList(alien, enemies).length) {
        lives--
        if (lives == 0) {
            gameOver = true
        } else {
            viewX = 0
            viewY = 0
            translate(viewX, viewY)
            alien.x = 32
            alien.y = 220
            deathSound.play()
        }
    }
}

function displayScore() {
    fill(255, 0, 0)
    textAlign(LEFT)
    text("Coins: " + coins, viewX + 15, viewY + 20)
    text("Lives: " + lives, viewX + 15, viewY + 35)
    text("Wins: " + normalWins, viewX + 367.5, viewY + 20)
    text("Challenge Wins: " + challengeWins, viewX + 310, viewY + 35)
}

function scroll() {
    let rightBound = viewX + width / rez - RIGHT_MARGIN
    if (alien.getRight() > rightBound && viewX < 260) {
        viewX += alien.getRight() - rightBound
    }

    let leftBound = viewX + LEFT_MARGIN
    if (alien.getLeft() < leftBound && viewX > 0) {
        viewX -= leftBound - alien.getLeft()
    }

    let bottomBound = viewY + height / rez - VERTICAL_MARGIN
    if (alien.getBottom() > bottomBound) {
        viewY += alien.getBottom() - bottomBound
    }

    let topBound = viewY + VERTICAL_MARGIN
    if (alien.getTop() < topBound) {
        viewY -= topBound - alien.getTop()
    }

    translate(-viewX, -viewY)
}

function resolvePlatformCollisions(s, list) {
    s.dy += GRAVITY
    s.y += s.dy

    let collisions = checkCollisionList(s, list)
    if (collisions.length > 0) {
        let collided = collisions[0]
        if (s.dy > 0) {
            s.setBottom(collided.getTop())
        } else if (s.dy < 0) {
            s.setTop(collided.getBottom())

            if (collided.type == JUMP_BLOCK) {
                collided.img = tiles[JUMP_BLOCK_HIT]
                collided.type = JUMP_BLOCK_HIT
                coinSound.play()
                coins++
            } else if (collided.type == JUMP_BLOCK_HIT) {
                hitSound.play()
            }
        }
        s.dy = 0
    }
    s.x += s.dx
    collisions = checkCollisionList(s, list)
    if (collisions.length > 0) {
        let collided = collisions[0]
        if (s.dx > 0) {
            s.setRight(collided.getLeft())
        } else if (s.dx < 0) {
            s.setLeft(collided.getRight())
        }
    }
}

function keyPressed() {
    if (!gameOver) {
        if (keyCode == LEFT_ARROW) {
            alien.dx = -WALKING_SPEED
            alien.state = 'walking'
        } else if (keyCode == RIGHT_ARROW) {
            alien.dx = WALKING_SPEED
            alien.state = 'walking'
        } else if (keyCode == SPACE && isOnPlatform(alien, platforms)) {
            alien.dy = -JUMP_VELOCITY
            alien.state = 'jumping'
            jumpSound.play()
        } else if (keyCode == UP_ARROW) {
            challengeHeart += 1
        } else {
            alien.state = 'idle'
        }
    }
}

function keyReleased() {
    if (keyCode == LEFT_ARROW) {
        alien.dx = 0
        alien.state = 'idle'
    } else if (keyCode == RIGHT_ARROW) {
        alien.dx = 0
        alien.state = 'idle'
    } else if (keyCode == SPACE) {
        alien.dy = 0
        alien.state = 'idle'
    }
}

function checkCollision(s1, s2) {
    let noXOverlap = s1.getRight() <= s2.getLeft() || s1.getLeft() >= s2.getRight()
    let noYOverlap = s1.getBottom() <= s2.getTop() || s1.getTop() >= s2.getBottom()

    if (noXOverlap || noYOverlap) {
        return false
    } else {
        return true
    }
}

function checkCollisionList(s, list) {
    let collisionList = []
    for (let sprite of list) {
        if (checkCollision(s, sprite) && sprite.collidable) {
            collisionList.push(sprite)
        }
    }
    return collisionList
}

function isOnPlatform(s, list) {
    s.y += 5
    let collisions = checkCollisionList(s, list)
    s.y -= 5
    if (collisions.length > 0) {
        return true
    } else {
        return false
    }
}
