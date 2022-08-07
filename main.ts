const BALL_IMAGE = img`
    . . e e 1 e e e . .
    . e 1 1 d d d d e .
    e 1 d d d d d d d e
    e d d d d d d d d e
    e d d d d d d d d e
    e d d d d d d d d e
    e d d d d d d d d e
    . e d d d d d d e .
    . . e e e e e e . .
`;
const A_IMAGE = img`
    . . . . 1 1 . . . .
    . . . 1 1 1 1 . . .
    . . . 1 . . 1 . . .
    . . 1 1 . . 1 1 . .
    . . 1 1 . . 1 1 . .
    . 1 1 1 1 1 1 1 1 .
    . 1 . . . . . . 1 .
    1 1 . . . . . . 1 1
    1 1 . . . . . . 1 1
`;
const B_IMAGE = img`
    1 1 1 1 1 . . . . .
    1 . . . 1 1 . . . .
    1 . . . . 1 . . . .
    1 . . . 1 1 . . . .
    1 1 1 1 1 . . . . .
    1 . . . 1 1 . . . .
    1 . . . . 1 . . . .
    1 . . . 1 1 . . . .
    1 1 1 1 1 . . . . .
`;
const C_IMAGE = img`
    . . 1 1 1 1 1 1 . .
    . . 1 . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 1 . . . . . . .
    . . 1 1 1 1 1 1 . .
`;
const D_IMAGE = img`
    1 1 1 1 . . . . . .
    1 . . . 1 1 . . . .
    1 . . . . . 1 . . .
    1 . . . . . . 1 . .
    1 . . . . . . 1 . .
    1 . . . . . . 1 . .
    1 . . . . . 1 . . .
    1 . . . 1 1 . . . .
    1 1 1 1 . . . . . .
`;
const E_IMAGE = img`
    . 1 1 1 1 1 1 1 1 .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 1 1 1 1 1 . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 . . . . . . . .
    . 1 1 1 1 1 1 1 1 .
`;
const N_IMAGE = img`
    1 1 . . . . . . . 1
    1 1 1 . . . . . . 1
    1 . 1 1 . . . . . 1
    1 . . 1 1 . . . . 1
    1 . . . 1 1 . . . 1
    1 . . . . 1 1 . . 1
    1 . . . . . 1 1 . 1
    1 . . . . . . 1 1 1
    1 . . . . . . . 1 1
`;
const O_IMAGE = img`
    . . 1 1 1 1 1 1 . .
    . 1 1 . . . . 1 1 .
    1 1 . . . . . . 1 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 . . . . . . . . 1
    1 1 . . . . . . 1 1
    . 1 1 . . . . 1 1 .
    . . 1 1 1 1 1 1 . .
`;
const U_IMAGE = img`
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 1 . . . . 1 1 .
    . . 1 1 1 1 1 1 . .
`;
const T_IMAGE = img`
    . 1 1 1 1 1 1 1 . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
    . . . . 1 . . . . .
`;
const H_IMAGE = img`
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 1 1 1 1 1 1 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
    . 1 . . . . . . 1 .
`;

const PADDLE_SPEED = 150;
const PADDING_FROM_WALL = 3;
let pingMessage = false;

// if player doesn't interact for 'TIMEOUT' time, revert to ai
const TIMEOUT = 5000;
let playerOneLastMove = -TIMEOUT;
let playerTwoLastMove = -TIMEOUT;

controller.setRepeatDefault(0, 1000);

controller.up.onEvent(ControllerButtonEvent.Repeated, () => playerOneLastMove = game.runtime());
controller.down.onEvent(ControllerButtonEvent.Repeated, () => playerOneLastMove = game.runtime());
controller.player2.up.onEvent(ControllerButtonEvent.Repeated, () => playerTwoLastMove = game.runtime());
controller.player2.down.onEvent(ControllerButtonEvent.Repeated, () => playerTwoLastMove = game.runtime());

