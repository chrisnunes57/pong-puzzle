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

const ball = sprites.create(BALL_IMAGE.clone(), SpriteKind.Enemy);
createBall();

let initSpace = (10, 10);
let spacing = 15;
let initSpeed = (10, 10);

const aSprite = sprites.create(A_IMAGE.clone(), SpriteKind.Enemy);
const aLetter = new Letter(aSprite, initSpace + spacing, initSpeed, 2);
const bSprite = sprites.create(B_IMAGE.clone(), SpriteKind.Enemy);
const bLetter = new Letter(bSprite, initSpace + (spacing * 2), initSpeed + 15, 7);
const cSprite = sprites.create(C_IMAGE.clone(), SpriteKind.Enemy);
const cLetter = new Letter(cSprite, initSpace + (spacing * 3), initSpeed + 10, 7);
const dSprite = sprites.create(D_IMAGE.clone(), SpriteKind.Enemy);
const dLetter = new Letter(dSprite, initSpace + (spacing * 4), initSpeed + 20, 2);
const eSprite = sprites.create(E_IMAGE.clone(), SpriteKind.Enemy);
const eLetter = new Letter(eSprite, initSpace + (spacing * 5), initSpeed + 30, 7);
const nSprite = sprites.create(N_IMAGE.clone(), SpriteKind.Enemy);
const nLetter = new Letter(nSprite, initSpace + (spacing * 6), initSpeed + 25, 7);
const oSprite = sprites.create(O_IMAGE.clone(), SpriteKind.Enemy);
const oLetter = new Letter(oSprite, initSpace + (spacing * 7), initSpeed + 10, 7);
const uSprite = sprites.create(U_IMAGE.clone(), SpriteKind.Enemy);
const uLetter = new Letter(uSprite, initSpace + (spacing * 8), initSpeed + 1, 7);
const tSprite = sprites.create(T_IMAGE.clone(), SpriteKind.Enemy);
const tLetter = new Letter(tSprite, initSpace + (spacing * 9), initSpeed + 24, 2);
const hSprite = sprites.create(H_IMAGE.clone(), SpriteKind.Enemy);
const hLetter = new Letter(hSprite, initSpace + (spacing * 10), initSpeed + 40, 2);

function createPlayer(player: info.PlayerInfo) {
    const output = sprites.create(image.create(3, 18), SpriteKind.Player);

    output.image.fill(player.bg);
    output.setStayInScreen(true);

    player.setScore(0);
    player.showPlayer = false;

    return output;
}

function createBall() {
    ball.x = screen.width / 2;
    ball.y = screen.width / 2;
    ball.vy = randint(-20, 20);
    ball.vx = 60 * (Math.percentChance(50) ? 1 : -1);
}

game.onUpdate(function () {
    sprites
        .allOfKind(SpriteKind.Enemy)
        .forEach(b => {
            if (b.vx) {
                const scoreRight = b.x < 0 && game.runtime() > 1000;
                const scoreLeft = b.x >= screen.width && game.runtime() > 1000;

                // check to see collision on the left
                if (b.x - b.width / 2 <= PADDING_FROM_WALL * 2 && b.y >= playerOne.y && b.y <= playerOne.y + playerOne.height) {
                    b.vx = b.vx * -1.05;
                    b.x += 1;
                    b.startEffect(effects.ashes, 150);
                }

                // check to see collision on the right
                if (b.x + b.width / 2 >= screen.width - PADDING_FROM_WALL * 2 && b.y >= playerTwo.y && b.y <= playerTwo.y + 18) {
                    b.vx = b.vx * -1.05;
                    b.x -= 1;
                    b.startEffect(effects.ashes, 150);
                }

                if (scoreRight) {
                    info.player2.changeScoreBy(1)
                } else if (scoreLeft) {
                    info.player1.changeScoreBy(1)
                }

                if (scoreLeft || scoreRight) {
                    // here is the logic for when one player loses
                    // b.destroy(effects.disintegrate, 500);
                    control.runInParallel(function () {
                        pause(250);
                        game.reset();
                        createBall();
                    });
                }
            }

            if (b.top < 0) {
                b.vy = Math.abs(b.vy);
            } else if (b.bottom > screen.height) {
                b.vy = -Math.abs(b.vy);
            }
        }
        );
    if (ball.overlapsWith(aSprite)) {
        aLetter.impacted(aSprite, ball);
    }
    if (ball.overlapsWith(bSprite)) {
        bLetter.impacted(bSprite, ball);
    }
    if (ball.overlapsWith(cSprite)) {
        cLetter.impacted(cSprite, ball);
    }
    if (ball.overlapsWith(dSprite)) {
        dLetter.impacted(dSprite, ball);
    }
    if (ball.overlapsWith(eSprite)) {
        eLetter.impacted(eSprite, ball);
    }
    if (ball.overlapsWith(nSprite)) {
        nLetter.impacted(nSprite, ball);
    }
    if (ball.overlapsWith(oSprite)) {
        oLetter.impacted(oSprite, ball);
    }
    if (ball.overlapsWith(uSprite)) {
        uLetter.impacted(uSprite, ball);
    }
    if (ball.overlapsWith(tSprite)) {
        tLetter.impacted(tSprite, ball);
    }
    if (ball.overlapsWith(hSprite)) {
        hLetter.impacted(hSprite, ball);
    }
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
    pause(100);
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