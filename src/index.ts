import {Idb} from './indexed_db';

function main(){
    console.log(`main() ...`);
    new Idb();
}

document.onreadystatechange= ()=>{
    if (document.readyState === 'complete'){
        main();
    }
}
