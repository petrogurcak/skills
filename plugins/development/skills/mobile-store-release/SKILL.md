---
name: mobile-store-release
description: Use when releasing an Expo/React Native mobile app to App Store and Google Play - covers eas submit, ASC "Submit for Review", Play promote Internal→Production, OTA update, and decoding common silent failures (Apple agreement expiry, missing English locale, Background Location declaration, web bundle failure on react-native-maps).
---

# Mobile Store Release

## Overview

End-to-end release of an Expo/React Native app: EAS build → store submit → store-side review submit → OTA update → post-deploy log. Most failures are silent — `eas submit` returns generic "Something went wrong" while the real cause is in expo.dev submission logs. ASC "Add for Review" silently fails when EN locale is missing. Web bundle for OTA blows up on native-only modules. This skill decodes those.

## When NOT to use

- First-time release (provisioning profiles, App Store listing assets, App Privacy disclosure — out of scope; this skill assumes returning release).
- Internal-only TestFlight/Play Internal distribution (no store review needed — just `eas submit` and stop).

## Phase 1 — Pre-flight

Before `eas build`/`eas submit`:

| Check | Command / location | Failure symptom |
|---|---|---|
| EAS production env vars set | `eas env:list --environment production --include-sensitive` | App ships with `localhost` API URL |
| Apple Developer agreements current | https://appstoreconnect.apple.com/business — look for "(New Agreement Available)" or yellow License Agreement banner | `eas submit` returns 403 `FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED` |
| Google Play Background Location declaration filled | Play Console → App Content → Sensitive permissions → Background location declaration | Play Promote dialog blocks with declaration error |
| Live store version vs build runtimeVersion | iTunes Lookup `curl "https://itunes.apple.com/lookup?bundleId=<id>&country=cz"` + Play Console production track | OTA reach mismatch (see Phase 5) |

If agreement banner present: just open https://developer.apple.com/account in a logged-in browser. Visiting auto-accepts in many cases (observed empirically). Re-check `/business` — if banner is gone, agreement is now active. ASC API may have a few-minute cache; first `eas submit` after acceptance can still 403, retry once.

## Phase 2 — Build

```bash
cd mobile
eas build --platform ios --profile production --non-interactive
eas build --platform android --profile production --non-interactive
```

Run in parallel (two terminals or `&`). Capture build IDs from output for Phase 3.

## Phase 3 — eas submit

```bash
eas submit --platform ios --id <build-id> --non-interactive
eas submit --platform android --id <build-id> --non-interactive
```

**On failure:** EAS CLI prints generic `Something went wrong when submitting your app to Apple App Store Connect`. Open the submission URL printed above the error (`https://expo.dev/.../submissions/<id>`), expand "Upload to App Store Connect" log step. Real HTTP error is there.

Common decodes:

| Log payload | Cause | Fix |
|---|---|---|
| `403 FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED` | Apple agreement expired/updated | Phase 1 agreement check, retry |
| `Invalid bundle: ...build number must be greater than ...` | Build number not incremented in `app.config.js` | Bump `ios.buildNumber` and `android.versionCode`, rebuild |
| `Asset validation failed - missing entitlement` | Provisioning profile mismatch | `eas credentials` to refresh |