const playerOne = createPlayer(info.player1);
playerOne.left = PADDING_FROM_WALL;
controller.moveSprite(playerOne, 0, PADDLE_SPEED);

const playerTwo = createPlayer(info.player2);
playerTwo.right = screen.width - PADDING_FROM_WALL;
controller.player2.moveSprite(playerTwo, 0, PADDLE_SPEED);

createBall();

const a = sprites.create(A_IMAGE.clone(), SpriteKind.Enemy);
const b = sprites.create(B_IMAGE.clone(), SpriteKind.Enemy);
const c = sprites.create(C_IMAGE.clone(), SpriteKind.Enemy);
const d = sprites.create(D_IMAGE.clone(), SpriteKind.Enemy);
const e = sprites.create(E_IMAGE.clone(), SpriteKind.Enemy);
const n = sprites.create(N_IMAGE.clone(), SpriteKind.Enemy);
const o = sprites.create(O_IMAGE.clone(), SpriteKind.Enemy);
const u = sprites.create(U_IMAGE.clone(), SpriteKind.Enemy);
const t = sprites.create(T_IMAGE.clone(), SpriteKind.Enemy);
const h = sprites.create(H_IMAGE.clone(), SpriteKind.Enemy);

addLetters();

function createPlayer(player: info.PlayerInfo) {
    const output = sprites.create(image.create(3, 18), SpriteKind.Player);

    output.image.fill(player.bg);
    output.setStayInScreen(true);

    player.setScore(0);
    player.showPlayer = false;

    return output;
}

function createBall() {
    let ball = sprites.create(BALL_IMAGE.clone(), SpriteKind.Enemy);
    ball.vy = randint(-20, 20);
    ball.vx = 60 * (Math.percentChance(50) ? 1 : -1);
}

game.onUpdate(function () {
    sprites
        .allOfKind(SpriteKind.Enemy)
        .forEach(b => {
            const scoreRight = b.x < 0;
            const scoreLeft = b.x >= screen.width;

            // check to see collision on the left
            if (b.x - b.width / 2 <= PADDING_FROM_WALL*2) {
                b.vx = b.vx * -1.05;
                b.x += 1;
                b.startEffect(effects.ashes, 150);
            }

            // check to see collision on the right
            if (b.x + b.width/2 >= screen.width - PADDING_FROM_WALL*2) {
                b.vx = b.vx * -1.05;
                b.x -= 1;
                b.startEffect(effects.ashes, 150);
            }

            if (scoreRight) {
                info.player2.changeScoreBy(1)
            } else if (scoreLeft) {
                info.player1.changeScoreBy(1)
            }

            if (b.top < 0) {
                b.vy = Math.abs(b.vy);
            } else if (b.bottom > screen.height) {
                b.vy = -Math.abs(b.vy);
            }

            if (scoreLeft || scoreRight) {
                b.destroy(effects.disintegrate, 500);
                control.runInParallel(function () {
                    pause(250);
                    createBall();
                });
            }
        }
        );
});

