const { app, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const REPO_OWNER = 'mobidick09';
const REPO_NAME = 'UEE-Gun-Manager';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

function parseVersion(version) {
  return version.replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
}

function isNewerVersion(latest, current) {
  const a = parseVersion(latest);
  const b = parseVersion(current);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff > 0;
  }
  return false;
}

async function fetchLatestRelease() {
  const res = await fetch(API_URL, {
    headers: {
      'User-Agent': 'UEE-Gun-Manager-Updater',
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function downloadAsset(url, destPath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'UEE-Gun-Manager-Updater' },
  });
  if (!res.ok) {
    throw new Error(`Asset download failed: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(destPath, buffer);
}

function installAndRestart(downloadedExePath) {
  const targetExePath = process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;
  const batPath = path.join(app.getPath('temp'), 'uee-gun-manager-update.bat');

  const script = [
    '@echo off',
    ':wait',
    `copy /Y "${downloadedExePath}" "${targetExePath}" >nul 2>&1`,
    'if errorlevel 1 (',
    '  timeout /t 1 /nobreak >nul',
    '  goto wait',
    ')',
    `start "" "${targetExePath}"`,
    `del "${downloadedExePath}"`,
    `del "%~f0"`,
  ].join('\r\n');

  fs.writeFileSync(batPath, script);

  spawn('cmd.exe', ['/c', batPath], { detached: true, stdio: 'ignore' }).unref();
  app.quit();
}

async function checkForUpdates() {
  if (!app.isPackaged) return;

  try {
    const release = await fetchLatestRelease();
    const latestVersion = release.tag_name;
    const currentVersion = app.getVersion();

    if (!latestVersion || !isNewerVersion(latestVersion, currentVersion)) {
      return;
    }

    const asset = (release.assets || []).find(a => a.name.endsWith('.exe'));
    if (!asset) {
      console.error('Update check: no .exe asset found in latest release');
      return;
    }

    const { response } = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Jetzt aktualisieren', 'Später'],
      defaultId: 0,
      cancelId: 1,
      title: 'Update verfügbar',
      message: `Version ${latestVersion} ist verfügbar (aktuell: ${currentVersion}).`,
      detail: 'Jetzt herunterladen und installieren? Die App wird dazu neu gestartet.',
    });

    if (response !== 0) return;

    const downloadedExePath = path.join(app.getPath('temp'), asset.name);
    await downloadAsset(asset.browser_download_url, downloadedExePath);

    installAndRestart(downloadedExePath);
  } catch (err) {
    console.error('Update check failed:', err);
  }
}

module.exports = { checkForUpdates };
