;; HelloWorldプログラムでは、宣言とexportを同時にした。
;; HelloWorldプログラムではJSからインポートされた値をメモリに書き込み一時保存していた。
(module
  (func $add (param i32 i32) (result i32)
    get_local 0
    get_local 1
    i32.add)
  (export "add" (func $add))
)
