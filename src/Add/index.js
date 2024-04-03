const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/index.wasm');

// 線形メモリ
// 引数でメモリ容量を指定。今回の指定は初期は10ページ（640KB）、最大100ページ（6.4MiB）
const MEMORY =　 new WebAssembly.Memory({ initial: 10, maximum: 100 })

/**
 *WebAssemblyを読み込み、JSオブジェクトにして応答する関数
 * @returns {Promise<WebAssembly.WebAssemblyInstantiatedSource>} -
 */
const loadWasm = async () =>  {
  // WebAssemblyでインポートする関数や変数
  const importObject = {
    env: {
      buffer: MEMORY,
    }
  };

  const wasmObject =
      await WebAssembly.instantiate(new Uint8Array(bytes), importObject);

  return wasmObject;
}

/**
 *
 */
const main = () => {
  const wasmObject = loadWasm();
  const sum = wasmObject.add(3, 4);

  console.log(sum)
}

main();