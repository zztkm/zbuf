# 変更履歴

## v1.1.0

- [ADD] 起動時にディレクトリパスを引数として指定できる機能を追加
  - 相対パス対応: `zbuf ../hello-world`
  - 絶対パス対応: `zbuf /home/zztkm/projects`
  - チルダ展開対応: `zbuf ~/dev/github.com`
  - Windows パス対応: `zbuf C:\Users\zztkm` または `zbuf ~\Documents`
  - ディレクトリ指定時のパス検証機能を追加（存在確認、ディレクトリ判定）
  - ヘルプメッセージにディレクトリ指定の使用例を追加
  - @zztkm

