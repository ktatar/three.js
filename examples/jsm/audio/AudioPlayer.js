import { Object3D } from '../../../build/three.module.js';

class AudioPlayer extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioPlayer';

		this.context = listener.context;

		this.nodeArray = [];

	}

	addNode( node ){

		this.nodeArray.push( node );

	}

	play( argumentArray ){

		for( let i = 0 ; i < this.nodeArray.length ; i++ ){

			this.nodeArray[i].play( ...argumentArray[i] );

		}

	}

}

export { AudioPlayer };