game.onShade(function () {
    if (pingMessage) {
        screen.printCenter("ping", 5);
    } else {
        screen.printCenter("pong", 5);
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, handleCollision);

function handleCollision (sprite: Sprite, otherSprite: Sprite) {
    const fromCenter = otherSprite.y - sprite.y;

    otherSprite.vx = otherSprite.vx * -1.05;
    otherSprite.vy += (sprite.vy >> 1) + (fromCenter * 3);

    otherSprite.startEffect(effects.ashes, 150);
    sprite.startEffect(effects.ashes, 100);

    otherSprite.image.setPixel(
        randint(1, otherSprite.image.width - 2),
        randint(1, otherSprite.image.height - 2),
        sprite.image.getPixel(0, 0)
    );

    pingMessage = !pingMessage;

    // time out this event so it doesn't retrigger on the same collision
    pause(500);
}

function addBall(player: info.PlayerInfo) {
    player.changeScoreBy(-2);
    createBall();
}

function removeBall(player: info.PlayerInfo) {
    const balls = sprites.allOfKind(SpriteKind.Enemy);
    if (balls.length > 1) {
        Math.pickRandom(balls).destroy();
        player.changeScoreBy(-2);
    }
}

function addLetters() {
    let prevSpace = (10,10);
    let spacing = 15;
    let initSpeed = (10,10);

    a.left = prevSpace;
    a.vy = initSpeed;

    b.left = prevSpace + spacing;
    prevSpace = b.left;
    b.vy = initSpeed + 15;

    c.left = prevSpace + spacing;
    prevSpace = c.left;
    c.vy = initSpeed + 10;

    d.left = prevSpace + spacing;
    prevSpace = d.left;
    d.vy = initSpeed + 20;

    e.left = prevSpace + spacing;
    prevSpace = e.left;
    e.vy = initSpeed + 30;

    n.left = prevSpace + spacing;
    prevSpace = n.left;
    n.vy = initSpeed + 25;

    o.left = prevSpace + spacing;
    prevSpace = o.left;
    o.vy = initSpeed + 10;

    u.left = prevSpace + spacing;
    prevSpace = u.left;
    u.vy = initSpeed + 1;

    t.left = prevSpace + spacing;
    prevSpace = t.left;
    t.vy = initSpeed + 24;

    h.left = prevSpace + spacing;
    prevSpace = h.left;
    h.vy = initSpeed + 40;
}

//sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, handleLetterHit);

//TODO This isn't working properly, debugging rn
// function handleLetterHit(letter: Sprite, ball: Sprite) {
//     //ashes effect
//     ball.startEffect(effects.ashes, 150);
//     letter.startEffect(effects.ashes, 100);

//     if (letter = (b || c || e || n || o || u)) {
//         letter.image.replace(1, 7);
//     }

//     if (letter = (a || d || t || h)) {
//         letter.image.replace(1,2);
//     }

//     // time out this event so it doesn't retrigger on the same collision
//     pause(500);
// }

game.onUpdate(function () {
    const currTime = game.runtime();

    trackBall(playerTwo);

    function trackBall(player: Sprite) {
        const next = nextBall(player);
        if (!next)
            return;
        if (ballFacingPlayer(player, next)) {
            // move to where ball is expected to intersect
            intersectBall(player, next);
        } else {
            // relax, ball is going other way
            player.vy = 0;
        }
    }

    function nextBall(player: Sprite) {
        return sprites
            .allOfKind(SpriteKind.Enemy)
            .sort((a, b) => {
                const aFacingPlayer = ballFacingPlayer(player, a);
                const bFacingPlayer = ballFacingPlayer(player, b);

                // else prefer ball facing player
                if (aFacingPlayer && !bFacingPlayer) return -1;
                else if (!aFacingPlayer && bFacingPlayer) return 1;

                // else prefer ball that will next reach player
                const aDiff = Math.abs((a.x - player.x) / a.vx);
                const bDiff = Math.abs((b.x - player.x) / b.vx);
                return aDiff - bDiff;
            })[0];
    }

    function ballFacingPlayer(player: Sprite, ball: Sprite) {
        return (ball.vx < 0 && player.x < 80) || (ball.vx > 0 && player.x > 80);
    }

    function intersectBall(player: Sprite, target: Sprite) {
        const projectedDY = (target.x - player.x) * target.vy / target.vx;
        let intersectionPoint = target.y - projectedDY;

        // quick 'estimation' for vertical bounces
        if (intersectionPoint < 0) {
            intersectionPoint = Math.abs(intersectionPoint % screen.height)
        } else if (intersectionPoint > screen.height) {
            intersectionPoint -= intersectionPoint % screen.height;
        }

        // move toward estimated intersection point if not in range
        if (intersectionPoint > player.y + (player.height >> 2)) {
            player.vy = PADDLE_SPEED;
        } else if (intersectionPoint < player.y - (player.height >> 2)) {
            player.vy = -PADDLE_SPEED;
        } else {
            player.vy = 0;
        }
    }
});