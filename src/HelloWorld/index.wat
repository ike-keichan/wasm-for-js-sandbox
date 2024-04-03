(module
  ;; JSの関数とWasmの関数を束縛している。
  ;; 一つ目のパラメータにJSのenvオブジェクトからインポートすることを宣言
  ;; 二つ目のパラメータにJSのenvオブジェクトから関数print_stringをインポートすることを宣言
  ;; 三つ目のパラメータにWasmの$print_string関数がi32型の引数を一つ要求することを宣言
  (import "env" "print_string" (func $print_string( param i32 )))

  ;; JSの変数とWasmのメモリを束縛している。
  ;; 二つ目のパラメータにJSのenvオブジェクトから変数memoryをインポートすることを宣言
  ;; 三つ目のパラメータにWasmで1ページの線形メモリを確保することを宣言
  (import "env" "memory" (memory 1))

  ;; 一つ目のパラメータにグローバル変数$start_stringを宣言
  ;; 二つ目のパラメータに変数$start_stringに参照する値を宣言、JSのenvオブジェクトからインポートしたstart_string_indexとマッピング
  (global $start_string_index (import "env" "start_string_index") i32)

  ;; 一つ目のパラメータにグローバル変数$string_lengthを宣言
  ;; 三つ目のパラメータで文字列長12を定義
  (global $string_length i32 (i32.const 12))

  ;; 一つ目のパラメータにこのモジュールがデータを書き込むメモリーを宣言、グローバル変数$start_stringをメモリーとして宣言
  ;; 二つ目のパラメータに文字列を宣言
  (data (global.get $start_string_index) "hello world!")

  ;; JavaScriptで使う関数を"hello_world"として定義しエクスポート
  ;; 関数$print_stringを呼び出し、グローバル変数$string_lengthを引数として渡す
  (func (export "hello_world")
    (call $print_string (global.get $string_length))
  )
)
