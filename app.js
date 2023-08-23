const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const resultDisplay = document.querySelector('#result')

const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20

let timerId
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

let xDirection = 2
let yDirection = 2
const ballStart = [270, 35]
let ballCurrentPosition = ballStart

class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topLeft = [xAxis, yAxis + blockHeight]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
	}
}


// Create blocks
const blocks = [
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),
	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
]


// Add blocks
function addBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement('div')
		block.classList.add('block')
		block.style.left = blocks[i].bottomLeft[0] + 'px'
		block.style.bottom = blocks[i].bottomLeft[1] + 'px'
		grid.appendChild(block)
	}
}

addBlocks()


// Add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

function drawUser() {
	user.style.left = currentPosition[0] + 'px'
	user.style.bottom = currentPosition[1] + 'px'
}


// Add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// Draw the ball
function drawBall() {
	ball.style.left = ballCurrentPosition[0] + 'px'
	ball.style.bottom = ballCurrentPosition[1] + 'px'
}


//move user
function moveUser(e) {
	switch (e.key) {
	  case 'ArrowLeft':
		if (currentPosition[0] > 0) {
		  currentPosition[0] -= 10
		  console.log(currentPosition[0] > 0)
		  drawUser()   
		}
		break
	  case 'ArrowRight':
		if (currentPosition[0] < (boardWidth - blockWidth)) {
		  currentPosition[0] += 10
		  console.log(currentPosition[0])
		  drawUser()   
		}
		break
	}
  }
  document.addEventListener('keydown', moveUser)

// Move the ball
function moveBall() {
	ballCurrentPosition[0] += xDirection
	ballCurrentPosition[1] += yDirection
	drawBall()
	checkCollisions()
}

timerId = setInterval(moveBall, 30)


// Check collisions
function checkCollisions() {
	//  Check for block collision
	for (let i = 0; i < blocks.length; i++) {
		if (ballCurrentPosition[0] > blocks[i].bottomLeft[0]
			&& ballCurrentPosition[0] < blocks[i].bottomRight[0]
			&& (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1]
			&& ballCurrentPosition[1] < blocks[i].bottomRight[1]
		) {
			const allBlocks = Array.from(document.querySelectorAll('.block'))
			allBlocks[i].classList.remove('block')
			blocks.splice(i, 1)
			changeDirection()
			score+=20
			scoreDisplay.innerHTML = score

			// Check for win
			if (blocks.length === 0) {
				resultDisplay.innerHTML = "You win!"
				clearInterval(timerId)
				document.removeEventListener('keydown', moveUser)
			}
		}
	}


	// Wall collisions
	if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
		ballCurrentPosition[1] >= boardHeight - ballDiameter ||
		ballCurrentPosition[0] <= 0) {
		changeDirection()

	}

	// Check for user collisions
	if (ballCurrentPosition[0] > currentPosition[0] &&
		ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
		ballCurrentPosition[1] > currentPosition[1] &&
		ballCurrentPosition[1] < currentPosition[1] + blockHeight) {
		changeDirection()
		
		score+=5
		scoreDisplay.innerHTML = score
	}

	// check for game over
	if (ballCurrentPosition[1] <= 0) {
		clearInterval(timerId)
		resultDisplay.innerHTML = "Game over!"
		document.removeEventListener('keydown', moveUser)
	}
}

function changeDirection() {
	if (xDirection === 2 && yDirection === 2) {
		yDirection = -2
		return
	}
	else if (xDirection === - 2 && yDirection === 2) {
		xDirection = 2
		return
	}

	else if (xDirection === 2 && yDirection === -2) {
		xDirection = -2
		return
	}
	else if (xDirection === -2 && yDirection === -2) {
		yDirection = 2
		return
	}
}