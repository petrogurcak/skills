# Mistakes Log

## 2026-02-14: zsh readonly variable `status` in bash hook
**Co se stalo:** `plan-utils.sh` pouzil `local status=$(...)` — v zsh je `status` readonly (ekvivalent `$?`)
**Proc:** Bash skripty v Claude Code hooks bezi pres zsh (uzivateluv shell), ne bash
**Oprava:** Prejmenovano na `plan_status`
**Pouceni:** V hookach nepouzivat promenne `status`, `path`, `precmd`, `preexec` — jsou reserved v zsh. Testovat hooky v zsh, ne jen `bash -n`.
**Tags:** #hooks #zsh #bash-compatibility
