let button1 = undefined;
let button2 = undefined;
let button3 = undefined;

function drawUI() {
    buttonDraw();
    // mouseLocationUI();
}

function buttonDraw() {
    if (button1 === undefined) {
        button1 = new Button(1, "DFS", false);
    }
    button1.draw();

    if (button2 === undefined) {
        button2 = new Button(2, "BFS", true);
    }
    button2.draw();

    if (button3 === undefined) {
        button3 = new Button(3, "Astar", false);
    }
    button3.draw();
}

function mouseClicked() {
    solverSelector({ x: mouseX, y: mouseY });
}

function solverSelector(mouseLoc) {
    if (button1.isPressed(mouseLoc)) {
        console.log("Button1 Pressed - DFS");
        button1.active = true;
        button2.active = false;
        button3.active = false;
        solved_maze[0] = undefined;
    }

    if (button2.isPressed(mouseLoc)) {
        console.log("Button1 Pressed - BFS");
        button1.active = false;
        button2.active = true;
        button3.active = false;
        solved_maze[0] = undefined;
    }

    if (button3.isPressed(mouseLoc)) {
        console.log("Button1 Pressed - Astar");
        button1.active = false;
        button2.active = false;
        button3.active = true;
        solved_maze[0] = undefined;
    }
}

function mouseLocationUI() {
    textSize(32);
    fill(0);
    text(`${mouseX}, ${mouseY}`, mouseX, mouseY);
}

class Button {
    constructor(loc, content, active) {
        this.size = { w: 155, h: 35 };
        this.loc = loc;
        this.content = content
        this.textMargin = 5;
        this.active = active;
        this.colors = { inactive: color(115, 25, 115, 225), active: color(25, 115, 25, 225) };
        this.pivot;
    }

    draw() {
        this.pivot = { x: windowWidth / 2, y: this.size.h * this.loc };

        rectMode(CENTER);
        textAlign(CENTER);
        textSize(16);

        if (this.active) {
            fill(this.colors.active);
        } else {
            fill(this.colors.inactive);
        }

        stroke(35);
        rect(this.pivot.x, this.pivot.y, this.size.w, this.size.h);
        fill(255, 255, 255, 255);
        text(this.content, this.pivot.x, this.pivot.y + this.textMargin);
    }

    isPressed(mouseLoc) {
        if (mouseLoc.x > this.pivot.x + (this.size.w / 2) ||
            mouseLoc.x < this.pivot.x - (this.size.w / 2)) {
            return false;
        }
        if (mouseLoc.y > this.pivot.y + (this.size.h / 2) ||
            mouseLoc.y < this.pivot.y - (this.size.h / 2)) {
            return false;
        }

        solver = this.content.toLowerCase();
        return true;
    }
}