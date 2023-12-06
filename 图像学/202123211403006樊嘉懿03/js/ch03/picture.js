"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 50;

function changeDir(){
	direction *= -1;
}

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program1 = initShaders( gl, "rot-v-shader", "rot-f-shader1" );
	gl.useProgram( program1 );
	
	var program2 = initShaders( gl, "rot-v-shader", "rot-f-shader2" );
	gl.useProgram( program2 );
	
	var program3 = initShaders( gl, "rot-v-shader", "rot-f-shader3" );
	gl.useProgram( program3 );
	
	var vertices1 = [
		 0,  0.5,  0,
		-0.5,  0,  0,
		 0.5,  0,  0,
		 0, -0.5,  0
	];

	var vertices2 = [
		 0,  1.5,  0,
		-0.5,  1,  0,
		 0.5,  1,  0,
		 0.5,  0,  0
	];

	var vertices3 = [
		0,  1.5,  0,
		-0.5,  1,  0,
		 0.5,  1,  0,
		 0.5,  0,  0
	];
	
	var bufferId1 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices1 ), gl.STATIC_DRAW );

	var vPosition1 = gl.getAttribLocation( program1, "vPosition" );
	gl.vertexAttribPointer( vPosition1, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition1 );

	thetaLoc = gl.getUniformLocation( program1, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}
	
	renderSquare();
	
	var bufferId2 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices2 ), gl.STATIC_DRAW );

	var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
	gl.vertexAttribPointer( vPosition2, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition2 );

	thetaLoc = gl.getUniformLocation( program2, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}
	renderSquare();
	var bufferId3 = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices3 ), gl.STATIC_DRAW );

	var vPosition3 = gl.getAttribLocation( program3, "vPosition" );
	gl.vertexAttribPointer( vPosition3, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition3 );

	thetaLoc = gl.getUniformLocation( program3, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

	// update and render
	setTimeout( function(){ window.requestAnimFrame( renderSquare ); }, speed );
}