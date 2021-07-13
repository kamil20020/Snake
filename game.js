class SnakeBody{
	constructor(x, y, width, height){

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.body = this.initDiv();
		this.updatePos();
	}

	initDiv = () => {

		let basicDiv = document.createElement("div");
		basicDiv.style.width = this.width;
		basicDiv.style.height = this.height;
		basicDiv.className = "snakeBody";

		return basicDiv;
	}

	move = (x, y) => {
	
		this.x += x;
		this.y += y;

		this.updatePos();
	}

	doTouchWall(wW, wH){

		return (this.x + this.width > wW || this.x < 0 ||
		   this.y + this.height > wH || this.y < 0);
	}

	updatePos = () => {

		this.body.style.left = this.x;
		this.body.style.top = this.y;
	}
}

class Snake{
	constructor(){

		this.board = document.getElementById("board").getBoundingClientRect();
		this.snake = [5];

		this.appendSnake();
		this.i = setInterval(this.logic.bind(this), 80);
		this.direction = "right";

		document.addEventListener('keydown', this.handleKeyboard.bind(this));
	}

	correctBodyAfterMove = (prevBody) => {

		for(let index=1; index < this.snake.length; index++){

			this.snake[index].x = prevBody[index-1].x;
			this.snake[index].y = prevBody[index-1].y;

			this.snake[index].updatePos();
		}
	}

	handleKeyboard = (e) => {

		console.log(e.code);

		switch(e.which	){

			case 87: //w
				
				if(this.direction != "down")
					this.direction = "top";

				break;

			case 65: //a
				
				if(this.direction != "right")
					this.direction = "left";

				break;

			case 68: //d
				
				if(this.direction != "left")
					this.direction = "right";

				break;

			case 83: //s
				
				if(this.direction != "top")
					this.direction = "down";

				break;
		}
	}

	appendSnake = () => {

		let startX = 200;
		let startY = 200;

		for(let i=0; i < 5; i++){

			this.snake[i] = new SnakeBody(startX, startY, 40, 40);
			startX -= 40;
		}

		for(let i=0; i < 5; i++)
			board.appendChild(this.snake[i].body);
	}
	
	logic = () => {

		let prevBody = (JSON.parse(JSON.stringify(this.snake)));

		console.log("A: " + prevBody[0].x);

		switch(this.direction){

			case "right":
				this.snake[0].move(40, 0);
				break;

			case "left":
				this.snake[0].move(-40, 0);
				break;

			case "down":
				this.snake[0].move(0, 40);
				break;

			case "top":
				this.snake[0].move(0, -40);
				break;
		}	

		console.log("B: " + prevBody[0].x);

		this.correctBodyAfterMove(prevBody);

		if(this.snake[0].doTouchWall(this.board.width, this.board.height)){
			
			clearInterval(this.i);
		}	
	}
}

let snake = new Snake();

