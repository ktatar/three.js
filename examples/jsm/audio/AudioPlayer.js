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

	addParameter( parameter ){

		this.parameterArray.push( parameter );

	}

	play( sequenceArray ){

		for( let i = 0 ; i < this.nodeArray.length ; i++ ){

			for( let j = 0 ; j < sequenceArray[i].sequence.length ; j++ ){

				this.nodeArray[i].play( ...sequenceArray[i].sequence[j] );
	
			}

		}

	}

}

export { AudioPlayer };
