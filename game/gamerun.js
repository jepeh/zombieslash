import UI from "./ui.js"
import {SetupWorld }from "./environment.js"
import {skillListener} from './skills.js'

function runGame() {

// canvas 
var canvas = document.getElementById("gameWorld")

// initialize game world environment
SetupWorld(canvas)

// initialize game User Interfaces
UI()

// init skills 
skillListener()
}

export default runGame;