const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/index.wasm');

// 線形メモリ
// 引数でメモリ容量を指定。今回の指定は1ページ（64KiB）
const MEMORY = new WebAssembly.Memory({ initial: 1 });

// 線形メモリの文字列の開始位置
const START_STRING_INDEX = 100;

/**
 * WebAssemblyを読み込み、JSオブジェクトにして応答する関数
 * @returns {Promise<WebAssembly.WebAssemblyInstantiatedSource>} -
 */
const loadWasm = async () => {
  // WebAssemblyでインポートする関数や変数
  const importObject = {
    env: {
      memory: MEMORY,
      start_string_index: START_STRING_INDEX,
      print_string: printInWasm
    }
  };

  const wasmObject =
      await WebAssembly.instantiate(new Uint8Array(bytes), importObject);

  return wasmObject;
}

/**
 * WebAssembly内で読み込み、指定した文字列を出力する関数
 * @param {number} stringLength - プリントする文字列の長さ
 */
const printInWasm = (stringLength) => {
  const bytes = new Uint8Array(MEMORY.buffer, START_STRING_INDEX, stringLength);
  const aString = new TextDecoder('utf8').decode(bytes);

  console.log(aString);
}

/**
 *
 */
const main =  () => {
  const wasmObject = loadWasm();
  wasmObject.helloWorld();
}

main();
