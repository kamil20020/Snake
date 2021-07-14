function randInt(min, max){

	return Math.floor(Math.random()*max + min);
}

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

class Food{
	constructor(x, y, width, height){

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.body = this.initDiv();
	}

	initDiv = () => {

		let basicDiv = document.createElement("div");
		basicDiv.style.width = this.width;
		basicDiv.style.height = this.height;
		basicDiv.style.left = this.x;
		basicDiv.style.top = this.y;
		basicDiv.className = "food";

		return basicDiv;
	}

	updatePos = (x, y) => {
		this.x = x;
		this.y = y;
		this.body.style.left = x;
		this.body.style.top = y;
	}
}

class Snake{
	constructor(){

		this.board = document.getElementById("board").getBoundingClientRect();
		this.snake = new Array(5);

		this.appendSnake();
		this.i = setInterval(this.logic.bind(this), 80);
		this.direction = "right";
		this.food = 0;

		document.addEventListener('keydown', this.handleKeyboard.bind(this));

		this.initFood();
	}

	correctBodyAfterMove = (prevBody) => {

		for(let index=1; index < this.snake.length; index++){

			this.snake[index].x = prevBody[index-1].x;
			this.snake[index].y = prevBody[index-1].y;

			this.snake[index].updatePos();
		}
	}

	doIntersects = (x1, y1, w1, h1, x2, y2, w2, h2) => {

		return (x1 + w1 > x2 && x1 < x2 + w2) && (y1 + h1 > y2 && y1 < y2 + h2);
	}

	handleKeyboard = (e) => {

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

	incrementBody = () => {

		switch(this.direction){

			case "right":

				this.snake.push(new SnakeBody(this.snake[this.snake.length-1].x-40, 
												this.snake[this.snake.length-1].y, 40, 40));
				break;

			case "left":

				this.snake.push(new SnakeBody(this.snake[this.snake.length-1].x+40, 
												this.snake[this.snake.length-1].y, 40, 40));
				break;

			case "down":

				this.snake.push(new SnakeBody(this.snake[this.snake.length-1].x, 
												this.snake[this.snake.length-1].y-40, 40, 40));
				break;

			case "top":

				this.snake.push(new SnakeBody(this.snake[this.snake.length-1].x, 
												this.snake[this.snake.length-1].y+40, 40, 40));
				break;
		}

		board.appendChild(this.snake[this.snake.length-1].body);
	}

	appendSnake = () => {

		let startX = 200;
		let startY = 200;

		for(let i=0; i < this.snake.length; i++){

			this.snake[i] = new SnakeBody(startX, startY, 40, 40);
			startX -= 40;
		}

		for(let i=0; i < this.snake.length; i++)
			board.appendChild(this.snake[i].body);
	}

	initFood = () => {

		this.food = new Food(0, 0, 40, 40);
		board.appendChild(this.food.body);
		this.spawnFood();
	}

	spawnFood = () => {

		let x = randInt(0, this.board.width-this.food.width);
		let y = randInt(0, this.board.height-this.food.height);

		this.food.updatePos(x, y);
	}
	
	logic = () => {

		let prevBody = (JSON.parse(JSON.stringify(this.snake)));

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

		this.correctBodyAfterMove(prevBody);

		if(this.doIntersects(this.snake[0].x, this.snake[0].y,
							 this.snake[0].width, this.snake[0].height,
							 this.food.x, this.food.y,
						     this.food.width, this.food.height)){

			this.spawnFood();
			this.incrementBody();
		}

		if(this.snake[0].doTouchWall(this.board.width, this.board.height)){
			
			clearInterval(this.i);
		}	
	}
}

let snake = new Snake();

