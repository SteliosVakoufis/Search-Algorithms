var mazes = [];
var current_maze = [];
var solved_maze = [[], []];
var solver = "bfs";

function preload() {
	// mazes = loadJSON("../mazes/mazes.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setupDisplaySettings();

	setupMazeColors();
	// current_maze = selectMaze(mazes, "maze_01");
	current_maze = generateExperimentalMaze(25);

	setupMazeDisplaySettings(current_maze);

	solved_maze = bfs(current_maze);
}

function draw() {
	background(20, 20, 20);


	displayMaze(current_maze, displayMazeSettings);
	solve();

	drawUI();
	document.title = "fps: " + round(frameRate()) + " || dT: " + round(deltaTime) + "ms";
}

function solve() {
	if (animateSolvedMaze(solved_maze, current_maze)) {
		// Reset sequence if the maze has finished animating.
		current_maze = generateExperimentalMaze(25);
		setupMazeDisplaySettings(current_maze);
		switch (solver) {
			case "dfs":
				solved_maze = dfs(current_maze);
				break;
			case "bfs":
				solved_maze = bfs(current_maze);
				break;
			case "astar":
				solved_maze = aStar(current_maze);
				break;
		}
	}
}

function animateSolvedMaze(solved_maze, current_maze) {
	if (solved_maze[0] === undefined || solved_maze[1] === undefined) {
		return true;
	}

	if (solved_maze[0].length !== 0) {
		let visited = solved_maze[0].shift();
		current_maze[visited[0]][visited[1]] = "!";
		return false;
	}
	else if (solved_maze[1].length !== 0) {
		let visited = solved_maze[1].shift();
		current_maze[visited[0]][visited[1]] = "*";
		return false;
	}

	return true;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setupMazeDisplaySettings(current_maze);
}