**iOS post-submit verification:** ASC TestFlight → Build Uploads should show the new build within ~10 min as `Complete`. If not visible after 15 min, EAS submit silently failed — check expo.dev submission detail (don't trust CLI exit code alone).

## Phase 4 — Store-side review submission

### iOS — App Store Connect

5 manual steps in `Distribution`:

1. Sidebar **"+ Add iOS App"** → type version (e.g. `1.1.6`) → Create. Sidebar shows new entry as `🟡 Prepare for Submission`.
2. Scroll to **Build** section → **Add Build** → select build (e.g. `17`) → Done.
3. **What's New in This Version** — fill in **all locales** the app supports. Apple silently fails "Add for Review" if any locale's `whatsNew` is empty. Switch locale via dropdown above metadata (typical: Czech + English (U.S.)).
4. **Save** (top right) → **Add for Review** (top right). If errors banner appears ("English (U.S.) - What's New - This field is required"), fix and retry.
5. Right-side panel **"Draft Submission"** opens with item `1.1.6 (17)`. Click **Submit for Review** at bottom. Confirmation: `1 Item Submitted, up to 48 hours`. Sidebar updates to `🟡 Waiting for Review`.

### Android — Google Play Console

3 steps in **Test and release → Internal testing**:

1. On Internal release for the new versionCode, click **Promote release** dropdown → **Production**. Lands on `/releases/N/prepare`.
2. **Step 1 (Create release)**: click **Copy from a previous release** in Release notes section, select most recent production release → Copy notes. (Notes typically don't change from build-bump-only releases.) Click **Next**.
3. **Step 2 (Review)**: confirm 100% rollout (default), 177 countries (or whatever target). Click **Save**. Dialog "Go to Publishing overview?" → **Go to overview**. On Publishing Overview: **Send 1 change for review** → confirmation dialog **Send changes for review**. List shows `Remove changes` button = revoke option, confirming submission. Auto-rollout typically <24h post-approval.

**Background Location declaration (geofencing apps):** if the manifest includes `ACCESS_BACKGROUND_LOCATION` (most apps using geofencing/auto-clock-in/region monitoring), Play requires a one-time **Background Location Permission Declaration** in `App Content → Sensitive permissions`. Without it, Promote Step 1 blocks with an error. Fill once per app — declaration persists across releases. Pre-flight check (Phase 1) catches this.

## Phase 5 — OTA update

```bash
cd mobile
API_URL="https://api.<yourapp>.app" \
WEB_URL="https://<yourapp>.app" \
ENVIRONMENT="production" \
eas update --branch production --platform ios --message "<short message>"

# Then Android:
API_URL=... WEB_URL=... ENVIRONMENT=... \
eas update --branch production --platform android --message "<short message>"
```

**Critical: per-platform separately, NOT `--platform all`.** EAS bundles for all 3 platforms (iOS + Android + Web) when using `all`. If `app.config.js` imports any native-only module (`react-native-maps`, `expo-secure-store`, etc.) the **web bundle fails** with `Importing native-only module ... on web` and the entire OTA aborts. Per-platform avoids the web bundle.

**Critical: `eas update` does NOT read EAS env vars.** Must set them inline in the shell. Skipping this ships an OTA bundle with `localhost` URLs (broken app for users).

**OTA reach mapping (`runtimeVersion: { policy: "appVersion" }`):**

| Live store version | OTA target | Reach |
|---|---|---|
| 1.1.4 (old) | runtime 1.1.6 | TestFlight + 1.1.6 store users only — **most prod users on 1.1.4 do NOT receive the OTA** |
| 1.1.6 | runtime 1.1.6 | All prod users |

Pre-OTA: check live store version via Phase 1 commands. If ≠ runtime, communicate to user that OTA reach is limited until store-side review completes.

## Phase 6 — Post-deploy log

Append to `docs/release/YYYY-MM-DD-vX.Y.Z-N-handoff.md`:

```markdown
# Release v1.1.6 build 17 — 2026-05-06

## EAS
- iOS build: <build-id> (https://expo.dev/.../builds/<id>)
- Android build: <build-id>

## Store
- iOS: ASC Waiting for Review (submitted at <time>)
- Android: Play Sent for Review (submitted at <time>)

## OTA
- iOS update group: <id>
- Android update group: <id>
- runtimeVersion: 1.1.6 — reach limited to 1.1.6 store users until review completes

## Env vars (verified before build)
- API_URL: https://api.<yourapp>.app ✓
- WEB_URL: https://<yourapp>.app ✓
- ENVIRONMENT: production ✓
- SENTRY_DSN: configured ✓

## Outstanding
- (anything pending — store-side approvals, manual ASC steps, etc.)
```

## Quick failure decode table

| Symptom | Likely cause | Where to look |
|---|---|---|
| `eas submit`: "Something went wrong" | Generic — see actual log | expo.dev submission URL → expand log step |
| `eas submit`: 403 FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED | Apple agreement expired | ASC `/business` — Phase 1 |
| ASC "Add for Review" → "Unable to Add for Review" + locale error | Empty `whatsNew` in EN locale | ASC version → switch locale → fill |
| ASC "Add for Review" → red banner with no specific error | Build not associated with version | ASC version → Build section → Add Build |
| Play Promote Step 1 → "Background location declaration required" | App Content declaration missing | Play Console → App Content → Sensitive permissions |
| `eas update --platform all` → "Importing native-only module ... on web" | Web bundle + native module | Use `--platform ios` and `--platform android` separately |
| OTA published but users don't see fix | runtime mismatch with live store version | Phase 5 reach mapping table |

## Red flags — STOP and check pre-flight

- About to `eas submit` without checking ASC agreement banner state
- About to OTA with `--platform all`
- About to OTA without inlining `API_URL`/`WEB_URL`/`ENVIRONMENT`
- About to ASC "Add for Review" with only one locale's What's New filled
- About to Play Promote without verifying Background Location declaration (geofencing apps)

All five = will-fail-silently traps. Run the Phase 1 pre-flight check first.
