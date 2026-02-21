import { app, BrowserWindow, ipcMain, dialog, protocol, net } from 'electron';
import path from 'path';
import fs from 'fs';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app.whenReady().then(() => {
  protocol.handle('atom', (request) => {
    const url = new URL(request.url);
    // On Windows, the path might start with /C:/..., so we remove the leading slash if needed
    let filePath = decodeURIComponent(url.pathname);

    if (process.platform === 'win32' && filePath.startsWith('/')) {
      // Check if it's a drive letter like /C:/
      if (/^\/[a-zA-Z]:/.test(filePath)) {
        filePath = filePath.slice(1);
      }
    }

    // Convert to a file:// URL for net.fetch
    try {
      const fileUrl = pathToFileURL(filePath).toString();
      return net.fetch(fileUrl);
    } catch (e) {
      console.error('Failed to create file URL:', e);
      return net.fetch('file:///' + filePath.replace(/\\/g, '/'));
    }
  });
});

import { pathToFileURL } from 'url';

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// IPC Handlers
ipcMain.handle('get-library-path', async () => {
  const picturesPath = app.getPath('pictures');
  const revelaPath = path.join(picturesPath, 'Revela');

  if (!fs.existsSync(revelaPath)) {
    fs.mkdirSync(revelaPath, { recursive: true });
  }

  return revelaPath;
});

ipcMain.handle('list-albums', async (event: any, libraryPath: string) => {
  try {
    const folders = fs.readdirSync(libraryPath, { withFileTypes: true })
      .filter((dirent: fs.Dirent) => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map((dirent: fs.Dirent) => {
        const albumName = dirent.name;
        const albumPath = path.join(libraryPath, albumName);

        // Find the first photo for preview
        const photos = fs.readdirSync(albumPath, { withFileTypes: true })
          .filter((f: fs.Dirent) => f.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(f.name))
          .map((f: fs.Dirent) => f.name);

        return {
          name: albumName,
          preview: photos.length > 0 ? path.join(albumPath, photos[0]) : null
        };
      });
    return folders;
  } catch (error) {
    console.error('Failed to list albums:', error);
    return [];
  }
});

ipcMain.handle('create-album', async (event: any, { libraryPath, name }: { libraryPath: string, name: string }) => {
  try {
    const albumPath = path.join(libraryPath, name);
    const metaPath = path.join(albumPath, '.meta');

    if (!fs.existsSync(albumPath)) {
      fs.mkdirSync(albumPath);
    }

    if (!fs.existsSync(metaPath)) {
      fs.mkdirSync(metaPath);
      fs.writeFileSync(path.join(metaPath, 'album.json'), JSON.stringify({ photos: [], template: 'default' }));
      fs.writeFileSync(path.join(metaPath, 'captions.json'), JSON.stringify({}));
    }

    return true;
  } catch (error) {
    console.error('Failed to create album:', error);
    return false;
  }
});

ipcMain.handle('add-photos', async (event: any, albumPath: string) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
    ]
  });

  if (result.canceled) return false;

  try {
    const metaPath = path.join(albumPath, '.meta', 'album.json');
    let meta: { photos: string[], template: string } = { photos: [], template: 'default' };

    if (fs.existsSync(metaPath)) {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }

    for (const filePath of result.filePaths) {
      const fileName = path.basename(filePath);
      const destPath = path.join(albumPath, fileName);

      // Copy the file to the album directory
      fs.copyFileSync(filePath, destPath);

      // Add to meta if not already there
      if (!meta.photos.includes(fileName)) {
        meta.photos.push(fileName);
      }
    }

    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    return true;
  } catch (error) {
    console.error('Failed to add photos:', error);
    return false;
  }
});

ipcMain.handle('list-photos', async (event: any, albumPath: string) => {
  try {
    const files = fs.readdirSync(albumPath, { withFileTypes: true })
      .filter((dirent: fs.Dirent) => dirent.isFile() && /\.(jpg|jpeg|png|webp|gif)$/i.test(dirent.name))
      .map((dirent: fs.Dirent) => dirent.name);
    return files;
  } catch (error) {
    console.error('Failed to list photos:', error);
    return [];
  }
});

ipcMain.handle('get-album-meta', async (event: any, albumPath: string) => {
  try {
    const metaPath = path.join(albumPath, '.meta', 'album.json');
    if (fs.existsSync(metaPath)) {
      return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }
    return { photos: [], template: 'default' };
  } catch (error) {
    console.error('Failed to get album meta:', error);
    return { photos: [], template: 'default' };
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
